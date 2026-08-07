import * as THREE from 'three/webgpu';
import { DEFAULT_CONFIG, type AppConfig } from './config/constants';
import { Engine } from './core/Engine';
import { RenderLoop } from './core/RenderLoop';
import { StellationGenerator } from './geometry/StellationGenerator';
import { EngravingMaterialTSL } from './shaders/EngravingMaterialTSL';
import { GUIControls } from './ui/GUIControls';
import { InkCursor } from './ui/InkCursor';

async function bootstrap() {
  const config: AppConfig = { ...DEFAULT_CONFIG };

  const engine = new Engine('webgl-canvas');
  await engine.init();

  const renderLoop = new RenderLoop(engine);
  const materialTSL = new EngravingMaterialTSL();

  const buildGeometry = () => {
    return StellationGenerator.createGeometry(
      config.activeGeometry,
      config.stellationFactor,
      config.frameInset
    );
  };

  const currentMesh = new THREE.Mesh(buildGeometry(), materialTSL.material);
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
    currentMesh.geometry = buildGeometry();
    oldGeo.dispose();
    renderLoop.requestFrame();
  };

  new GUIControls(config, materialTSL, renderLoop, rebuildMesh);

  renderLoop.start();
}

bootstrap().catch((err) => {
  console.error('Failed to boot Chalcographia:', err);
});
