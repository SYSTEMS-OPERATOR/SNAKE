import * as THREE from 'three';
import type { Cell, Direction } from '../core/Grid';
import type { IShapeAdapter } from './IShapeAdapter';

/**
 * Maps grid coordinates onto a sphere using an equirectangular projection.
 * The sphere uses a single face index (0) for all cells.
 */
export class SphereAdapter implements IShapeAdapter {
  private radius: number;
  constructor(private size = 10, radius?: number) {
    this.radius = radius ?? size / Math.PI;
  }

  getGridSize() {
    return { u: this.size, v: this.size };
  }

  getFaceCount() {
    return 1;
  }

  /**
   * Convert a grid cell to a point on the sphere surface.
   *
   * `u` maps to longitude (phi) and `v` to latitude (theta) using an
   * equirectangular projection. Half-cell offsets center the cell on the
   * surface patch.
   */
  toWorld(cell: Cell): THREE.Vector3 {
    const phi = (cell.u + 0.5) * (2 * Math.PI / this.size); // longitude
    const theta = (cell.v + 0.5) * (Math.PI / this.size); // latitude
    const x = this.radius * Math.sin(theta) * Math.cos(phi);
    const y = this.radius * Math.cos(theta);
    const z = this.radius * Math.sin(theta) * Math.sin(phi);
    return new THREE.Vector3(x, y, z);
  }

  /**
   * Wrap a cell around the sphere.
   *
   * Because the sphere has no edges, moving off one side simply wraps the
   * coordinates modulo the grid size. The direction is unused but kept for
   * parity with other adapters.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  wrap(cell: Cell, _dir: Direction): Cell {
    let { u, v } = cell;
    u = (u + this.size) % this.size;
    v = (v + this.size) % this.size;
    return { face: 0, u, v };
  }
}
