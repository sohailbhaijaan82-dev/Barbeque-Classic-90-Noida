/**
 * Interactive 3D Barbecue Table Grill & Ember Showcase
 * Built with Three.js r160+ following Three.js guidelines:
 * - Procedural 3D model (Grill basin, charcoal bed, iron grates, skewers, food items)
 * - RoomEnvironment reflections, warm key light, cool hemisphere fill
 * - Dynamic smoke and fiery ember sparks particle physics
 * - Real-time skewer rotation, heat dial, and butter basting
 * - Software-WebGL guard with appropriate frame pacing
 * - Collapsible bottom dock with zero viewport occlusion
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { grillSound } from '../utils/soundEffects';
import { RotateCw, Flame, Sparkles, Volume2, VolumeX, Eye, Maximize2, Minimize2, ChevronDown, ChevronUp } from 'lucide-react';

interface ThreeGrillSceneProps {
  className?: string;
}

export const ThreeGrillScene: React.FC<ThreeGrillSceneProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [heatLevel, setHeatLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [isRotating, setIsRotating] = useState(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activePreset, setActivePreset] = useState<'chef' | 'closeup' | 'top' | 'isometric'>('chef');
  const [basteNotification, setBasteNotification] = useState<string | null>(null);

  // References for animation state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const skewersGroupRef = useRef<THREE.Group[]>([]);
  const emberLightRef = useRef<THREE.PointLight | null>(null);
  const sparksRef = useRef<{ positions: Float32Array; velocities: Float32Array; mesh: THREE.Points } | null>(null);
  const smokeRef = useRef<{ positions: Float32Array; mesh: THREE.Points } | null>(null);
  const basteBoostRef = useRef<number>(0);
  const heatIntensityRef = useRef<number>(0.65);
  const autoRotateSkewersRef = useRef<boolean>(true);

  // Sync state refs
  useEffect(() => {
    autoRotateSkewersRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    let intensity = 0.5;
    if (heatLevel === 'low') intensity = 0.3;
    if (heatLevel === 'medium') intensity = 0.65;
    if (heatLevel === 'high') intensity = 1.0;
    heatIntensityRef.current = intensity;
    grillSound.setHeatIntensity(intensity);
  }, [heatLevel]);

  const handleToggleSound = () => {
    const muted = grillSound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      grillSound.startSizzle();
    }
  };

  const handleBaste = () => {
    basteBoostRef.current = 1.0;
    grillSound.triggerBasteBurst();
    setBasteNotification('✨ Golden Desi Ghee & Spices basted! Sizzle flared.');
    setTimeout(() => setBasteNotification(null), 2500);
  };

  const setCameraView = (view: 'chef' | 'closeup' | 'top' | 'isometric') => {
    setActivePreset(view);
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    if (view === 'chef') {
      camera.position.set(0, 5.2, 7.5);
      controls.target.set(0, 0.4, 0);
    } else if (view === 'closeup') {
      camera.position.set(-1.2, 2.4, 3.8);
      controls.target.set(0, 0.6, 0);
    } else if (view === 'top') {
      camera.position.set(0, 8.5, 0.1);
      controls.target.set(0, 0, 0);
    } else if (view === 'isometric') {
      camera.position.set(6.0, 4.5, 6.0);
      controls.target.set(0, 0.3, 0);
    }
    controls.update();
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software WebGL Guard
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Setup Renderer
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 5.2, 7.5);
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.05; // Don't go below table level
    controls.minDistance = 2.5;
    controls.maxDistance = 14;
    controls.target.set(0, 0.4, 0);
    controlsRef.current = controls;

    // 4. Studio Environment Map
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // Fallback
    }

    // 5. Studio Lighting Rig (3-point warm/cool balance)
    const hemiLight = new THREE.HemisphereLight(0xffeedd, 0x111122, 0.6);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.2);
    keyLight.position.set(4, 7, 5);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 20;
      keyLight.shadow.camera.left = -4;
      keyLight.shadow.camera.right = 4;
      keyLight.shadow.camera.top = 4;
      keyLight.shadow.camera.bottom = -4;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd4e2ff, 0.7);
    fillLight.position.set(-5, 4, -3);
    scene.add(fillLight);

    // Glowing Ember Light in the firebed
    const emberLight = new THREE.PointLight(0xff5500, 3.5, 6, 1.8);
    emberLight.position.set(0, 0.35, 0);
    scene.add(emberLight);
    emberLightRef.current = emberLight;

    // 6. PROCEDURAL 3D MODELS (Grill Basin, Charcoal Bed, Heavy Cast-Iron Grates, Skewers)
    const masterGrill = new THREE.Group();
    scene.add(masterGrill);

    // A. Luxury Table Top (Dark Walnut Teak Wood)
    const tableGeom = new THREE.BoxGeometry(10, 0.3, 7);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x1f1915,
      roughness: 0.75,
      metalness: 0.1,
    });
    const table = new THREE.Mesh(tableGeom, tableMat);
    table.position.y = -0.15;
    table.receiveShadow = true;
    masterGrill.add(table);

    // Contact shadow plane
    const shadowGeo = new THREE.PlaneGeometry(6, 4.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.002;
    masterGrill.add(shadowPlane);

    // B. Cast Iron Firebox Well
    const boxOuterGeo = new THREE.BoxGeometry(4.8, 0.9, 3.2);
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.8,
      metalness: 0.85,
    });
    const outerBox = new THREE.Mesh(boxOuterGeo, boxMat);
    outerBox.position.y = 0.45;
    outerBox.castShadow = true;
    outerBox.receiveShadow = true;
    masterGrill.add(outerBox);

    // Polished Brass / Copper Bezel Ring (like high-end restaurant sunken live grill)
    const rimGeo = new THREE.BoxGeometry(5.0, 0.08, 3.4);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Rich golden brass
      metalness: 0.9,
      roughness: 0.25,
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.position.y = 0.88;
    masterGrill.add(rim);

    // C. Charcoal Bed with Glowing Coals
    const coalGroup = new THREE.Group();
    coalGroup.position.y = 0.45;
    masterGrill.add(coalGroup);

    const coalGeom = new THREE.DodecahedronGeometry(0.24, 1);
    const coalMat = new THREE.MeshStandardMaterial({
      color: 0x1a0f08,
      roughness: 0.95,
      metalness: 0.1,
      emissive: 0xff3b00,
      emissiveIntensity: 0.8,
    });

    const rnd = (seed: number) => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    let seed = 42;
    for (let x = -1.9; x <= 1.9; x += 0.42) {
      for (let z = -1.1; z <= 1.1; z += 0.42) {
        const coal = new THREE.Mesh(coalGeom, coalMat.clone());
        const s = 0.7 + rnd(seed++) * 0.6;
        coal.scale.set(s, s * 0.65, s);
        coal.position.set(x + (rnd(seed++) - 0.5) * 0.2, (rnd(seed++) - 0.5) * 0.08, z + (rnd(seed++) - 0.5) * 0.2);
        coal.rotation.set(rnd(seed++) * Math.PI, rnd(seed++) * Math.PI, rnd(seed++) * Math.PI);
        coalGroup.add(coal);
      }
    }

    // D. Heavy Cast Iron Grill Grates
    const grateGroup = new THREE.Group();
    grateGroup.position.y = 0.92;
    masterGrill.add(grateGroup);

    const grateBarGeo = new THREE.CylinderGeometry(0.032, 0.032, 4.4, 8);
    const grateMat = new THREE.MeshStandardMaterial({
      color: 0x222226,
      metalness: 0.9,
      roughness: 0.4,
    });

    // Cross bars along length
    for (let z = -1.35; z <= 1.35; z += 0.22) {
      const bar = new THREE.Mesh(grateBarGeo, grateMat);
      bar.rotation.z = Math.PI / 2;
      bar.position.set(0, 0, z);
      bar.castShadow = true;
      grateGroup.add(bar);
    }

    // Heavy frame side supports
    const supportGeo = new THREE.CylinderGeometry(0.045, 0.045, 2.9, 8);
    const supportLeft = new THREE.Mesh(supportGeo, grateMat);
    supportLeft.rotation.x = Math.PI / 2;
    supportLeft.position.set(-2.1, 0.02, 0);
    grateGroup.add(supportLeft);

    const supportRight = new THREE.Mesh(supportGeo, grateMat);
    supportRight.rotation.x = Math.PI / 2;
    supportRight.position.set(2.1, 0.02, 0);
    grateGroup.add(supportRight);

    // E. SKEWERS (4 Delicious Signature Items)
    const skewersList: THREE.Group[] = [];

    // Helper to build skewer rod
    const makeSkewer = (zPos: number, title: string) => {
      const skewerGrp = new THREE.Group();
      skewerGrp.position.set(0, 1.14, zPos);
      skewerGrp.userData = { title, baseZ: zPos };

      // Stainless steel rod
      const rodGeo = new THREE.CylinderGeometry(0.02, 0.02, 4.8, 8);
      const rodMat = new THREE.MeshStandardMaterial({
        color: 0xe5e7eb,
        metalness: 0.98,
        roughness: 0.15,
      });
      const rod = new THREE.Mesh(rodGeo, rodMat);
      rod.rotation.z = Math.PI / 2;
      rod.castShadow = true;
      skewerGrp.add(rod);

      // Wooden handle on right end
      const handleGeo = new THREE.CylinderGeometry(0.065, 0.055, 0.7, 12);
      const handleMat = new THREE.MeshStandardMaterial({
        color: 0x854d0e,
        roughness: 0.6,
        metalness: 0.05,
      });
      const handle = new THREE.Mesh(handleGeo, handleMat);
      handle.rotation.z = Math.PI / 2;
      handle.position.x = 2.4;
      skewerGrp.add(handle);

      // Brass ring
      const ringGeo = new THREE.TorusGeometry(0.07, 0.015, 8, 16);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.2 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.y = Math.PI / 2;
      ring.position.x = 2.05;
      skewerGrp.add(ring);

      return skewerGrp;
    };

    // --- Skewer 1: Classic Paneer Tikka (Paneer, Red Bell Pepper, Onion, Green Capsicum) ---
    const skewer1 = makeSkewer(-0.95, 'Tandoori Malai Paneer Tikka');
    const paneerMat = new THREE.MeshStandardMaterial({
      color: 0xf97316, // Rich tandoori spiced orange
      roughness: 0.5,
      metalness: 0.05,
    });
    const capsicumMat = new THREE.MeshStandardMaterial({
      color: 0x15803d, // Crisp green
      roughness: 0.35,
      metalness: 0.05,
    });
    const onionMat = new THREE.MeshStandardMaterial({
      color: 0x9f1239, // Deep purple red onion
      roughness: 0.4,
      metalness: 0.1,
    });
    const yellowPepperMat = new THREE.MeshStandardMaterial({
      color: 0xeab308, // Golden paprika
      roughness: 0.35,
      metalness: 0.05,
    });

    const paneerGeo = new THREE.BoxGeometry(0.36, 0.36, 0.36);
    const pepperGeo = new THREE.BoxGeometry(0.08, 0.38, 0.38);
    const onionGeo = new THREE.BoxGeometry(0.07, 0.35, 0.35);

    // Assemble skewer 1 components
    let posX = -1.4;
    for (let i = 0; i < 4; i++) {
      const p = new THREE.Mesh(paneerGeo, paneerMat);
      p.position.x = posX;
      p.castShadow = true;
      skewer1.add(p);
      posX += 0.26;

      const c = new THREE.Mesh(pepperGeo, i % 2 === 0 ? capsicumMat : yellowPepperMat);
      c.position.x = posX;
      c.castShadow = true;
      skewer1.add(c);
      posX += 0.16;

      const o = new THREE.Mesh(onionGeo, onionMat);
      o.position.x = posX;
      o.castShadow = true;
      skewer1.add(o);
      posX += 0.32;
    }
    masterGrill.add(skewer1);
    skewersList.push(skewer1);

    // --- Skewer 2: Murgh Malai Chicken Kebab Tikka ---
    const skewer2 = makeSkewer(-0.32, 'Peshawari Chicken Malai Tikka');
    const chickenGeo = new THREE.DodecahedronGeometry(0.23, 1);
    const chickenMat = new THREE.MeshStandardMaterial({
      color: 0xfde047, // Golden spiced cream
      roughness: 0.6,
      metalness: 0.1,
    });
    for (let x = -1.4; x <= 1.2; x += 0.38) {
      const piece = new THREE.Mesh(chickenGeo, chickenMat);
      piece.position.set(x, 0, 0);
      piece.scale.set(1.1, 0.9, 0.95);
      piece.rotation.set(Math.random(), Math.random(), Math.random());
      piece.castShadow = true;
      skewer2.add(piece);
    }
    masterGrill.add(skewer2);
    skewersList.push(skewer2);

    // --- Skewer 3: Peri-Peri Corn Cobs & Mushroom ---
    const skewer3 = makeSkewer(0.32, 'Crispy Peri-Peri Corn & Button Mushroom');
    const cornGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.32, 12);
    const cornMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Charred butter golden
      roughness: 0.45,
      metalness: 0.1,
    });
    const mushGeo = new THREE.SphereGeometry(0.22, 10, 8);
    const mushMat = new THREE.MeshStandardMaterial({
      color: 0x78350f, // Charred seasoned brown
      roughness: 0.7,
      metalness: 0.05,
    });
    for (let x = -1.4; x <= 1.2; x += 0.52) {
      const corn = new THREE.Mesh(cornGeo, cornMat);
      corn.rotation.z = Math.PI / 2;
      corn.position.set(x, 0, 0);
      corn.castShadow = true;
      skewer3.add(corn);

      const mush = new THREE.Mesh(mushGeo, mushMat);
      mush.scale.set(1.0, 0.7, 1.0);
      mush.position.set(x + 0.28, 0, 0);
      mush.castShadow = true;
      skewer3.add(mush);
    }
    masterGrill.add(skewer3);
    skewersList.push(skewer3);

    // --- Skewer 4: Awadhi Spiced Seekh Kebab ---
    const skewer4 = makeSkewer(0.95, 'Royal Char-Grilled Seekh Kebab');
    const seekhMat = new THREE.MeshStandardMaterial({
      color: 0x451a03, // Rich dark caramelized spice brown
      roughness: 0.8,
      metalness: 0.1,
    });
    for (let x = -1.3; x <= 1.2; x += 0.58) {
      const seekhPart = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.52, 10), seekhMat);
      seekhPart.rotation.z = Math.PI / 2;
      seekhPart.position.set(x, 0, 0);
      seekhPart.castShadow = true;
      skewer4.add(seekhPart);
    }
    masterGrill.add(skewer4);
    skewersList.push(skewer4);

    skewersGroupRef.current = skewersList;

    // 7. PARTICLES: Sparks & Smoke
    // A. Sparks particle system
    const sparkCount = isSoftwareGl ? 60 : 220;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkVelocities = new Float32Array(sparkCount * 3);

    for (let i = 0; i < sparkCount; i++) {
      sparkPositions[i * 3 + 0] = (Math.random() - 0.5) * 3.4;
      sparkPositions[i * 3 + 1] = 0.8 + Math.random() * 2.5;
      sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 2.2;

      sparkVelocities[i * 3 + 0] = (Math.random() - 0.5) * 0.02;
      sparkVelocities[i * 3 + 1] = 0.03 + Math.random() * 0.05;
      sparkVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));

    const sparkMat = new THREE.PointsMaterial({
      color: 0xffaa33,
      size: isSoftwareGl ? 0.08 : 0.06,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
    scene.add(sparkPoints);
    sparksRef.current = { positions: sparkPositions, velocities: sparkVelocities, mesh: sparkPoints };

    // B. Soft Smoke particle system
    const smokeCount = isSoftwareGl ? 30 : 90;
    const smokeGeo = new THREE.BufferGeometry();
    const smokePositions = new Float32Array(smokeCount * 3);
    for (let i = 0; i < smokeCount; i++) {
      smokePositions[i * 3 + 0] = (Math.random() - 0.5) * 3.2;
      smokePositions[i * 3 + 1] = 1.0 + Math.random() * 3.2;
      smokePositions[i * 3 + 2] = (Math.random() - 0.5) * 2.0;
    }
    smokeGeo.setAttribute('position', new THREE.BufferAttribute(smokePositions, 3));

    const smokeMat = new THREE.PointsMaterial({
      color: 0x9ca3af,
      size: 0.45,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
    const smokePoints = new THREE.Points(smokeGeo, smokeMat);
    scene.add(smokePoints);
    smokeRef.current = { positions: smokePositions, mesh: smokePoints };

    // Pre-warm shaders
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 8. Animation & Render Loop (with ThreeJS Skill Frame Pacing)
    let animationFrameId = 0;
    let clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          animationFrameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          animationFrameId = window.setTimeout(cb, 70);
        }
      };
      animationFrameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Controls update
      controls.update();

      // Ember light pulsation
      const intensity = heatIntensityRef.current;
      const basteBoost = basteBoostRef.current;
      if (basteBoostRef.current > 0) {
        basteBoostRef.current = Math.max(0, basteBoostRef.current - delta * 0.7);
      }

      if (emberLightRef.current) {
        const flicker = Math.sin(time * 8.5) * 0.4 + Math.cos(time * 12.3) * 0.25;
        emberLightRef.current.intensity = (2.5 + intensity * 2.5 + basteBoost * 5.0) + flicker;
      }

      // Skewer rotation
      if (autoRotateSkewersRef.current) {
        skewersList.forEach((sk, idx) => {
          sk.rotation.x += delta * (0.6 + idx * 0.15);
        });
      }

      // Spark particles update
      if (sparksRef.current) {
        const pos = sparksRef.current.positions;
        const vel = sparksRef.current.velocities;
        const count = pos.length / 3;
        const speedMultiplier = 1.0 + intensity * 0.8 + basteBoost * 2.5;

        for (let i = 0; i < count; i++) {
          pos[i * 3 + 1] += vel[i * 3 + 1] * speedMultiplier;
          pos[i * 3 + 0] += Math.sin(time * 3 + i) * 0.005;

          // Reset spark if out of bounds
          if (pos[i * 3 + 1] > 3.8) {
            pos[i * 3 + 1] = 0.85;
            pos[i * 3 + 0] = (Math.random() - 0.5) * 3.4;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 2.2;
          }
        }
        sparksRef.current.mesh.geometry.attributes.position.needsUpdate = true;
      }

      // Smoke particles update
      if (smokeRef.current) {
        const pos = smokeRef.current.positions;
        const count = pos.length / 3;
        for (let i = 0; i < count; i++) {
          pos[i * 3 + 1] += delta * (0.45 + (i % 3) * 0.15);
          pos[i * 3 + 0] += Math.sin(time * 0.8 + i) * 0.004;

          if (pos[i * 3 + 1] > 4.2) {
            pos[i * 3 + 1] = 1.1;
            pos[i * 3 + 0] = (Math.random() - 0.5) * 3.2;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 2.0;
          }
        }
        smokeRef.current.mesh.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        animationFrameId = requestAnimationFrame(tick);
      }
    }

    tick();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(animationFrameId);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-[520px] md:h-[620px] rounded-2xl overflow-hidden bg-radial from-[#181922] via-[#0d0e14] to-[#08090d] border border-amber-900/30 shadow-2xl ${className}`}>
      {/* Canvas container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Spec Badges & Viewport Info (Zero pill slop, clean typography) */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 pointer-events-none">
        <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-amber-400 font-semibold">
          <span>The Barbeque Classic 90</span>
          <span aria-hidden="true">·</span>
          <span>Live Grill Table</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-400">Interactive 3D</span>
        </div>
        <p className="text-xs text-gray-400 max-w-sm">
          Click & drag to orbit the table. Season, flip, and grill fresh skewers live before your eyes.
        </p>
      </div>

      {/* Notification Toast for Basting */}
      {basteNotification && (
        <div className="absolute top-4 right-4 z-20 px-4 py-2 bg-amber-950/90 border border-amber-500/50 rounded-lg text-xs font-medium text-amber-200 shadow-xl transition-all">
          {basteNotification}
        </div>
      )}

      {/* Top-Right Quick Actions */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={handleToggleSound}
          title={isMuted ? 'Turn Sizzle Audio ON' : 'Mute Sizzle'}
          className="p-2.5 rounded-lg bg-[#14161f]/80 hover:bg-[#202331] border border-gray-700/50 text-gray-200 hover:text-amber-400 transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
        </button>
      </div>

      {/* THREE.JS DISCIPLINE: Collapsible Bottom Control Dock (Zero Viewport Occlusion) */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-3xl transition-transform duration-300 ${
          isDockCollapsed ? 'translate-y-[calc(100%-2.25rem)]' : 'translate-y-0'
        }`}
      >
        {/* Collapse / Expand Tab */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="flex items-center gap-1.5 px-4 py-1 rounded-t-lg bg-[#12141c]/95 border-t border-x border-gray-700/60 text-[11px] font-medium text-gray-300 hover:text-amber-400 transition-colors shadow-md"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Show Grill Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Hide Controls (Cinema View)</span>
              </>
            )}
          </button>
        </div>

        {/* Unified Bottom Dock */}
        <div className="p-3 sm:p-4 rounded-xl bg-[#12141c]/95 border border-gray-700/60 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {/* Heat Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-gray-400 font-medium text-[11px] uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Charcoal Heat:
            </span>
            <div className="flex items-center gap-1 p-0.5 bg-black/50 rounded-lg border border-gray-800">
              <button
                onClick={() => setHeatLevel('low')}
                className={`px-2.5 py-1 rounded text-xs transition-colors font-medium ${
                  heatLevel === 'low' ? 'bg-amber-600/40 text-amber-200 border border-amber-500/40' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Glow
              </button>
              <button
                onClick={() => setHeatLevel('medium')}
                className={`px-2.5 py-1 rounded text-xs transition-colors font-medium ${
                  heatLevel === 'medium' ? 'bg-amber-600/40 text-amber-200 border border-amber-500/40' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Classic Sizzle
              </button>
              <button
                onClick={() => setHeatLevel('high')}
                className={`px-2.5 py-1 rounded text-xs transition-colors font-medium ${
                  heatLevel === 'high' ? 'bg-red-600/50 text-red-200 border border-red-500/40' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Fiery Char
              </button>
            </div>
          </div>

          {/* Interactive Baste & Rotate buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                isRotating
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : 'bg-gray-800/60 border-gray-700 text-gray-300 hover:text-white'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
              <span>{isRotating ? 'Auto-Rotate ON' : 'Rotate Skewers'}</span>
            </button>

            <button
              onClick={handleBaste}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-medium shadow-md transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Baste Desi Ghee & Spices</span>
            </button>
          </div>

          {/* Camera View Switcher */}
          <div className="flex items-center gap-1 border-t sm:border-t-0 sm:border-l border-gray-800 pt-2 sm:pt-0 sm:pl-3 w-full sm:w-auto justify-center">
            <span className="text-gray-400 text-[11px] mr-1 hidden sm:inline">Camera:</span>
            <button
              onClick={() => setCameraView('chef')}
              className={`px-2 py-1 rounded text-[11px] ${
                activePreset === 'chef' ? 'bg-white/10 text-amber-300' : 'text-gray-400 hover:text-white'
              }`}
            >
              Master
            </button>
            <button
              onClick={() => setCameraView('closeup')}
              className={`px-2 py-1 rounded text-[11px] ${
                activePreset === 'closeup' ? 'bg-white/10 text-amber-300' : 'text-gray-400 hover:text-white'
              }`}
            >
              Close-Up
            </button>
            <button
              onClick={() => setCameraView('top')}
              className={`px-2 py-1 rounded text-[11px] ${
                activePreset === 'top' ? 'bg-white/10 text-amber-300' : 'text-gray-400 hover:text-white'
              }`}
            >
              Top-Down
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
