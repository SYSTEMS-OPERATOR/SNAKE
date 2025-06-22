import * as THREE from 'three';
import type { IShapeAdapter } from './IShapeAdapter';

export class CubeAdapter implements IShapeAdapter {
  private size: number;

  constructor(size = 10) {
    this.size = size;
  }

  getGridSize() {
    return { u: this.size, v: this.size };
  }

  toWorld(u: number, v: number): THREE.Vector3 {
    // Map grid coordinate to one cube face for now
    const x = u - this.size / 2;
    const y = v - this.size / 2;
    return new THREE.Vector3(x, y, 0);
  }

  wrap(u: number, v: number) {
    const wrappedU = (u + this.size) % this.size;
    const wrappedV = (v + this.size) % this.size;
    return { u: wrappedU, v: wrappedV };
  }
}
