import * as THREE from 'three';
import { TextureGenerator } from '../utils/TextureGenerator';
import {
  vinylVertexShader,
  vinylFragmentShader,
} from '../shaders/vinylShaders';
import { EDITIONS, type EditionKey } from '../config/editions';

export type RotationMode = 'record-player' | 'free-rotate';

export class VinylRecord {
  private scene: THREE.Scene;
  private group: THREE.Group;
  private material!: THREE.ShaderMaterial;
  private labelMaterial!: THREE.MeshStandardMaterial;
  private currentEdition: EditionKey = 'frosted';
  private textures: TextureGenerator;
  private speedMultiplier: number = 1.0;
  private rotationMode: RotationMode = 'record-player';

  private manualRotationX: number = 0;
  private manualRotationY: number = 0;
  private manualRotationZ: number = 0;
  private recordSpinY: number = 0;

  private isDragging: boolean = false;
  private previousMouseX: number = 0;
  private previousMouseY: number = 0;

  private readonly OUTER_RADIUS = 2.2;
  private readonly LABEL_RADIUS = 0.72;
  private readonly HOLE_RADIUS = 0.07;
  private readonly LABEL_HOLE_RADIUS = 0.075;
  private readonly GROOVE_DEPTH = 10.0;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.textures = new TextureGenerator();
    this.group = new THREE.Group();

    this.buildRecord();
    this.setEdition('frosted');
    this.scene.add(this.group);

    this.setupFreeRotation();
  }

  private buildRecord(): void {
    const grooveMap = this.textures.generateVinylGrooveMap();
    const bumpMap = this.textures.generateGrooveTexture();

    this.material = this.createVinylMaterial(grooveMap, bumpMap);
    const vinylMesh = this.createVinylGeometry(this.material);
    this.group.add(vinylMesh);

    this.labelMaterial = this.createLabelMaterial();
    const labelMesh = this.createLabelGeometry(this.labelMaterial);
    this.group.add(labelMesh);
  }

  private createVinylMaterial(
    grooveMap: THREE.Texture,
    bumpMap: THREE.Texture
  ): THREE.ShaderMaterial {
    const config = EDITIONS[this.currentEdition];

    return new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(config.color) },
        uRoughness: { value: config.roughness },
        uSpecular: { value: config.specular },
        uTransmission: { value: config.transmission },
        uAnisotropicStrength: { value: config.anisotropicStrength },
        uSpecIntensity: { value: config.specIntensity },
        uGrooveMap: { value: grooveMap },
        uBumpGrooveMap: { value: bumpMap },
        uLightPos1: { value: new THREE.Vector3(4.0, 5.0, 3.0) },
        uLightPos2: { value: new THREE.Vector3(-3.5, 4.5, 4.0) },
        uLightPos3: { value: new THREE.Vector3(0.0, 6.0, -4.5) },
        uLightPos4: { value: new THREE.Vector3(-4.0, 3.0, -3.5) },
        uGrooveDepth: { value: this.GROOVE_DEPTH },
      },
      vertexShader: vinylVertexShader,
      fragmentShader: vinylFragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }

  private createVinylGeometry(material: THREE.ShaderMaterial): THREE.Mesh {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, this.OUTER_RADIUS, 0, Math.PI * 2, false);

    const holePath = new THREE.Path();
    holePath.absarc(0, 0, this.HOLE_RADIUS, 0, Math.PI * 2, true);
    shape.holes.push(holePath);

    const geometry = new THREE.ShapeGeometry(shape, 96);
    geometry.rotateX(-Math.PI / 2);

    const position = geometry.attributes.position;
    const uv = geometry.attributes.uv;

    if (position && uv) {
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const z = position.getZ(i);
        uv.setXY(
          i,
          x / (this.OUTER_RADIUS * 2) + 0.5,
          z / (this.OUTER_RADIUS * 2) + 0.5
        );
      }
      uv.needsUpdate = true;
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    return mesh;
  }

  private createLabelMaterial(): THREE.MeshStandardMaterial {
    const config = EDITIONS[this.currentEdition];
    const labelTexture = this.textures.generateLabelTexture(
      config.labelBrightness
    );

    return new THREE.MeshStandardMaterial({
      map: labelTexture,
      roughness: 0.85,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
  }

  private createLabelGeometry(
    material: THREE.MeshStandardMaterial
  ): THREE.Mesh {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, this.LABEL_RADIUS, 0, Math.PI * 2, false);

    const holePath = new THREE.Path();
    holePath.absarc(0, 0, this.LABEL_HOLE_RADIUS, 0, Math.PI * 2, true);
    shape.holes.push(holePath);

    const geometry = new THREE.ShapeGeometry(shape, 64);
    geometry.rotateX(-Math.PI / 2);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 0.018;
    return mesh;
  }

  private setupFreeRotation(): void {
    const container = document.getElementById('webgl-container');
    if (!container) return;

    // Use pointer events for better compatibility
    container.addEventListener('pointerdown', (e) => {
      if (e.button === 0 && this.rotationMode === 'free-rotate') {
        this.isDragging = true;
        this.previousMouseX = e.clientX;
        this.previousMouseY = e.clientY;
        container.style.cursor = 'grabbing';
        e.stopPropagation();
      }
    });

    document.addEventListener('pointermove', (e) => {
      if (this.isDragging && this.rotationMode === 'free-rotate') {
        const deltaX = e.clientX - this.previousMouseX;
        const deltaY = e.clientY - this.previousMouseY;

        this.manualRotationY += deltaX * 0.01;
        this.manualRotationX += deltaY * 0.01;
        this.manualRotationZ += (deltaX + deltaY) * 0.003;

        this.previousMouseX = e.clientX;
        this.previousMouseY = e.clientY;
        e.stopPropagation();
      }
    });

    document.addEventListener('pointerup', (e) => {
      if (this.isDragging) {
        this.isDragging = false;
        const container = document.getElementById('webgl-container');
        if (container) {
          container.style.cursor = 'grab';
        }
        e.stopPropagation();
      }
    });

    let touchPreviousX = 0;
    let touchPreviousY = 0;
    let isTouching = false;

    container.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches.length === 1 && this.rotationMode === 'free-rotate') {
          isTouching = true;
          const touch = e.touches[0];
          touchPreviousX = touch.clientX;
          touchPreviousY = touch.clientY;
          e.preventDefault();
          e.stopPropagation();
        }
      },
      { passive: false }
    );

    container.addEventListener(
      'touchmove',
      (e) => {
        if (
          isTouching &&
          e.touches.length === 1 &&
          this.rotationMode === 'free-rotate'
        ) {
          e.preventDefault();
          const touch = e.touches[0];
          const deltaX = touch.clientX - touchPreviousX;
          const deltaY = touch.clientY - touchPreviousY;

          this.manualRotationY += deltaX * 0.01;
          this.manualRotationX += deltaY * 0.01;
          this.manualRotationZ += (deltaX + deltaY) * 0.003;

          touchPreviousX = touch.clientX;
          touchPreviousY = touch.clientY;
          e.stopPropagation();
        }
      },
      { passive: false }
    );

    container.addEventListener('touchend', (e) => {
      if (isTouching) {
        isTouching = false;
        e.stopPropagation();
      }
    });

    container.style.cursor = 'grab';
  }

  public setEdition(key: EditionKey): void {
    this.currentEdition = key;
    const config = EDITIONS[key];
    if (!config) return;

    this.material.uniforms.uColor.value = new THREE.Color(config.color);
    this.material.uniforms.uRoughness.value = config.roughness;
    this.material.uniforms.uTransmission.value = config.transmission;
    this.material.uniforms.uSpecular.value = config.specular;
    this.material.uniforms.uAnisotropicStrength.value =
      config.anisotropicStrength;
    this.material.uniforms.uSpecIntensity.value = config.specIntensity;

    const labelTexture = this.textures.generateLabelTexture(
      config.labelBrightness
    );
    this.labelMaterial.map = labelTexture;
    this.labelMaterial.needsUpdate = true;
  }

  public setSpeedMultiplier(value: number): void {
    this.speedMultiplier = Math.max(0, Math.min(3, value));
  }

  public setRotationMode(mode: RotationMode): void {
    this.rotationMode = mode;
    const container = document.getElementById('webgl-container');
    if (container) {
      container.style.cursor = mode === 'free-rotate' ? 'grab' : 'default';
    }
  }

  public getRotationMode(): RotationMode {
    return this.rotationMode;
  }

  public updateRotation(speed: number, delta: number): void {
    this.recordSpinY += speed * this.speedMultiplier * delta;

    if (this.rotationMode === 'record-player') {
      const wobble = Math.sin(Date.now() * 0.001) * 0.0005;
      this.group.rotation.x = wobble;
      this.group.rotation.y = this.recordSpinY;
      this.group.rotation.z = wobble * 0.5;
    } else {
      this.group.rotation.x = this.manualRotationX;
      this.group.rotation.y = this.manualRotationY + this.recordSpinY;
      this.group.rotation.z = this.manualRotationZ;
    }
  }

  public resetRotation(): void {
    this.manualRotationX = 0;
    this.manualRotationY = 0;
    this.manualRotationZ = 0;
    this.recordSpinY = 0;
    this.group.rotation.set(0, 0, 0);
  }

  public getCurrentEdition(): EditionKey {
    return this.currentEdition;
  }

  public getGroup(): THREE.Group {
    return this.group;
  }

  public dispose(): void {
    this.material.dispose();
    if (this.material.uniforms.uGrooveMap.value instanceof THREE.Texture) {
      this.material.uniforms.uGrooveMap.value.dispose();
    }
    if (this.material.uniforms.uBumpGrooveMap.value instanceof THREE.Texture) {
      this.material.uniforms.uBumpGrooveMap.value.dispose();
    }
    this.labelMaterial.dispose();
    if (this.labelMaterial.map) {
      this.labelMaterial.map.dispose();
    }
    this.scene.remove(this.group);
  }
}
