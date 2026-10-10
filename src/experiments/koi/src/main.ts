import './style.css';

import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { FISH_STL_URL } from './config';
import { scene, camera, renderer, controls, tick } from './scene';
import { setGeometry, updateFishTime } from './fish';
import { rebuild, buildUI } from './ui';

const loader = new STLLoader();

loader.load(
  FISH_STL_URL,
  (objGeom) => {
    objGeom.center();
    objGeom.rotateX(-Math.PI * 0.5);
    objGeom.scale(0.5, 0.5, 0.5);

    setGeometry(objGeom);
    rebuild();
    buildUI();

    window.addEventListener('resize', () => {
      rebuild();
    });

    renderer.setAnimationLoop(() => {
      controls.update();
      const t = tick();
      updateFishTime(t);
      renderer.render(scene, camera);
    });
  },
  undefined,
  (err) => {
    console.error('Failed to load fish STL:', err);
  }
);
