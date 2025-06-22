import * as THREE from 'three';
import { Snake } from '../core/Snake';
import { CubeAdapter } from '../shapes/CubeAdapter';

export class GameRenderer {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  light: THREE.AmbientLight;
  renderer: THREE.WebGLRenderer;
  snakeMeshes: THREE.Mesh[] = [];
  cubeAdapter: CubeAdapter;

  constructor(private snake: Snake, cubeAdapter: CubeAdapter) {
    this.cubeAdapter = cubeAdapter;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 20;

    this.light = new THREE.AmbientLight(0xffffff);
    this.scene.add(this.light);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    for (let i = 0; i < this.snake.body.length; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh);
      this.snakeMeshes.push(mesh);
    }
  }

  update() {
    const { body } = this.snake;
    for (let i = 0; i < body.length; i++) {
      const pos = this.cubeAdapter.toWorld(body[i].u, body[i].v);
      this.snakeMeshes[i].position.copy(pos);
    }
    this.renderer.render(this.scene, this.camera);
  }
}
