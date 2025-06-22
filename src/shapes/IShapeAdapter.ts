import * as THREE from 'three';

import type { Cell, Direction } from '../core/Grid';

export interface IShapeAdapter {
  getGridSize(): { u: number; v: number };
  /** Number of faces used by this adapter. */
  getFaceCount(): number;
  toWorld(cell: Cell): THREE.Vector3;
  wrap(cell: Cell, dir: Direction): Cell;
}
