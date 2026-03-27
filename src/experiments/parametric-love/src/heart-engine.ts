import * as THREE from 'three';

export interface HeartConfig {
    color: number;
    size: number;
    burstCount: number;
    wireframeOpacity: number;
}

export class HeartEngine {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private clipPlane: THREE.Plane;
    private heartGroup: THREE.Group;
    private wireMat: THREE.MeshBasicMaterial;
    private liquidMat: THREE.MeshPhongMaterial;
    private particles: { obj: THREE.Sprite; vel: THREE.Vector3 }[] = [];
    private heartTex: THREE.CanvasTexture;
    
    constructor(container: HTMLElement, private config: HeartConfig) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 70;

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.localClippingEnabled = true;
        container.appendChild(this.renderer.domElement);

        this.clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 50);
        this.heartTex = this.createHeartTexture();
    
        this.initLights();
        const { group, wire, liquid } = this.initHeart();
        this.heartGroup = group;
        this.wireMat = wire;
        this.liquidMat = liquid;

        this.initializeParticles();
        this.setupResize();
    }

    private initLights() {
        const pLight = new THREE.PointLight(0xffffff, 1.2, 250);
        pLight.position.set(20, 30, 40);
        this.scene.add(pLight, new THREE.AmbientLight(0xffffff, 0.4));
    }
    
    private createHeartGeometry(scale: number) {
        const geometry = new THREE.SphereGeometry(15 * scale, 64, 64);
        const position = geometry.attributes.position;
        
        for (let i = 0; i < position.count; i++) {
            let x = position.getX(i), y = position.getY(i), z = position.getZ(i);
            const nY = (y + 15 * scale) / (15 * scale);
            const xDist = Math.abs(x) / 20;
            const cleavage = Math.pow(1 - xDist, 0.5) * (1 - nY) * 7;
            const taper = Math.pow(nY, 0.8);
            const lobeBoost = Math.sin(xDist * Math.PI) * 3 * nY;
            position.setXYZ(i, x * (1 + nY * 0.4) * taper, (y + lobeBoost - cleavage) * 1.2, z * taper * 1.1);
        }
        geometry.computeVertexNormals();
        geometry.center();
        return geometry;
    }
    
    private initHeart() {
        const geo = this.createHeartGeometry(this.config.size);
        
        const wire = new THREE.MeshBasicMaterial({
            color: this.config.color,
            wireframe: true,
            transparent: true,
            opacity: this.config.wireframeOpacity,
        });

        const liquid = new THREE.MeshPhongMaterial({
            color: this.config.color,
            clippingPlanes: [this.clipPlane],
            side: THREE.DoubleSide,
            shininess: 100,
            emissive: this.config.color,
            emissiveIntensity: 0.3,
        });
        
        const group = new THREE.Group();
        group.add(new THREE.Mesh(geo, wire), new THREE.Mesh(geo, liquid));
        this.scene.add(group);
        
        return { group, wire, liquid };
    }
    
    private createHeartTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64; canvas.height = 64;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = 'white'; ctx.font = '50px Arial';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('♥', 32, 32);
        
        return new THREE.CanvasTexture(canvas);
    }

    public updateBurstCount(count: number) {
        this.config.burstCount = count;
        this.initializeParticles();
    }
    
    public initializeParticles() {
    this.particles.forEach((p) => this.scene.remove(p.obj));
    this.particles = [];

    for (let i = 0; i < this.config.burstCount; i++) {
        const mat = new THREE.SpriteMaterial({ 
            map: this.heartTex, 
            color: this.config.color, 
            transparent: true, 
            opacity: 0 
        });
        const s = new THREE.Sprite(mat);
            this.scene.add(s);
            this.particles.push({
            obj: s,
            vel: new THREE.Vector3(
                (Math.random() - 0.5) * 0.15, 
                (Math.random() - 0.5) * 0.15, 
                (Math.random() - 0.5) * 0.15
                ),
            });
        }
    }

    public updateColor(color: number) {
        this.config.color = color;
        this.wireMat.color.set(color);
        this.liquidMat.color.set(color);
        this.liquidMat.emissive.set(color);
        this.particles.forEach(p => p.obj.material.color.set(color));
    }

    public updateSize(size: number) {
        this.config.size = size;
        const geo = this.createHeartGeometry(size);
        this.heartGroup.children.forEach(child => {
            (child as THREE.Mesh).geometry.dispose();
            (child as THREE.Mesh).geometry = geo;
        });
    }
    
    public updateWireframe(opacity: number) {
        this.wireMat.opacity = opacity;
    }

    public triggerBurst() {
        this.heartGroup.visible = false;
        this.particles.forEach((p) => {
            p.obj.position.set(0, 0, 0);
            p.obj.material.opacity = 1;
            p.obj.scale.set(4, 4, 4);
        });
    }

    public resetVisuals() {
        this.heartGroup.visible = true;
        this.particles.forEach(p => p.obj.material.opacity = 0);
    }

    public getCanvas() { 
        return this.renderer.domElement; 
    }

    public render(currentY: number, isBursting: boolean) {
        this.clipPlane.constant = -currentY;
        this.heartGroup.rotation.y += 0.01;
        if (isBursting) {
            this.particles.forEach((p) => p.obj.position.add(p.vel));
        }
        this.renderer.render(this.scene, this.camera);
    }

    private setupResize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    public rotateHeart(x: number, y: number) {
        this.heartGroup.rotation.y += x;
        this.heartGroup.rotation.x += y;
    }
}