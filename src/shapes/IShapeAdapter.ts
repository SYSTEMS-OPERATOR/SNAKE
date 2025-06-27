import * as THREE from 'three';

import type { Cell, Direction } from '../core/Grid';

export interface IShapeAdapter {
  /**
   * Return the grid dimensions in cells used by this shape.
   */
  getGridSize(): { u: number; v: number };
  /**
   * Number of distinct faces this adapter exposes. A sphere uses one,
   * while a cube uses six.
   */
  getFaceCount(): number;
  /**
   * Convert a logical grid cell to a world-space position on the shape.
   */
  toWorld(cell: Cell): THREE.Vector3;
  /**
   * Wrap a cell that moves beyond the shape's bounds to its new location
   * and face. Direction is provided for adapters that need it.
   */
  wrap(cell: Cell, dir: Direction): Cell;
}
