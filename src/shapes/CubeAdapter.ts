import * as THREE from 'three';
import type { Cell, Direction } from '../core/Grid';
import type { IShapeAdapter } from './IShapeAdapter';

/**
 * Projects grid coordinates onto the six faces of a cube. Wrapping logic maps
 * movements across an edge to the adjacent face, preserving direction.
 */
export class CubeAdapter implements IShapeAdapter {
  constructor(private size = 10) {}

  getGridSize() {
    return { u: this.size, v: this.size };
  }

  getFaceCount() {
    return 6;
  }

  /** Convert a grid cell to world space on the cube surface. */
  toWorld(cell: Cell): THREE.Vector3 {
    const offset = this.size / 2 - 0.5;
    const x = cell.u - offset;
    const y = offset - cell.v;
    switch (cell.face) {
      case 0:
        return new THREE.Vector3(x, y, offset);
      case 1:
        return new THREE.Vector3(offset, y, -x);
      case 2:
        return new THREE.Vector3(-x, y, -offset);
      case 3:
        return new THREE.Vector3(-offset, y, x);
      case 4:
        return new THREE.Vector3(x, offset, -y);
      case 5:
        return new THREE.Vector3(x, -offset, y);
      default:
        return new THREE.Vector3();
    }
  }

  /**
   * Wrap a cell when moving off one face to the neighbor face. The direction
   * determines which face transition to perform.
   */
  wrap(cell: Cell, dir: Direction): Cell {
    const { face } = cell;
    let { u, v } = cell;
    const last = this.size - 1;
    switch (face) {
      case 0: // front
        if (u < 0 && dir === 'left') return { face: 3, u: last, v };
        if (u > last && dir === 'right') return { face: 1, u: 0, v };
        if (v < 0 && dir === 'up') return { face: 4, u, v: last };
        if (v > last && dir === 'down') return { face: 5, u, v: 0 };
        break;
      case 1: // right
        if (u < 0 && dir === 'left') return { face: 0, u: last, v };
        if (u > last && dir === 'right') return { face: 2, u: 0, v };
        if (v < 0 && dir === 'up') return { face: 4, u: last, v: u };
        if (v > last && dir === 'down') return { face: 5, u: last, v: u };
        break;
      case 2: // back
        if (u < 0 && dir === 'left') return { face: 1, u: last, v };
        if (u > last && dir === 'right') return { face: 3, u: 0, v };
        if (v < 0 && dir === 'up') return { face: 4, u, v: 0 };
        if (v > last && dir === 'down') return { face: 5, u, v: last };
        break;
      case 3: // left
        if (u < 0 && dir === 'left') return { face: 2, u: last, v };
        if (u > last && dir === 'right') return { face: 0, u: 0, v };
        if (v < 0 && dir === 'up') return { face: 4, u: 0, v: u };
        if (v > last && dir === 'down') return { face: 5, u: 0, v: u };
        break;
      case 4: // top
        if (v < 0 && dir === 'up') return { face: 2, u, v: last };
        if (v > last && dir === 'down') return { face: 0, u, v: 0 };
        if (u < 0 && dir === 'left') return { face: 3, u: v, v: 0 };
        if (u > last && dir === 'right') return { face: 1, u: v, v: 0 };
        break;
      case 5: // bottom
        if (v < 0 && dir === 'up') return { face: 0, u, v: last };
        if (v > last && dir === 'down') return { face: 2, u, v: 0 };
        if (u < 0 && dir === 'left') return { face: 3, u: last - v, v: last };
        if (u > last && dir === 'right')
          return { face: 1, u: last - v, v: last };
        break;
    }
    // fallback wrap on same face
    u = (u + this.size) % this.size;
    v = (v + this.size) % this.size;
    return { face, u, v };
  }
}
