import * as THREE from 'three';
import { Engine } from './core/Engine';
import { RenderLoop } from './core/RenderLoop';
import { EngravingMaterial } from './shaders/EngravingMaterial';
import { InkCursor } from './ui/InkCursor';
import { GUIControls } from './ui/GUIControls';
import { DEFAULT_CONFIG } from './config/constants';
import {
  StellationGenerator,
  type BaseSolidType,
} from './geometry/StellationGenerator';
import parchmentUrl from './assets/parchment-paper.jpg';
async function bootstrap() {
  document.body.style.backgroundImage = `url(${parchmentUrl})`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';

  const config = { ...DEFAULT_CONFIG };

  const engine = new Engine('webgl-canvas');
  await engine.init();

  const engravingMat = new EngravingMaterial();
  const renderLoop = new RenderLoop(engine);

  const buildGeometryFromConfig = () =>
    StellationGenerator.createGeometry(
      config.activeGeometry as BaseSolidType,
      config.stellationFactor,
      config.frameInset
    );

  const currentMesh = new THREE.Mesh(
    buildGeometryFromConfig(),
    engravingMat.material
  );
  engine.scene.add(currentMesh);

  const inkCursor = new InkCursor(() => {
    renderLoop.requestFrame();
  });

  renderLoop.addUpdateCallback(() => {
    inkCursor.update();
    if (currentMesh) {
      currentMesh.rotation.y += 0.003;
      currentMesh.rotation.x += 0.001;
    }

    renderLoop.requestFrame();
  });

  const rebuildMesh = () => {
    const oldGeo = currentMesh.geometry;
    currentMesh.geometry = buildGeometryFromConfig();
    oldGeo.dispose();
    renderLoop.requestFrame();
  };

  new GUIControls(config, engravingMat, renderLoop, rebuildMesh);

  renderLoop.start();
}

bootstrap().catch((err) => {
  console.error('Failed to boot Chalcographia:', err);
});
