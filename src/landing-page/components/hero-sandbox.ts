import * as THREE from 'three';

export function mountHeroSandbox(canvas: HTMLCanvasElement): () => void {
  const parent = canvas.parentElement!;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.set(0, 0, 32);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });

  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;

  function resize(): void {
    const width = canvas.clientWidth || parent.clientWidth;
    const height = canvas.clientHeight || parent.clientHeight;

    if (width === 0 || height === 0) return;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height, false);

    renderer.setViewport(0, 0, width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  resize();

  const ambientLight = new THREE.AmbientLight(0x1a202c, 1.2);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 4.0);
  keyLight.position.set(20, 30, 25);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x38bdf8, 3.2); 
  rimLight.position.set(-25, -20, -15);
  scene.add(rimLight);

  const warmFill = new THREE.DirectionalLight(0xffb07c, 1.8); 
  warmFill.position.set(-15, 20, 15);
  scene.add(warmFill);

  const INSTANCE_COUNT = 180;
  const TUBE_RADIUS = 0.16;
  const TUBE_LENGTH = 1.0;
  const tubeGeometry = new THREE.CylinderGeometry(TUBE_RADIUS, TUBE_RADIUS, TUBE_LENGTH, 12, 1);
  tubeGeometry.rotateX(Math.PI / 2); 

  const darkChromeMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x111622),
    metalness: 0.96,
    roughness: 0.18,
    clearcoat: 0.6,
    clearcoatRoughness: 0.12,
    reflectivity: 0.95,
  });

  const instancedTubes = new THREE.InstancedMesh(tubeGeometry, darkChromeMaterial, INSTANCE_COUNT);
  instancedTubes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(instancedTubes);

  interface TubeTransform {
    position: THREE.Vector3;
    rotation: THREE.Euler;
    scale: THREE.Vector3;
  }

  function createTubeBetween(p1: THREE.Vector3, p2: THREE.Vector3, radiusScale = 1.0): TubeTransform {
    const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    const length = p1.distanceTo(p2);

    const orientation = new THREE.Matrix4();
    orientation.lookAt(p1, p2, new THREE.Vector3(0, 1, 0));
    const rotation = new THREE.Euler().setFromRotationMatrix(orientation);

    return {
      position: midPoint,
      rotation,
      scale: new THREE.Vector3(radiusScale, radiusScale, length),
    };
  }

  function genHypercubeState(): TubeTransform[] {
    const transforms: TubeTransform[] = [];
    const baseSize = 11.0;

    for (let i = 0; i < INSTANCE_COUNT; i++) {
      const layerIndex = Math.floor(i / 4);
      const layerFrac = layerIndex / (INSTANCE_COUNT / 4);
      const scaleFactor = 1.0 - layerFrac * 0.75;
      const twistAngle = layerFrac * Math.PI * 0.55;

      const corner = i % 4;
      const size = baseSize * scaleFactor;
      let p1 = new THREE.Vector3(), p2 = new THREE.Vector3();

      if (corner === 0) { p1.set(-size, -size, 0); p2.set(size, -size, 0); }
      else if (corner === 1) { p1.set(size, -size, 0); p2.set(size, size, 0); }
      else if (corner === 2) { p1.set(size, size, 0); p2.set(-size, size, 0); }
      else { p1.set(-size, size, 0); p2.set(-size, -size, 0); }

      const zDepth = (layerFrac - 0.5) * 10;
      p1.z = zDepth;
      p2.z = zDepth;

      const rotationAxis = new THREE.Vector3(1, 1, 0.2).normalize();
      p1.applyAxisAngle(rotationAxis, twistAngle);
      p2.applyAxisAngle(rotationAxis, twistAngle);

      transforms.push(createTubeBetween(p1, p2, 1.0));
    }
    return transforms;
  }

  function genTurbineRingState(): TubeTransform[] {
    const transforms: TubeTransform[] = [];
    const ringRadius = 8.5;
    const innerRadius = 3.2;
    const ringSegments = 120;
    const bladeCount = 60;

    for (let i = 0; i < ringSegments; i++) {
      const a1 = (i / ringSegments) * Math.PI * 2;
      const a2 = ((i + 1) / ringSegments) * Math.PI * 2;

      const p1 = new THREE.Vector3(Math.cos(a1) * ringRadius, Math.sin(a1) * ringRadius, Math.sin(a1 * 3) * 0.6);
      const p2 = new THREE.Vector3(Math.cos(a2) * ringRadius, Math.sin(a2) * ringRadius, Math.sin(a2 * 3) * 0.6);

      transforms.push(createTubeBetween(p1, p2, 1.25));
    }

    for (let i = 0; i < bladeCount; i++) {
      const angle = (i / bladeCount) * Math.PI * 2;
      const zOffset = (i % 2 === 0 ? 1 : -1) * 0.8;

      const p1 = new THREE.Vector3(Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius, zOffset);
      const p2 = new THREE.Vector3(
        Math.cos(angle + 0.35) * (ringRadius * 0.95),
        Math.sin(angle + 0.35) * (ringRadius * 0.95),
        -zOffset
      );

      transforms.push(createTubeBetween(p1, p2, 1.0));
    }

    while (transforms.length < INSTANCE_COUNT) {
      transforms.push(transforms[transforms.length - 1]);
    }
    return transforms;
  }

  function genGyroscopeState(): TubeTransform[] {
    const transforms: TubeTransform[] = [];
    const rings = [
      { radius: 9.0, axis: new THREE.Vector3(1, 0, 0), count: 60 },
      { radius: 7.2, axis: new THREE.Vector3(0, 1, 0), count: 60 },
      { radius: 5.4, axis: new THREE.Vector3(0, 0, 1), count: 60 },
    ];

    rings.forEach((ring) => {
      for (let i = 0; i < ring.count; i++) {
        const a1 = (i / ring.count) * Math.PI * 2;
        const a2 = ((i + 1) / ring.count) * Math.PI * 2;

        let p1 = new THREE.Vector3(Math.cos(a1) * ring.radius, Math.sin(a1) * ring.radius, 0);
        let p2 = new THREE.Vector3(Math.cos(a2) * ring.radius, Math.sin(a2) * ring.radius, 0);

        if (ring.axis.x === 1) {
          p1.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
          p2.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
        } else if (ring.axis.y === 1) {
          p1.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
          p2.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
        }

        transforms.push(createTubeBetween(p1, p2, 1.15));
      }
    });

    while (transforms.length < INSTANCE_COUNT) {
      transforms.push(transforms[transforms.length - 1]);
    }
    return transforms;
  }

  function genStarburstState(): TubeTransform[] {
    const transforms: TubeTransform[] = [];
    const pointsNum = 6;

    for (let i = 0; i < INSTANCE_COUNT; i++) {
      const arm = i % pointsNum;
      const armAngle = (arm * Math.PI * 2) / pointsNum;
      const layer = Math.floor(i / pointsNum) / (INSTANCE_COUNT / pointsNum);

      const length = 13.0 * (1.0 - layer * 0.55);
      const spread = (layer - 0.5) * 3.5;

      const dir = new THREE.Vector3(Math.cos(armAngle), Math.sin(armAngle), 0);
      const perp = new THREE.Vector3(-Math.sin(armAngle), Math.cos(armAngle), 0);

      const p1 = new THREE.Vector3(0, 0, spread);
      const p2 = dir.clone().multiplyScalar(length).add(perp.clone().multiplyScalar(spread * 0.8));

      transforms.push(createTubeBetween(p1, p2, 1.0));
    }
    return transforms;
  }

  const shapeStates = [
    genHypercubeState(),
    genTurbineRingState(),
    genGyroscopeState(),
    genStarburstState(),
  ];

  let isDragging = false;
  let previousPointerPos = { x: 0, y: 0 };
  const targetRotation = new THREE.Euler(0, 0, 0);
  const currentRotation = new THREE.Euler(0, 0, 0);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(-1000, -1000);
  const touchWorldPos = new THREE.Vector3(-1000, -1000, 0);

  function getPointerPos(e: MouseEvent | TouchEvent) {
    if ('touches' in e && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if ('clientX' in e) {
      return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };
    }
    return { x: 0, y: 0 };
  }

  function updateHoverRay(clientX: number, clientY: number) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    raycaster.ray.intersectPlane(planeZ, touchWorldPos);
  }

  function handlePointerDown(e: MouseEvent | TouchEvent) {
    isDragging = true;
    previousPointerPos = getPointerPos(e);
  }

  function handlePointerMove(e: MouseEvent | TouchEvent) {
    const pos = getPointerPos(e);
    updateHoverRay(pos.x, pos.y);

    if (isDragging) {
      const deltaX = pos.x - previousPointerPos.x;
      const deltaY = pos.y - previousPointerPos.y;

      targetRotation.y += deltaX * 0.008;
      targetRotation.x += deltaY * 0.008;

      previousPointerPos = pos;
    }
  }

  function handlePointerUp() {
    isDragging = false;
    touchWorldPos.set(-1000, -1000, 0);
  }

  let animId = 0;
  const startTime = performance.now();

  const MORPH_DURATION = 4.2;
  const TRANSITION_TIME = 1.8;

  const dummy = new THREE.Object3D();
  const dummyQuatA = new THREE.Quaternion();
  const dummyQuatB = new THREE.Quaternion();

  function tick(): void {
    animId = requestAnimationFrame(tick);

    const currentTime = performance.now();
    const elapsedTime = (currentTime - startTime) * 0.001; // Seconds

    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;

    instancedTubes.rotation.x = currentRotation.x + Math.sin(elapsedTime * 0.08) * 0.16;
    instancedTubes.rotation.y = currentRotation.y + elapsedTime * 0.12;

    const totalCycle = MORPH_DURATION * shapeStates.length;
    const cycleTime = elapsedTime % totalCycle;

    const currentShapeIdx = Math.floor(cycleTime / MORPH_DURATION);
    const nextShapeIdx = (currentShapeIdx + 1) % shapeStates.length;

    const timeInCurrent = cycleTime % MORPH_DURATION;
    const morphFactor = THREE.MathUtils.smoothstep(
      timeInCurrent,
      MORPH_DURATION - TRANSITION_TIME,
      MORPH_DURATION
    );

    const stateA = shapeStates[currentShapeIdx];
    const stateB = shapeStates[nextShapeIdx];

    const localTouch = touchWorldPos.clone();
    instancedTubes.worldToLocal(localTouch);

    const explosionRadius = 6.0;

    for (let i = 0; i < INSTANCE_COUNT; i++) {
      const transformA = stateA[i];
      const transformB = stateB[i];

      const targetPos = new THREE.Vector3().lerpVectors(transformA.position, transformB.position, morphFactor);

      dummyQuatA.setFromEuler(transformA.rotation);
      dummyQuatB.setFromEuler(transformB.rotation);
      const targetQuat = dummyQuatA.clone().slerp(dummyQuatB, morphFactor);

      const targetScale = new THREE.Vector3().lerpVectors(transformA.scale, transformB.scale, morphFactor);

      const dist = targetPos.distanceTo(localTouch);
      if (dist < explosionRadius) {
        const force = (1.0 - dist / explosionRadius) * 2.8;
        const pushDir = new THREE.Vector3().subVectors(targetPos, localTouch).normalize();
        targetPos.add(pushDir.multiplyScalar(force));
      }

      dummy.position.copy(targetPos);
      dummy.quaternion.copy(targetQuat);
      dummy.scale.copy(targetScale);
      dummy.updateMatrix();

      instancedTubes.setMatrixAt(i, dummy.matrix);
    }

    instancedTubes.instanceMatrix.needsUpdate = true;
    renderer.render(scene, camera);
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(parent);

  window.addEventListener('resize', resize);

  window.addEventListener('mousedown', handlePointerDown);
  window.addEventListener('mousemove', handlePointerMove);
  window.addEventListener('mouseup', handlePointerUp);

  canvas.addEventListener('touchstart', handlePointerDown, { passive: true });
  canvas.addEventListener('touchmove', handlePointerMove, { passive: true });
  canvas.addEventListener('touchend', handlePointerUp);

  animId = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(animId);
    resizeObserver.disconnect();

    window.removeEventListener('resize', resize);

    window.removeEventListener('mousedown', handlePointerDown);
    window.removeEventListener('mousemove', handlePointerMove);
    window.removeEventListener('mouseup', handlePointerUp);

    canvas.removeEventListener('touchstart', handlePointerDown);
    canvas.removeEventListener('touchmove', handlePointerMove);
    canvas.removeEventListener('touchend', handlePointerUp);

    tubeGeometry.dispose();
    darkChromeMaterial.dispose();
    renderer.dispose();
  };
}