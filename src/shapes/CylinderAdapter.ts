import * as THREE from 'three';
import type { Cell, Direction } from '../core/Grid';
import type { IShapeAdapter } from './IShapeAdapter';

/**
 * Projects grid coordinates onto a cylinder with top and bottom caps.
 * Face 0 is the curved side, face 1 the top, and face 2 the bottom.
 */
export class CylinderAdapter implements IShapeAdapter {
  private radius: number;

  constructor(private size = 10, radius?: number) {
    this.radius = radius ?? size / (2 * Math.PI);
  }

  getGridSize() {
    return { u: this.size, v: this.size };
  }

  getFaceCount() {
    return 3;
  }

  /**
   * Convert a grid cell to world space on the cylinder surface.
   *
   * `u` rotates around the cylinder's axis while `v` moves along the height.
   * For the caps, `v` represents radial distance from the center.
   */
  toWorld(cell: Cell): THREE.Vector3 {
    const angle = (cell.u + 0.5) * (2 * Math.PI / this.size);
    const offset = this.size / 2 - 0.5;
    switch (cell.face) {
      case 0: // side
        return new THREE.Vector3(
          this.radius * Math.cos(angle),
          offset - cell.v,
          this.radius * Math.sin(angle)
        );
      case 1: // top
        {
          const r = (cell.v + 0.5) * (this.radius / this.size);
          return new THREE.Vector3(
            r * Math.cos(angle),
            offset,
            r * Math.sin(angle)
          );
        }
      case 2: // bottom
        {
          const r = (cell.v + 0.5) * (this.radius / this.size);
          return new THREE.Vector3(
            r * Math.cos(angle),
            -offset,
            r * Math.sin(angle)
          );
        }
      default:
        return new THREE.Vector3();
    }
  }

  /**
   * Wrap coordinates around the cylinder and between faces.
   *
   * When leaving the side at the top or bottom the cell transitions to the
   * respective cap. Horizontal movement around the side wraps modulo the grid
   * width.
   */
  wrap(cell: Cell, dir: Direction): Cell {
    const { face } = cell;
    let { u, v } = cell;
    const last = this.size - 1;
    switch (face) {
      case 0: // side
        if (u < 0) u = last;
        if (u > last) u = 0;
        if (v < 0 && dir === 'up') return { face: 1, u, v: 0 };
        if (v > last && dir === 'down') return { face: 2, u, v: 0 };
        break;
      case 1: // top
        if (u < 0) u = last;
        if (u > last) u = 0;
        if (v < 0 && dir === 'down') return { face: 0, u, v: 0 };
        if (v > last && dir === 'up') return { face: 0, u, v: last };
        break;
      case 2: // bottom
        if (u < 0) u = last;
        if (u > last) u = 0;
        if (v < 0 && dir === 'up') return { face: 0, u, v: last };
        if (v > last && dir === 'down') return { face: 0, u, v: 0 };
        break;
    }
    u = (u + this.size) % this.size;
    v = (v + this.size) % this.size;
    return { face, u, v };
  }
}
