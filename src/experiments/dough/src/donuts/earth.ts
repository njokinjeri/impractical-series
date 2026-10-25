import * as THREE from "three";

const R = 1.0;
const TUBE = 0.52;
const DOUGH_FLAT = 0.88;

let cachedRenderer: THREE.WebGLRenderer | null = null;

const TEXTURE_BASE = "https://threejs.org/examples/textures/planets/";

interface EarthTextures {
  map: THREE.Texture | null;
  normal: THREE.Texture | null;
  roughness: THREE.Texture | null;
  clouds: THREE.Texture | null;
}

const textures: EarthTextures = {
  map: null,
  normal: null,
  roughness: null,
  clouds: null,
};

let texturesStarted = false;

function loadTextures(renderer: THREE.WebGLRenderer): void {
  if (texturesStarted) return;
  texturesStarted = true;

  const loader = new THREE.TextureLoader();
  const maxAniso = renderer.capabilities.getMaxAnisotropy();

  const prep = (tex: THREE.Texture, srgb: boolean): THREE.Texture => {
    if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = maxAniso;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  };

  loader.load(TEXTURE_BASE + "earth_atmos_2048.jpg", (t) => {
    textures.map = prep(t, true);
    if (activeEarthMaterial) {
      activeEarthMaterial.map = textures.map;
      activeEarthMaterial.needsUpdate = true;
    }
  });
  loader.load(TEXTURE_BASE + "earth_normal_2048.jpg", (t) => {
    textures.normal = prep(t, false);
    if (activeEarthMaterial) {
      activeEarthMaterial.normalMap = textures.normal;
      activeEarthMaterial.normalScale = new THREE.Vector2(0.7, 0.7);
      activeEarthMaterial.needsUpdate = true;
    }
  });
  loader.load(TEXTURE_BASE + "earth_specular_2048.jpg", (t) => {
    textures.roughness = prep(t, false);
    if (activeEarthMaterial) {
      activeEarthMaterial.roughnessMap = textures.roughness;
      activeEarthMaterial.needsUpdate = true;
    }
  });
  loader.load(TEXTURE_BASE + "earth_clouds_1024.png", (t) => {
    textures.clouds = prep(t, true);
    if (activeCloudMaterial) {
      activeCloudMaterial.map = textures.clouds;
      activeCloudMaterial.needsUpdate = true;
    }
  });
}

export function setEarthRenderer(r: THREE.WebGLRenderer): void {
  cachedRenderer = r;
  loadTextures(r);
}

let activeEarthMaterial: THREE.MeshPhysicalMaterial | null = null;
let activeCloudMaterial: THREE.MeshPhysicalMaterial | null = null;

// Guarded UV squeeze — only touches varyings that exist for the
// current material configuration.
const UV_SQUEEZE_EARTH = /* glsl */ `
  float halfTexelU = 1.0 / 4096.0;
  float vLow = 0.18;
  float vHigh = 0.82;

  #ifdef USE_MAP
    vMapUv.x = vMapUv.x * (1.0 - 2.0 * halfTexelU) + halfTexelU;
    vMapUv.y = vLow + vMapUv.y * (vHigh - vLow);
  #endif
  #ifdef USE_NORMALMAP
    vNormalMapUv.x = vNormalMapUv.x * (1.0 - 2.0 * halfTexelU) + halfTexelU;
    vNormalMapUv.y = vLow + vNormalMapUv.y * (vHigh - vLow);
  #endif
  #ifdef USE_ROUGHNESSMAP
    vRoughnessMapUv.x = vRoughnessMapUv.x * (1.0 - 2.0 * halfTexelU) + halfTexelU;
    vRoughnessMapUv.y = vLow + vRoughnessMapUv.y * (vHigh - vLow);
  #endif
`;

const UV_SQUEEZE_CLOUDS = /* glsl */ `
  float halfTexelU = 1.0 / 2048.0;
  float vLow = 0.18;
  float vHigh = 0.82;

  #ifdef USE_MAP
    vMapUv.x = vMapUv.x * (1.0 - 2.0 * halfTexelU) + halfTexelU;
    vMapUv.y = vLow + vMapUv.y * (vHigh - vLow);
  #endif
`;

function makeEarthGeo(): THREE.BufferGeometry {
  const geo = new THREE.TorusGeometry(R, TUBE, 128, 256);
  geo.rotateX(Math.PI / 2);
  geo.scale(1, DOUGH_FLAT, 1);
  geo.computeVertexNormals();
  return geo;
}

export function buildEarth(): THREE.Group {
  if (!cachedRenderer) throw new Error("Earth: renderer not set");

  const root = new THREE.Group();

  const earthGeo = makeEarthGeo();
  const earthMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.92,
    metalness: 0.0,
    clearcoat: 0.05,
    clearcoatRoughness: 0.6,
    envMapIntensity: 0.2,
  });

  if (textures.map) earthMat.map = textures.map;
  if (textures.normal) {
    earthMat.normalMap = textures.normal;
    earthMat.normalScale = new THREE.Vector2(0.7, 0.7);
  }
  if (textures.roughness) earthMat.roughnessMap = textures.roughness;

  earthMat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      "#include <uv_vertex>",
      `#include <uv_vertex>
       ${UV_SQUEEZE_EARTH}`,
    );
  };

  activeEarthMaterial = earthMat;
  root.add(new THREE.Mesh(earthGeo, earthMat));

  const cloudGeo = makeEarthGeo();
  {
    const pos = cloudGeo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const len = v.length();
      v.normalize().multiplyScalar(len * 1.006);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    pos.needsUpdate = true;
    cloudGeo.computeVertexNormals();
  }

  const cloudMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde8f5,
    transparent: true,
    opacity: 0.35,
    roughness: 1.0,
    metalness: 0.0,
    depthWrite: false,
  });

  if (textures.clouds) cloudMat.map = textures.clouds;

  cloudMat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      "#include <uv_vertex>",
      `#include <uv_vertex>
       ${UV_SQUEEZE_CLOUDS}`,
    );
  };

  activeCloudMaterial = cloudMat;
  const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
  cloudMesh.name = "earth-clouds";
  root.add(cloudMesh);

  return root;
}

export function animateEarth(root: THREE.Group, elapsed: number, _dt: number): void {
  const clouds = root.getObjectByName("earth-clouds");
  if (clouds) {
    clouds.rotation.y = elapsed * 0.008;
  }
}

export function disposeEarth(): void {
  activeEarthMaterial = null;
  activeCloudMaterial = null;
}