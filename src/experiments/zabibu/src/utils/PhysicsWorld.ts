import RAPIER from '@dimforge/rapier3d-compat';

export class PhysicsWorld {
  public world!: RAPIER.World;
  public eventQueue!: RAPIER.EventQueue;
  public groundCollider!: RAPIER.Collider;

  public async init(bounciness: number): Promise<void> {
    await RAPIER.init();
    this.world = new RAPIER.World({ x: 0.0, y: -9.81, z: 0.0 });
    this.eventQueue = new RAPIER.EventQueue(true);
    this.createStageColliders(bounciness);
  }

  private createStageColliders(bounciness: number): void {
    const groundDesc = RAPIER.ColliderDesc.cuboid(10.0, 0.1, 10.0)
      .setTranslation(0.0, -2.6, 0.0)
      .setRestitution(bounciness);
    this.groundCollider = this.world.createCollider(groundDesc);

    this.world.createCollider(RAPIER.ColliderDesc.cuboid(0.1, 5.0, 10.0).setTranslation(-3.5, 0.0, 0.0));
    this.world.createCollider(RAPIER.ColliderDesc.cuboid(0.1, 5.0, 10.0).setTranslation(3.5, 0.0, 0.0));
    this.world.createCollider(RAPIER.ColliderDesc.cuboid(10.0, 5.0, 0.1).setTranslation(0.0, 0.0, -2.5));
    this.world.createCollider(RAPIER.ColliderDesc.cuboid(10.0, 5.0, 0.1).setTranslation(0.0, 0.0, 2.5));
  }

  public step(): void {
    if (this.world && this.eventQueue) {
      this.world.step(this.eventQueue);
    }
  }

  public setBounciness(bounciness: number): void {
    if (this.groundCollider) {
      this.groundCollider.setRestitution(bounciness);
    }
  }
}