import * as THREE from 'three';

export interface IShapeAdapter {
  getGridSize(): { u: number; v: number };
  toWorld(u: number, v: number): THREE.Vector3;
  wrap(u: number, v: number): { u: number; v: number };
}
