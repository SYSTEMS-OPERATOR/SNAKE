import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import type { Snake } from '../core/Snake';
import type { Fruit } from '../core/Fruit';
import type { IShapeAdapter } from '../shapes/IShapeAdapter';

export class GameRenderer {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  light: THREE.AmbientLight;
  renderer: THREE.WebGLRenderer;
  controls?: OrbitControls;
  private arButton?: HTMLElement;
  private orientationHandler?: (e: DeviceOrientationEvent) => void;
  private orientationActive = false;
  snakeMeshes: THREE.Mesh[] = [];
  fruitMesh: THREE.Mesh;
  dom: HTMLElement;

  constructor(
    private snake: Snake,
    private fruit: Fruit,
    private adapter: IShapeAdapter,
    withControls = false
  ) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = adapter.getGridSize().u * 1.5;

    this.light = new THREE.AmbientLight(0xffffff);
    this.scene.add(this.light);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.dom = this.renderer.domElement;

    if (withControls) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    } else if ('DeviceOrientationEvent' in window) {
      this.orientationHandler = (e: DeviceOrientationEvent) => {
        const alpha = (e.alpha ?? 0) * (Math.PI / 180);
        const radius = adapter.getGridSize().u * 1.5;
        this.camera.position.x = radius * Math.sin(alpha);
        this.camera.position.z = radius * Math.cos(alpha);
        this.camera.lookAt(0, 0, 0);
      };
      window.addEventListener('deviceorientation', this.orientationHandler);
      this.orientationActive = true;
    }

    this.snakeMeshes = this.snake.body.map(() => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 0x00ff00 })
      );
      this.scene.add(mesh);
      return mesh;
    });

    const fgeom = new THREE.SphereGeometry(0.5);
    const fmat = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      emissive: 0xff0000,
    });
    this.fruitMesh = new THREE.Mesh(fgeom, fmat);
    this.scene.add(this.fruitMesh);
  }

  private ensureSegments() {
    while (this.snakeMeshes.length < this.snake.body.length) {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 0x00ff00 })
      );
      this.scene.add(mesh);
      this.snakeMeshes.push(mesh);
    }
    // Remove extra meshes when the snake shrinks (e.g., after reset)
    while (this.snakeMeshes.length > this.snake.body.length) {
      const mesh = this.snakeMeshes.pop();
      if (mesh) {
        this.scene.remove(mesh);
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material.dispose();
        }
      }
    }
  }

  /** Enable WebXR AR mode if supported. */
  enableAR() {
    this.renderer.xr.enabled = true;
    this.arButton = ARButton.createButton(this.renderer);
    document.body.appendChild(this.arButton);
  }

  /**
   * Reset the renderer to match the current snake state.
   * Removes all segment meshes and recreates them so the
   * renderer exactly mirrors the snake body length. This
   * prevents stale meshes from persisting after a game reset.
   */
  reset() {
    // Dispose existing meshes
    for (const mesh of this.snakeMeshes) {
      this.scene.remove(mesh);
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((m) => m.dispose());
      } else {
        mesh.material.dispose();
      }
    }
    this.snakeMeshes = [];

    // Recreate segment meshes exactly matching the snake length
    for (let i = 0; i < this.snake.body.length; i++) {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({ color: 0x00ff00 })
      );
      this.scene.add(mesh);
      this.snakeMeshes.push(mesh);
    }
    // Update fruit position as well
    this.fruitMesh.position.copy(this.adapter.toWorld(this.fruit.cell));

    // Immediately position the new meshes so the next frame
    // renders the correct state without a one-frame flicker.
    this.update();
  }

  update() {
    this.ensureSegments();
    for (let i = 0; i < this.snake.body.length; i++) {
      const pos = this.adapter.toWorld(this.snake.body[i]);
      this.snakeMeshes[i].position.copy(pos);
    }
    this.fruitMesh.position.copy(this.adapter.toWorld(this.fruit.cell));
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.snakeMeshes.forEach((m) => {
      this.scene.remove(m);
      m.geometry.dispose();
      (m.material as THREE.Material).dispose();
    });
    this.snakeMeshes = [];
    this.scene.remove(this.fruitMesh);
    this.fruitMesh.geometry.dispose();
    (this.fruitMesh.material as THREE.Material).dispose();
    this.scene.remove(this.light);
    if (this.controls) {
      this.controls.dispose();
    }
    if (this.orientationActive && this.orientationHandler) {
      window.removeEventListener('deviceorientation', this.orientationHandler);
      this.orientationActive = false;
      this.orientationHandler = undefined;
    }
    if (this.arButton && this.arButton.parentElement) {
      this.arButton.parentElement.removeChild(this.arButton);
    }
    this.renderer.dispose();
    if (this.dom.parentElement) {
      this.dom.parentElement.removeChild(this.dom);
    }
  }
}
