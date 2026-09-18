import * as THREE from 'three';
import type { Palette, LanternUserData } from '../types';

export const PALETTES: Palette[] = [
  {
    name: 'Warm Amber',
    paperBg: '#ffb74d',
    motifFill: 'rgba(160, 45, 5, 0.85)',
    motifStroke: 'rgba(110, 25, 0, 0.90)',
    emissive: 0xffaa22,
    capColor: 0xf57c00,
    lightColor: 0xffaa33,
  },
  {
    name: 'Teal Blue',
    paperBg: '#4dd0e1',
    motifFill: 'rgba(0, 77, 64, 0.85)',
    motifStroke: 'rgba(0, 38, 32, 0.90)',
    emissive: 0x00e5ff,
    capColor: 0x0097a7,
    lightColor: 0x80deea,
  },
  {
    name: 'Crimson Red',
    paperBg: '#ff7171',
    motifFill: 'rgba(120, 10, 20, 0.85)',
    motifStroke: 'rgba(70, 5, 10, 0.90)',
    emissive: 0xff3333,
    capColor: 0xd32f2f,
    lightColor: 0xff6666,
  },
  {
    name: 'Violet Purple',
    paperBg: '#ba68c8',
    motifFill: 'rgba(74, 20, 140, 0.85)',
    motifStroke: 'rgba(42, 10, 80, 0.90)',
    emissive: 0xd500f9,
    capColor: 0x7b1fa2,
    lightColor: 0xe1bee7,
  },
];

let canopyGeo: THREE.CylinderGeometry;
let topCapGeo: THREE.CircleGeometry;
let ringGeo: THREE.TorusGeometry;
let wireGeo: THREE.CylinderGeometry;
let fuelBlockGeo: THREE.BoxGeometry;
let flameGeo: THREE.LatheGeometry;
let textureCache: THREE.CanvasTexture[] = [];

function createSundropTexture(palette: Palette): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = palette.paperBg;
  ctx.fillRect(0, 0, 1024, 1024);

  function drawFullerSun(cx: number, cy: number) {
    ctx.save();
    ctx.fillStyle = palette.motifFill;
    ctx.strokeStyle = palette.motifStroke;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(-18, -100);
      ctx.bezierCurveTo(-65, -145, 10, -210, -20, -270);
      ctx.bezierCurveTo(45, -205, 30, -140, 18, -100);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(cx, cy, 102, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawBorderSequence(yPos: number, isTop: boolean) {
    ctx.save();
    ctx.fillStyle = palette.motifFill;
    ctx.strokeStyle = palette.motifStroke;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, yPos);
    ctx.lineTo(1024, yPos);
    ctx.stroke();
    const secondLineY = isTop ? yPos + 28 : yPos - 28;
    ctx.beginPath();
    ctx.moveTo(0, secondLineY);
    ctx.lineTo(1024, secondLineY);
    ctx.stroke();
    for (let x = 0; x < 1024; x += 64) {
      ctx.beginPath();
      ctx.arc(x + 32, isTop ? yPos + 12 : yPos - 12, 12, 0, Math.PI, !isTop);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  drawBorderSequence(60, true);
  drawBorderSequence(964, false);
  drawFullerSun(256, 512);
  drawFullerSun(768, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function initLanternFactory(): void {
  textureCache = PALETTES.map((pal) => createSundropTexture(pal));

  canopyGeo = new THREE.CylinderGeometry(0.72, 0.58, 1.8, 32, 1, true);
  topCapGeo = new THREE.CircleGeometry(0.72, 24);
  ringGeo = new THREE.TorusGeometry(0.58, 0.02, 8, 24);
  wireGeo = new THREE.CylinderGeometry(0.004, 0.004, 1.16, 6);
  fuelBlockGeo = new THREE.BoxGeometry(0.14, 0.03, 0.14);

  const flamePath = new THREE.CubicBezierCurve(
    new THREE.Vector2(0.01, 0.0),
    new THREE.Vector2(0.08, 0.08),
    new THREE.Vector2(0.05, 0.18),
    new THREE.Vector2(0.0, 0.24)
  );
  flameGeo = new THREE.LatheGeometry(flamePath.getPoints(12), 12);
}

export function getTexture(paletteIndex: number): THREE.CanvasTexture {
  return textureCache[paletteIndex];
}

export function createLantern(paletteIndex: number): THREE.Group {
  const skyLantern = new THREE.Group();
  const pal = PALETTES[paletteIndex];
  const tex = textureCache[paletteIndex];

  const bodyMat = new THREE.MeshStandardMaterial({
    map: tex,
    emissiveMap: tex,
    emissive: new THREE.Color(pal.emissive),
    emissiveIntensity: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const canopyMesh = new THREE.Mesh(canopyGeo, bodyMat);
  skyLantern.add(canopyMesh);

  const topCapMat = new THREE.MeshStandardMaterial({
    map: tex,
    emissiveMap: tex,
    emissive: new THREE.Color(pal.capColor),
    emissiveIntensity: 0.0,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  const topCapMesh = new THREE.Mesh(topCapGeo, topCapMat);
  topCapMesh.rotation.x = -Math.PI / 2;
  topCapMesh.position.y = 0.9;
  skyLantern.add(topCapMesh);

  const ringGroup = new THREE.Group();
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x22160d,
    roughness: 0.8,
  });
  const collarRing = new THREE.Mesh(ringGeo, ringMat);
  collarRing.rotation.x = Math.PI / 2;
  collarRing.position.y = -0.9;
  ringGroup.add(collarRing);

  const wireMat = new THREE.MeshBasicMaterial({ color: 0x666666 });
  const wire1 = new THREE.Mesh(wireGeo, wireMat);
  wire1.rotation.z = Math.PI / 2;
  wire1.position.y = -0.9;
  ringGroup.add(wire1);
  const wire2 = new THREE.Mesh(wireGeo, wireMat);
  wire2.rotation.x = Math.PI / 2;
  wire2.position.y = -0.9;
  ringGroup.add(wire2);

  const fuelBlockMat = new THREE.MeshStandardMaterial({
    color: 0xffeedd,
    roughness: 0.3,
  });
  const fuelBlock = new THREE.Mesh(fuelBlockGeo, fuelBlockMat);
  fuelBlock.position.y = -0.88;
  ringGroup.add(fuelBlock);

  const flameMat = new THREE.MeshBasicMaterial({
    color: 0xfffae0,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const flameMesh = new THREE.Mesh(flameGeo, flameMat);
  flameMesh.position.y = -0.86;
  ringGroup.add(flameMesh);

  skyLantern.add(ringGroup);

  const pointLight = new THREE.PointLight(pal.lightColor, 0.0, 5.0);
  pointLight.position.y = -0.5;
  skyLantern.add(pointLight);

  const userData: LanternUserData = {
    bodyMat,
    topCapMat,
    pointLight,
    flameMesh,
    flameMat,
    paletteIndex,
    isLit: false,
    seed: Math.random() * 1000,
    speedY: 0.3 + Math.random() * 0.3,
    swaySpeed: 0.5 + Math.random() * 0.5,
    swayRadius: 1.0 + Math.random() * 1.0,
    rotSpeed: (Math.random() - 0.5) * 0.2,
  };

  skyLantern.userData = userData;

  return skyLantern;
}
