'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface NavBrand3DIntroProps {
  onComplete: () => void;
}

// Procedurally generate a bold, architectural brutalist 'B' shape
function createBShape(): THREE.Shape {
  const shape = new THREE.Shape();
  // Outer boundary of brutalist 'B'
  shape.moveTo(-0.55, -0.7);
  shape.lineTo(-0.55, 0.7);
  shape.lineTo(0.15, 0.7);
  shape.bezierCurveTo(0.56, 0.7, 0.56, 0.06, 0.12, 0.06);
  shape.lineTo(0.08, 0.06);
  shape.bezierCurveTo(0.58, 0.06, 0.58, -0.7, 0.15, -0.7);
  shape.lineTo(-0.55, -0.7);
  shape.closePath();

  // Top counter (hole)
  const topHole = new THREE.Path();
  topHole.moveTo(-0.22, 0.18);
  topHole.lineTo(-0.22, 0.48);
  topHole.lineTo(0.10, 0.48);
  topHole.quadraticCurveTo(0.28, 0.33, 0.10, 0.18);
  topHole.closePath();
  shape.holes.push(topHole);

  // Bottom counter (hole)
  const bottomHole = new THREE.Path();
  bottomHole.moveTo(-0.22, -0.48);
  bottomHole.lineTo(-0.22, -0.10);
  bottomHole.lineTo(0.12, -0.10);
  bottomHole.quadraticCurveTo(0.32, -0.29, 0.12, -0.48);
  bottomHole.closePath();
  shape.holes.push(bottomHole);

  return shape;
}

// Easing functions for luxury animation curves
const easeOutBack = (x: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

const easeInOutCubic = (x: number): number => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

export default function NavBrand3DIntro({ onComplete }: NavBrand3DIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ambientOpacity, setAmbientOpacity] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animFrameId: number;
    let isDisposed = false;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const fov = 45;
    const cameraDist = 5;
    const camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, cameraDist);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 3. Luxury Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfaf9f7, 1.2);
    scene.add(ambientLight);

    // Main key light (cool bright silver reflection)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    // Rim light (Beyond Humans signature deep burgundy accent)
    const rimLight = new THREE.DirectionalLight(0x851830, 3.5);
    rimLight.position.set(-6, -2, -3);
    scene.add(rimLight);

    // Front soft fill
    const fillLight = new THREE.PointLight(0xffffff, 1.2, 20);
    fillLight.position.set(0, 0, 4);
    scene.add(fillLight);

    // 4. 3D 'B' Geometry & Luxury Titanium Obsidian Material
    const shape = createBShape();
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.28,
      bevelEnabled: true,
      bevelThickness: 0.045,
      bevelSize: 0.028,
      bevelSegments: 4,
    });
    geometry.center();

    const material = new THREE.MeshPhysicalMaterial({
      color: 0x121214,
      metalness: 0.94,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95,
    });

    const bMesh = new THREE.Mesh(geometry, material);
    scene.add(bMesh);

    // 5. Dimension / coordinate helpers
    const getVisibleSizeAtZ0 = () => {
      const vHeight = 2 * Math.tan((fov * Math.PI) / 360) * cameraDist;
      const vWidth = vHeight * (window.innerWidth / window.innerHeight);
      return { vWidth, vHeight };
    };

    const screenToWorld = (screenX: number, screenY: number) => {
      const { vWidth, vHeight } = getVisibleSizeAtZ0();
      const wx = (screenX / window.innerWidth - 0.5) * vWidth;
      const wy = -(screenY / window.innerHeight - 0.5) * vHeight;
      return { wx, wy };
    };

    // Calculate target navbar position
    const getTargetWorldTransform = () => {
      const targetEl = document.getElementById('nav-brand-b');
      const { vHeight } = getVisibleSizeAtZ0();

      if (!targetEl) {
        // Fallback to top center if element not yet queried
        return {
          targetWx: 0,
          targetWy: (vHeight / 2) * 0.85,
          targetScale: 0.042,
        };
      }

      const rect = targetEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const { wx, wy } = screenToWorld(centerX, centerY);

      // Natural height of our geometry is ~1.45
      const targetHeightWorld = (rect.height / window.innerHeight) * vHeight;
      const targetScale = Math.max(targetHeightWorld / 1.45, 0.032);

      return {
        targetWx: wx,
        targetWy: wy,
        targetScale: targetScale,
      };
    };

    // Resize handler
    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation Timeline Orchestration
    // - Phase 0 (0.0s - 0.4s): Pop-in scale in center from 0 to 1.55 with slight rotation
    // - Phase 1 (0.4s - 1.8s): Rotate once (360° / 2*PI) in center with majestic liquid reflections
    // - Phase 2 (1.8s - 2.7s): Smooth glide and scale down to exact navbar 'K' coordinates
    // - Phase 3 (2.7s): Dock hand-off and unmount
    const DURATION_ENTER = 400; // ms
    const DURATION_SPIN = 1400; // ms
    const DURATION_TRAVEL = 900; // ms
    const TOTAL_DURATION = DURATION_ENTER + DURATION_SPIN + DURATION_TRAVEL;

    const startTime = performance.now();
    const BASE_CENTER_SCALE = window.innerWidth < 640 ? 1.35 : 1.75;

    const animate = (currentTime: number) => {
      if (isDisposed) return;

      const elapsed = currentTime - startTime;

      if (elapsed < DURATION_ENTER) {
        // --- PHASE 0: SCALE IN AT CENTER ---
        const progress = elapsed / DURATION_ENTER;
        const easedScale = easeOutBack(progress) * BASE_CENTER_SCALE;
        bMesh.scale.set(easedScale, easedScale, easedScale);
        bMesh.position.set(0, 0, 0);
        // Initial gentle tilt to capture specular reflections
        bMesh.rotation.y = progress * 0.4;
        bMesh.rotation.x = Math.sin(progress * Math.PI) * 0.15;
      } else if (elapsed < DURATION_ENTER + DURATION_SPIN) {
        // --- PHASE 1: FULL 360-DEGREE ROTATION IN CENTER ---
        const spinElapsed = elapsed - DURATION_ENTER;
        const spinProgress = spinElapsed / DURATION_SPIN;
        const easedSpin = easeInOutCubic(spinProgress);

        // One complete 360° rotation (from 0.4 to 0.4 + 2*PI)
        bMesh.rotation.y = 0.4 + easedSpin * (Math.PI * 2);
        // Subtle floating pitch & roll
        bMesh.rotation.x = Math.sin(spinProgress * Math.PI * 2) * 0.12;
        bMesh.rotation.z = Math.sin(spinProgress * Math.PI) * 0.05;

        // Subtle gentle breathing scale
        const breathe = BASE_CENTER_SCALE + Math.sin(spinProgress * Math.PI) * 0.08;
        bMesh.scale.set(breathe, breathe, breathe);
        bMesh.position.set(0, 0, 0);
      } else if (elapsed < TOTAL_DURATION) {
        // --- PHASE 2: TRAVEL DIRECTLY TO NAVBAR ---
        const travelElapsed = elapsed - (DURATION_ENTER + DURATION_SPIN);
        const travelProgress = travelElapsed / DURATION_TRAVEL;
        const easedTravel = easeInOutCubic(travelProgress);

        const { targetWx, targetWy, targetScale } = getTargetWorldTransform();

        // Interpolate position from (0,0) to target
        bMesh.position.x = THREE.MathUtils.lerp(0, targetWx, easedTravel);
        bMesh.position.y = THREE.MathUtils.lerp(0, targetWy, easedTravel);
        bMesh.position.z = THREE.MathUtils.lerp(0, 0, easedTravel);

        // Interpolate scale down to exact navbar text size
        const currentScale = THREE.MathUtils.lerp(BASE_CENTER_SCALE, targetScale, easedTravel);
        bMesh.scale.set(currentScale, currentScale, currentScale);

        // Settle rotation cleanly to 0 (flat forward)
        const remainingY = 0.4 + Math.PI * 2;
        bMesh.rotation.y = THREE.MathUtils.lerp(remainingY, Math.PI * 2, easedTravel);
        bMesh.rotation.x = THREE.MathUtils.lerp(bMesh.rotation.x, 0, easedTravel);
        bMesh.rotation.z = THREE.MathUtils.lerp(bMesh.rotation.z, 0, easedTravel);

        // Fade background ambient glow
        setAmbientOpacity(1 - travelProgress);
      } else {
        // --- PHASE 3: ARRIVAL & DOCK ---
        // Final frame placement
        const { targetWx, targetWy, targetScale } = getTargetWorldTransform();
        bMesh.position.set(targetWx, targetWy, 0);
        bMesh.scale.set(targetScale, targetScale, targetScale);
        bMesh.rotation.set(0, 0, 0);
        renderer.render(scene, camera);

        // Trigger parent state transition & cleanup
        onComplete();
        return;
      }

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Cinematic ambient aura glowing in center while rotating */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 pointer-events-none"
        style={{ opacity: ambientOpacity }}
      >
        <div className="w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full bg-[#580D1A]/10 blur-[100px]" />
        <div className="w-[180px] sm:w-[260px] h-[180px] sm:h-[260px] rounded-full bg-[#FAF9F7]/60 blur-[60px]" />
      </div>
    </div>
  );
}
