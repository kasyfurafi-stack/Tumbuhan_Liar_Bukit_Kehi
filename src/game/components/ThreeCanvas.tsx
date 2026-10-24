import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PlantData, PLANTS_DATA } from '../data/plants';
import { soundEngine } from '../audio/sound';

export interface VirtualControls {
  forward: number;
  side: number;
  run: boolean;
}

interface ThreeCanvasProps {
  collectedMap: Record<number, boolean>;
  onProximityChange: (plant: PlantData | null) => void;
  onPlayerPositionChange?: (x: number, z: number, rotationY: number) => void;
  isModalOpen?: boolean;
  virtualControls?: VirtualControls;
  jumpTrigger?: number;
}

export function getHillHeight(x: number, z: number): number {
  const d = Math.sqrt(x * x + z * z);
  let h = Math.sin(x * 0.06) * 1.8 + Math.cos(z * 0.06) * 1.8 + Math.sin((x + z) * 0.03) * 2.2;
  const riverDist = Math.abs(x - z * 0.6 - 6);
  if (riverDist < 5.5) {
    h -= (5.5 - riverDist) * 0.75;
  }
  if (d > 46) {
    h += Math.pow((d - 46) * 0.6, 1.6);
  }
  return h;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  collectedMap,
  onProximityChange,
  onPlayerPositionChange,
  isModalOpen = false,
  virtualControls,
  jumpTrigger = 0
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const collectedMapRef = useRef(collectedMap);
  const onProximityChangeRef = useRef(onProximityChange);
  const onPlayerPosChangeRef = useRef(onPlayerPositionChange);
  const isModalOpenRef = useRef(isModalOpen);
  const virtualControlsRef = useRef(virtualControls);
  const jumpTriggerRef = useRef(jumpTrigger);

  collectedMapRef.current = collectedMap;
  onProximityChangeRef.current = onProximityChange;
  onPlayerPosChangeRef.current = onPlayerPositionChange;
  isModalOpenRef.current = isModalOpen;
  virtualControlsRef.current = virtualControls;
  jumpTriggerRef.current = jumpTrigger;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xb8e2f2);
    scene.fog = new THREE.FogExp2(0xb8e2f2, 0.012);

    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.2, 350);

    // Lighting
    const hemiLight = new THREE.HemisphereLight(0xfff9e6, 0x4d7c38, 0.85);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 1.25);
    sunLight.position.set(40, 70, 35);
    sunLight.castShadow = !isSoftwareGl;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 160;
    const shadowD = 55;
    sunLight.shadow.camera.left = -shadowD;
    sunLight.shadow.camera.right = shadowD;
    sunLight.shadow.camera.top = shadowD;
    sunLight.shadow.camera.bottom = -shadowD;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Terrain Geometry
    const terrainGeo = new THREE.PlaneGeometry(120, 120, 64, 64);
    terrainGeo.rotateX(-Math.PI / 2);
    const posAttr = terrainGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vz = posAttr.getZ(i);
      posAttr.setY(i, getHillHeight(vx, vz));
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshLambertMaterial({
      color: 0x5a9a4b,
      flatShading: true
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.receiveShadow = true;
    scene.add(terrain);

    // River
    const riverGeo = new THREE.PlaneGeometry(120, 8);
    riverGeo.rotateX(-Math.PI / 2);
    riverGeo.rotateY(Math.PI / 5.5);
    const riverMat = new THREE.MeshLambertMaterial({
      color: 0x4ba3e3,
      transparent: true,
      opacity: 0.8
    });
    const river = new THREE.Mesh(riverGeo, riverMat);
    river.position.set(6, -0.6, 0);
    scene.add(river);

    // Wooden Bridge
    const bridge = new THREE.Group();
    const plankMat = new THREE.MeshLambertMaterial({ color: 0x8d5b32 });
    for (let i = -3; i <= 3; i++) {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.25, 4.2), plankMat);
      plank.position.set(i * 1.25, 0.4, 0);
      plank.castShadow = true;
      plank.receiveShadow = true;
      bridge.add(plank);
    }
    bridge.position.set(6, getHillHeight(6, 0), 0);
    bridge.rotation.y = Math.PI / 5.5;
    scene.add(bridge);

    // Instanced Trees
    const numTrees = 75;
    const treeTrunkGeo = new THREE.CylinderGeometry(0.35, 0.6, 3, 6);
    const treeFoliageGeo = new THREE.ConeGeometry(2.4, 4.5, 6);
    const trunkMat = new THREE.MeshLambertMaterial({ color: 0x5c4033 });
    const foliageMat = new THREE.MeshLambertMaterial({ color: 0x2e6629, flatShading: true });

    const trunkInstanced = new THREE.InstancedMesh(treeTrunkGeo, trunkMat, numTrees);
    const foliageInstanced = new THREE.InstancedMesh(treeFoliageGeo, foliageMat, numTrees);
    trunkInstanced.castShadow = true;
    trunkInstanced.receiveShadow = true;
    foliageInstanced.castShadow = true;

    const dummy = new THREE.Object3D();
    let placed = 0;
    let attempt = 0;
    while (placed < numTrees && attempt < numTrees * 5) {
      attempt++;
      const angle = (placed / numTrees) * Math.PI * 2 + Math.sin(attempt * 1.5) * 0.4;
      const dist = 14 + (placed % 7) * 4.6 + Math.cos(attempt * 2.3) * 3;
      const tx = Math.cos(angle) * dist;
      const tz = Math.sin(angle) * dist;

      if (Math.abs(tx - tz * 0.6 - 6) >= 4.5 && Math.sqrt(tx * tx + tz * tz) > 7) {
        const ty = getHillHeight(tx, tz);
        const sc = 0.8 + ((placed * 17) % 10) * 0.06;

        dummy.position.set(tx, ty + 1.5 * sc, tz);
        dummy.scale.set(sc, sc, sc);
        dummy.rotation.y = placed * 0.6;
        dummy.updateMatrix();
        trunkInstanced.setMatrixAt(placed, dummy.matrix);

        dummy.position.set(tx, ty + (1.5 + 2.2) * sc, tz);
        dummy.updateMatrix();
        foliageInstanced.setMatrixAt(placed, dummy.matrix);
        placed++;
      }
    }
    // Set remaining unplaced to zero scale underground
    while (placed < numTrees) {
      dummy.position.set(0, -999, 0);
      dummy.scale.set(0, 0, 0);
      dummy.updateMatrix();
      trunkInstanced.setMatrixAt(placed, dummy.matrix);
      foliageInstanced.setMatrixAt(placed, dummy.matrix);
      placed++;
    }
    trunkInstanced.instanceMatrix.needsUpdate = true;
    foliageInstanced.instanceMatrix.needsUpdate = true;
    scene.add(trunkInstanced);
    scene.add(foliageInstanced);

    // Instanced Rocks
    const rockGeo = new THREE.DodecahedronGeometry(0.8, 0);
    const rockMat = new THREE.MeshLambertMaterial({ color: 0x8a9289, flatShading: true });
    const numRocks = 45;
    const rockInstanced = new THREE.InstancedMesh(rockGeo, rockMat, numRocks);
    rockInstanced.castShadow = true;
    rockInstanced.receiveShadow = true;

    for (let i = 0; i < numRocks; i++) {
      const rx = Math.sin(i * 3.7) * 40;
      const rz = Math.cos(i * 2.3) * 40;
      const ry = getHillHeight(rx, rz);
      const scX = 0.6 + ((i * 5) % 8) * 0.12;
      const scY = 0.4 + ((i * 3) % 6) * 0.08;
      const scZ = 0.6 + ((i * 7) % 8) * 0.12;

      dummy.position.set(rx, ry + scY * 0.4, rz);
      dummy.scale.set(scX, scY, scZ);
      dummy.rotation.set(i * 0.5, i * 0.3, i * 0.8);
      dummy.updateMatrix();
      rockInstanced.setMatrixAt(i, dummy.matrix);
    }
    rockInstanced.instanceMatrix.needsUpdate = true;
    scene.add(rockInstanced);

    // Plant Helper Maker
    const createMarkerSprite = (isCheck: boolean) => {
      const cv = document.createElement('canvas');
      cv.width = 128;
      cv.height = 128;
      const ctx = cv.getContext('2d')!;
      ctx.fillStyle = isCheck ? '#2e7d32' : '#ffb300';
      ctx.beginPath();
      ctx.arc(64, 64, 56, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 74px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(isCheck ? '✓' : '?', 64, 64);
      return new THREE.CanvasTexture(cv);
    };

    function buildPlantModel(type: string): THREE.Group {
      const grp = new THREE.Group();
      switch (type) {
        case 'tree_mimba': {
          const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.8, 4.5, 7), new THREE.MeshLambertMaterial({ color: 0x4e3629 }));
          trunk.position.y = 2.25;
          grp.add(trunk);
          for (let i = 0; i < 4; i++) {
            const crown = new THREE.Mesh(new THREE.DodecahedronGeometry(1.8 - i * 0.25, 1), new THREE.MeshLambertMaterial({ color: 0x2e7d32, flatShading: true }));
            crown.position.set(Math.sin(i * 2) * 0.6, 4 + i * 0.9, Math.cos(i * 2) * 0.6);
            grp.add(crown);
          }
          break;
        }
        case 'tree_mindi': {
          const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.7, 4.2, 7), new THREE.MeshLambertMaterial({ color: 0x5a4632 }));
          trunk.position.y = 2.1;
          grp.add(trunk);
          const crown = new THREE.Mesh(new THREE.SphereGeometry(2.3, 7, 6), new THREE.MeshLambertMaterial({ color: 0x388e3c, flatShading: true }));
          crown.position.y = 4.8;
          grp.add(crown);
          break;
        }
        case 'kirinyuh': {
          for (let i = 0; i < 5; i++) {
            const bush = new THREE.Mesh(new THREE.DodecahedronGeometry(0.85, 0), new THREE.MeshLambertMaterial({ color: 0x66bb6a, flatShading: true }));
            bush.position.set(Math.sin(i * 1.3) * 0.8, 0.8 + (i % 2) * 0.4, Math.cos(i * 1.3) * 0.8);
            grp.add(bush);
          }
          break;
        }
        case 'ruellia': {
          const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 1.2, 5), new THREE.MeshLambertMaterial({ color: 0x2e7d32 }));
          stem.position.y = 0.6;
          grp.add(stem);
          for (let i = 0; i < 3; i++) {
            const flower = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.7, 6), new THREE.MeshLambertMaterial({ color: 0x7e57c2, flatShading: true }));
            flower.rotation.x = Math.PI + (i - 1) * 0.3;
            flower.rotation.z = (i - 1) * 0.5;
            flower.position.set((i - 1) * 0.3, 1.2, 0);
            grp.add(flower);
          }
          break;
        }
        case 'sida': {
          const leaves = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, 0.4, 6), new THREE.MeshLambertMaterial({ color: 0x43a047 }));
          leaves.position.y = 0.2;
          grp.add(leaves);
          for (let i = 0; i < 4; i++) {
            const petal = new THREE.Mesh(new THREE.SphereGeometry(0.2, 5, 4), new THREE.MeshLambertMaterial({ color: 0xffeb3b }));
            petal.position.set(Math.cos(i * 1.57) * 0.4, 0.45, Math.sin(i * 1.57) * 0.4);
            grp.add(petal);
          }
          break;
        }
        case 'salvia': {
          const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.3, 5), new THREE.MeshLambertMaterial({ color: 0x388e3c }));
          stem.position.y = 0.65;
          grp.add(stem);
          for (let i = 0; i < 5; i++) {
            const fl = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), new THREE.MeshLambertMaterial({ color: 0x3f51b5 }));
            fl.position.set(i % 2 === 0 ? 0.12 : -0.12, 0.7 + i * 0.15, 0);
            grp.add(fl);
          }
          break;
        }
        case 'ageratum': {
          const base = new THREE.Mesh(new THREE.SphereGeometry(0.5, 6, 5), new THREE.MeshLambertMaterial({ color: 0x4caf50 }));
          base.position.y = 0.35;
          grp.add(base);
          for (let i = 0; i < 5; i++) {
            const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 6, 6), new THREE.MeshLambertMaterial({ color: 0xce93d8 }));
            head.position.set(Math.sin(i * 1.5) * 0.3, 0.8 + (i % 3) * 0.15, Math.cos(i * 1.5) * 0.3);
            grp.add(head);
          }
          break;
        }
        case 'rubus': {
          const vine = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.1, 5, 12), new THREE.MeshLambertMaterial({ color: 0x33691e }));
          vine.rotation.x = Math.PI / 2.3;
          vine.position.y = 0.25;
          grp.add(vine);
          for (let i = 0; i < 4; i++) {
            const berry = new THREE.Mesh(new THREE.DodecahedronGeometry(0.16, 0), new THREE.MeshLambertMaterial({ color: i % 2 === 0 ? 0xd32f2f : 0x212121 }));
            berry.position.set(Math.sin(i * 1.7) * 0.45, 0.4 + (i % 2) * 0.1, Math.cos(i * 1.7) * 0.45);
            grp.add(berry);
          }
          break;
        }
        case 'phyllanthus': {
          for (let i = 0; i < 4; i++) {
            const frond = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.9, 0.4), new THREE.MeshLambertMaterial({ color: 0x66bb6a }));
            frond.rotation.z = (i - 1.5) * 0.35;
            frond.position.set((i - 1.5) * 0.25, 0.55, 0);
            grp.add(frond);
          }
          break;
        }
        case 'leucas': {
          const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 1.4, 5), new THREE.MeshLambertMaterial({ color: 0x2e7d32 }));
          stem.position.y = 0.7;
          grp.add(stem);
          for (let i = 0; i < 3; i++) {
            const ring = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.1, 5, 8), new THREE.MeshLambertMaterial({ color: 0xffffff }));
            ring.rotation.x = Math.PI / 2;
            ring.position.y = 0.5 + i * 0.35;
            grp.add(ring);
          }
          break;
        }
        default: {
          const patch = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.1, 0.2, 7), new THREE.MeshLambertMaterial({ color: 0x558b2f, flatShading: true }));
          patch.position.y = 0.1;
          grp.add(patch);
          for (let i = 0; i < 4; i++) {
            const fl = new THREE.Mesh(new THREE.SphereGeometry(0.12, 4, 4), new THREE.MeshLambertMaterial({ color: 0xffffff }));
            fl.position.set(Math.sin(i * 1.6) * 0.4, 0.25, Math.cos(i * 1.6) * 0.4);
            grp.add(fl);
          }
          break;
        }
      }
      grp.traverse((c) => {
        if ((c as THREE.Mesh).isMesh) {
          c.castShadow = true;
          c.receiveShadow = true;
        }
      });
      return grp;
    }

    interface PlantHolder {
      root: THREE.Group;
      data: PlantData;
      sprite: THREE.Sprite;
      ring: THREE.Mesh;
    }

    const plantHolders: PlantHolder[] = [];

    PLANTS_DATA.forEach((plant) => {
      const root = new THREE.Group();
      const py = getHillHeight(plant.pos.x, plant.pos.z);
      root.position.set(plant.pos.x, py, plant.pos.z);

      const model = buildPlantModel(plant.type);
      root.add(model);

      // Marker
      const ringGeo = new THREE.TorusGeometry(0.7, 0.08, 8, 16);
      const isCol = !!collectedMapRef.current[plant.id];
      const ringMat = new THREE.MeshBasicMaterial({ color: isCol ? 0x2e7d32 : 0xffeb3b });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      root.add(ring);

      const tex = createMarkerSprite(isCol);
      const spriteMat = new THREE.SpriteMaterial({ map: tex, depthTest: false });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(1.4, 1.4, 1.4);
      sprite.position.y = 1.6;
      root.add(sprite);

      scene.add(root);
      plantHolders.push({ root, data: plant, sprite, ring });
    });

    // Low-poly Adventurer Kid Character
    const player = new THREE.Group();
    player.position.set(0, getHillHeight(0, 0), 0);
    scene.add(player);

    const skinMat = new THREE.MeshLambertMaterial({ color: 0xf3c099 });
    const shirtMat = new THREE.MeshLambertMaterial({ color: 0x388e3c });
    const pantsMat = new THREE.MeshLambertMaterial({ color: 0x6d4c41 });
    const hatMat = new THREE.MeshLambertMaterial({ color: 0xc49a45 });
    const packMat = new THREE.MeshLambertMaterial({ color: 0x795548 });

    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.85, 0.45), shirtMat);
    torso.position.y = 1.15;
    torso.castShadow = true;
    player.add(torso);

    const backpack = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 0.3), packMat);
    backpack.position.set(0, 1.2, -0.32);
    backpack.castShadow = true;
    player.add(backpack);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.52), skinMat);
    head.position.y = 1.85;
    head.castShadow = true;
    player.add(head);

    const hatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.08, 12), hatMat);
    hatBrim.position.y = 2.15;
    player.add(hatBrim);
    const hatTop = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.45, 0.4, 10), hatMat);
    hatTop.position.y = 2.35;
    hatTop.castShadow = true;
    player.add(hatTop);

    const armGeo = new THREE.BoxGeometry(0.2, 0.65, 0.2);
    armGeo.translate(0, -0.28, 0);

    const leftArm = new THREE.Mesh(armGeo, shirtMat);
    leftArm.position.set(-0.46, 1.5, 0);
    leftArm.castShadow = true;
    player.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, shirtMat);
    rightArm.position.set(0.46, 1.5, 0);
    rightArm.castShadow = true;
    player.add(rightArm);

    const legGeo = new THREE.BoxGeometry(0.25, 0.75, 0.25);
    legGeo.translate(0, -0.35, 0);

    const leftLeg = new THREE.Mesh(legGeo, pantsMat);
    leftLeg.position.set(-0.2, 0.75, 0);
    leftLeg.castShadow = true;
    player.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, pantsMat);
    rightLeg.position.set(0.2, 0.75, 0);
    rightLeg.castShadow = true;
    player.add(rightLeg);

    // Leaves and Butterflies
    const numLeaves = 40;
    const leafPositions = new Float32Array(numLeaves * 3);
    for (let i = 0; i < numLeaves; i++) {
      leafPositions[i * 3] = (Math.random() - 0.5) * 80;
      leafPositions[i * 3 + 1] = 2 + Math.random() * 10;
      leafPositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    const leavesGeo = new THREE.BufferGeometry();
    leavesGeo.setAttribute('position', new THREE.BufferAttribute(leafPositions, 3));
    const leafParticles = new THREE.Points(
      leavesGeo,
      new THREE.PointsMaterial({ color: 0x81c784, size: 0.35, transparent: true, opacity: 0.8 })
    );
    scene.add(leafParticles);

    const butterflies: { group: THREE.Group; w1: THREE.Mesh; w2: THREE.Mesh; center: THREE.Vector3; angle: number }[] = [];
    const bfMat = new THREE.MeshBasicMaterial({ color: 0xffd54f, side: THREE.DoubleSide });
    for (let i = 0; i < 4; i++) {
      const bfg = new THREE.Group();
      const w1 = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.2), bfMat);
      w1.position.x = 0.15;
      const w2 = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.2), bfMat);
      w2.position.x = -0.15;
      bfg.add(w1);
      bfg.add(w2);
      const center = new THREE.Vector3((Math.random() - 0.5) * 40, 2.5, (Math.random() - 0.5) * 40);
      butterflies.push({ group: bfg, w1, w2, center, angle: Math.random() * Math.PI * 2 });
      scene.add(bfg);
    }

    // Input state
    const input = {
      forward: 0,
      side: 0,
      run: false
    };

    let cameraAngle = 0;
    let isDragging = false;
    let prevMouseX = 0;

    // Jump Physics State
    let velocityY = 0;
    let isOnGround = true;
    const gravity = -22.0;
    const jumpImpulse = 8.5;
    let lastJumpTrigger = jumpTriggerRef.current;

    const triggerJump = () => {
      if (isOnGround && !isModalOpenRef.current) {
        velocityY = jumpImpulse;
        isOnGround = false;
        soundEngine.init();
        soundEngine.playJump();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isModalOpenRef.current) return;
      soundEngine.init();
      if (e.code === 'KeyW' || e.code === 'ArrowUp') input.forward = 1;
      if (e.code === 'KeyS' || e.code === 'ArrowDown') input.forward = -1;
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') input.side = -1;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') input.side = 1;
      if (e.shiftKey) input.run = true;
      if (e.code === 'Space') {
        e.preventDefault();
        triggerJump();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if ((e.code === 'KeyW' || e.code === 'ArrowUp') && input.forward === 1) input.forward = 0;
      if ((e.code === 'KeyS' || e.code === 'ArrowDown') && input.forward === -1) input.forward = 0;
      if ((e.code === 'KeyA' || e.code === 'ArrowLeft') && input.side === -1) input.side = 0;
      if ((e.code === 'KeyD' || e.code === 'ArrowRight') && input.side === 1) input.side = 0;
      if (!e.shiftKey) input.run = false;
    };

    const onMouseDown = (e: MouseEvent) => {
      if (e.target === renderer.domElement) {
        isDragging = true;
        prevMouseX = e.clientX;
      }
    };
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        cameraAngle -= deltaX * 0.006;
        prevMouseX = e.clientX;
      }
    };
    const onMouseUp = () => { isDragging = false; };

    // Touch controls for camera rotation on mobile/tablets
    const onTouchStart = (e: TouchEvent) => {
      if (e.target === renderer.domElement && e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        cameraAngle -= deltaX * 0.007;
        prevMouseX = e.touches[0].clientX;
      }
    };
    const onTouchEnd = () => { isDragging = false; };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    // Resize
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let frameId = 0;
    const clock = new THREE.Clock();
    let walkCycle = 0;
    let stepTimer = 0;

    const tick = () => {
      const delta = Math.min(clock.getDelta(), 0.05);

      // Check external jump trigger from button/touch
      if (jumpTriggerRef.current !== lastJumpTrigger) {
        lastJumpTrigger = jumpTriggerRef.current;
        triggerJump();
      }

      // Combine keyboard and virtual controls
      const vFwd = virtualControlsRef.current?.forward || 0;
      const vSide = virtualControlsRef.current?.side || 0;
      const vRun = virtualControlsRef.current?.run || false;

      const activeFwd = isModalOpenRef.current ? 0 : (input.forward !== 0 ? input.forward : vFwd);
      const activeSide = isModalOpenRef.current ? 0 : (input.side !== 0 ? input.side : vSide);
      const activeRun = isModalOpenRef.current ? false : (input.run || vRun);

      // Player Movement
      const speed = (activeRun ? 7.5 : 4.0) * delta;
      const mx = activeSide;
      const mz = activeFwd;

      if (Math.abs(mx) > 0.05 || Math.abs(mz) > 0.05) {
        const moveAngle = Math.atan2(mx, mz);
        const targetRot = cameraAngle + moveAngle;
        const rotDiff = Math.atan2(Math.sin(targetRot - player.rotation.y), Math.cos(targetRot - player.rotation.y));
        player.rotation.y += rotDiff * Math.min(1.0, delta * 12);

        const nextX = player.position.x + Math.sin(targetRot) * speed;
        const nextZ = player.position.z + Math.cos(targetRot) * speed;
        const distCenter = Math.sqrt(nextX * nextX + nextZ * nextZ);
        if (distCenter < 47) {
          player.position.x = nextX;
          player.position.z = nextZ;
        }

        if (isOnGround) {
          walkCycle += delta * (activeRun ? 14 : 9);
          const swing = Math.sin(walkCycle) * 0.65;
          leftLeg.rotation.x = swing;
          rightLeg.rotation.x = -swing;
          leftArm.rotation.x = -swing;
          rightArm.rotation.x = swing;

          stepTimer += delta * (activeRun ? 14 : 9);
          if (stepTimer > Math.PI) {
            stepTimer = 0;
            soundEngine.playStep();
          }
        }
      } else {
        if (isOnGround) {
          walkCycle += delta * 2;
          leftLeg.rotation.x = THREE.MathUtils.damp(leftLeg.rotation.x, 0, 10, delta);
          rightLeg.rotation.x = THREE.MathUtils.damp(rightLeg.rotation.x, 0, 10, delta);
          leftArm.rotation.x = THREE.MathUtils.damp(leftArm.rotation.x, 0, 10, delta);
          rightArm.rotation.x = THREE.MathUtils.damp(rightArm.rotation.x, 0, 10, delta);
          torso.position.y = 1.15 + Math.sin(walkCycle) * 0.02;
        }
      }

      // Jump & Terrain Gravity Physics
      const gy = getHillHeight(player.position.x, player.position.z);
      if (!isOnGround) {
        player.position.y += velocityY * delta;
        velocityY += gravity * delta;

        // Dynamic mid-air pose
        leftLeg.rotation.x = THREE.MathUtils.damp(leftLeg.rotation.x, -0.4, 10, delta);
        rightLeg.rotation.x = THREE.MathUtils.damp(rightLeg.rotation.x, 0.35, 10, delta);
        leftArm.rotation.x = THREE.MathUtils.damp(leftArm.rotation.x, -0.7, 10, delta);
        rightArm.rotation.x = THREE.MathUtils.damp(rightArm.rotation.x, -0.7, 10, delta);

        if (player.position.y <= gy) {
          player.position.y = gy;
          velocityY = 0;
          isOnGround = true;
          soundEngine.playLand();
        }
      } else {
        if (player.position.y > gy + 0.65) {
          isOnGround = false;
        } else {
          player.position.y = THREE.MathUtils.damp(player.position.y, gy, 18, delta);
        }
      }

      // Camera Follow
      const camDist = 6.2;
      const camHeight = 3.6;
      const targetCamX = player.position.x - Math.sin(cameraAngle) * camDist;
      const targetCamZ = player.position.z - Math.cos(cameraAngle) * camDist;
      const terrainAtCam = getHillHeight(targetCamX, targetCamZ);
      const targetCamY = Math.max(player.position.y + camHeight, terrainAtCam + 1.2);

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 9, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 9, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 9, delta);
      camera.lookAt(player.position.x, player.position.y + 1.4, player.position.z);

      // Check Proximity
      let closest: PlantData | null = null;
      let minDist = 3.6;
      for (const ph of plantHolders) {
        const dist = Math.sqrt(
          (ph.root.position.x - player.position.x) ** 2 +
          (ph.root.position.z - player.position.z) ** 2
        );
        if (dist < minDist) {
          minDist = dist;
          closest = ph.data;
        }

        // Update markers if collected status changed
        const isCollectedNow = !!collectedMapRef.current[ph.data.id];
        if (isCollectedNow && (ph.ring.material as THREE.MeshBasicMaterial).color.getHex() !== 0x2e7d32) {
          (ph.ring.material as THREE.MeshBasicMaterial).color.setHex(0x2e7d32);
          ph.sprite.material.map = createMarkerSprite(true);
        }
      }

      onProximityChangeRef.current(closest);
      if (onPlayerPosChangeRef.current) {
        onPlayerPosChangeRef.current(player.position.x, player.position.z, player.rotation.y);
      }

      // Marker animation
      const elapsed = clock.getElapsedTime();
      plantHolders.forEach((ph) => {
        ph.sprite.position.y = 1.6 + Math.sin(elapsed * 3 + ph.root.position.x) * 0.15;
        ph.ring.rotation.z += delta * 1.5;
      });

      // Butterflies & Leaves
      butterflies.forEach((bf) => {
        bf.angle += delta * 1.4;
        bf.group.position.x = bf.center.x + Math.cos(bf.angle) * 3;
        bf.group.position.z = bf.center.z + Math.sin(bf.angle) * 3;
        bf.group.position.y = bf.center.y + Math.sin(bf.angle * 2) * 0.6;
        bf.w1.rotation.y = Math.sin(elapsed * 18) * 0.8;
        bf.w2.rotation.y = -Math.sin(elapsed * 18) * 0.8;
        bf.group.rotation.y = -bf.angle;
      });

      const leafArr = leafParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < numLeaves; i++) {
        leafArr[i * 3 + 1] -= delta * 0.8;
        leafArr[i * 3] += Math.sin(elapsed + i) * delta * 0.5;
        if (leafArr[i * 3 + 1] < getHillHeight(leafArr[i * 3], leafArr[i * 3 + 2])) {
          leafArr[i * 3 + 1] = 10 + Math.random() * 4;
        }
      }
      leafParticles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full block z-0"
      style={{ touchAction: 'none' }}
    />
  );
};
