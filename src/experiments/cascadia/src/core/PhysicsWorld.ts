import * as CANNON from 'cannon-es';

export class PhysicsWorld {
  private world: CANNON.World;
  private groundMat: CANNON.Material;
  private dominoMat: CANNON.Material;
  private postStepCallbacks: Array<() => void> = [];

  constructor() {
    this.world = new CANNON.World();
    this.world.gravity.set(0, -25.0, 0);
    this.world.broadphase = new CANNON.SAPBroadphase(this.world);
    this.world.allowSleep = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.world.solver as any).iterations = 15;

    const worldWithSleep = this.world as unknown as {
      sleepTimeLimit: number;
      sleepSpeedLimit: number;
    };
    worldWithSleep.sleepTimeLimit = 0.5;
    worldWithSleep.sleepSpeedLimit = 0.02;

    this.groundMat = new CANNON.Material('ground');
    this.dominoMat = new CANNON.Material('domino');

    this.world.addContactMaterial(
      new CANNON.ContactMaterial(this.groundMat, this.dominoMat, {
        friction: 0.7,
        restitution: 0.3,
      })
    );

    this.world.addContactMaterial(
      new CANNON.ContactMaterial(this.dominoMat, this.dominoMat, {
        friction: 0.7,
        restitution: 0.3,
      })
    );

    this.createGround();
  }

  private createGround(): void {
    const groundBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
      material: this.groundMat,
    });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    this.world.addBody(groundBody);
  }

  step(dt: number = 1 / 60): void {
    const cappedDt = Math.min(dt, 0.033);
    this.world.step(cappedDt);
  }

  addBody(body: CANNON.Body): void {
    this.world.addBody(body);
  }

  removeBody(body: CANNON.Body): void {
    this.world.removeBody(body);
  }

  onPostStep(callback: () => void): void {
    this.world.addEventListener('postStep', callback);
    this.postStepCallbacks.push(callback);
  }

  getWorld(): CANNON.World {
    return this.world;
  }

  getDominoMaterial(): CANNON.Material {
    return this.dominoMat;
  }

  dispose(): void {
    for (const callback of this.postStepCallbacks) {
      this.world.removeEventListener('postStep', callback);
    }
    this.postStepCallbacks = [];
  }
}