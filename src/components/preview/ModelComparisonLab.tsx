'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  Environment,
  ContactShadows,
  MeshDistortMaterial,
} from '@react-three/drei';
import * as THREE from 'three';

/* ── MODEL 01: The Monolith ── */
function ModelMonolith() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.25;
      ringRef.current.rotation.y = -t * 0.2;
    }
  });

  return (
    <group position={[0, 0.05, 0]}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusKnotGeometry args={[0.62, 0.2, 128, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#f5f5f5"
          metalness={0.96}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.06}
          distort={0.12}
          speed={1.5}
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.18, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#888888"
          metalness={0.98}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
}

/* ── MODEL 02: Brutalist Tesseract ── */
function ModelTesseract() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.35;
      outerRef.current.rotation.y = t * 0.25;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.45;
      innerRef.current.rotation.z = t * 0.3;
    }
    if (coreRef.current) {
      const scale = 1 + Math.sin(t * 2) * 0.08;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[0, 0.05, 0]}>
      {/* Outer Wireframe Box */}
      <mesh ref={outerRef}>
        <boxGeometry args={[1.05, 1.05, 1.05]} />
        <meshStandardMaterial
          color="#1a1a1a"
          wireframe={true}
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>
      {/* Inner Solid Beveled Box */}
      <mesh ref={innerRef}>
        <boxGeometry args={[0.68, 0.68, 0.68]} />
        <meshPhysicalMaterial
          color="#333333"
          metalness={0.95}
          roughness={0.12}
          clearcoat={1}
        />
      </mesh>
      {/* Core Maroon Refractive Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshPhysicalMaterial
          color="#580D1A"
          emissive="#30050d"
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
        />
      </mesh>
    </group>
  );
}

/* ── MODEL 03: Drapery Fold ── */
function ModelTextileDrape() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.3;
      groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Heavyweight Fabric Twist */}
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[0.58, 0.22, 128, 32, 2, 3]} />
        <meshStandardMaterial
          color="#420812"
          roughness={0.65}
          metalness={0.25}
          bumpScale={0.05}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[1.15, 0.025, 16, 80]} />
        <meshStandardMaterial
          color="#1c1c1c"
          roughness={0.3}
          metalness={0.85}
        />
      </mesh>
    </group>
  );
}

/* ── MODEL 04: Cyber Geode ── */
function ModelCyberGeode() {
  const icosaRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (icosaRef.current) {
      icosaRef.current.rotation.x = t * 0.3;
      icosaRef.current.rotation.y = t * 0.45;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.4;
      ring1Ref.current.rotation.z = t * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.35;
      ring2Ref.current.rotation.x = t * 0.25;
    }
  });

  return (
    <group position={[0, 0.05, 0]}>
      {/* Central Faceted Geode */}
      <mesh ref={icosaRef} castShadow receiveShadow>
        <icosahedronGeometry args={[0.62, 0]} />
        <meshStandardMaterial
          color="#e0e0e0"
          metalness={0.98}
          roughness={0.05}
          flatShading={true}
        />
      </mesh>
      {/* Gimbal Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.08, 0.018, 16, 90]} />
        <meshStandardMaterial
          color="#580D1A"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      {/* Gimbal Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.24, 0.018, 16, 90]} />
        <meshStandardMaterial
          color="#777777"
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
}

interface ModelItem {
  id: string;
  name: string;
  renderComponent: React.ReactNode;
}

const MODELS: ModelItem[] = [
  {
    id: 'monolith',
    name: 'The Monolith',
    renderComponent: <ModelMonolith />,
  },
  {
    id: 'tesseract',
    name: 'Brutalist Tesseract',
    renderComponent: <ModelTesseract />,
  },
  {
    id: 'textile',
    name: 'Drapery Fold',
    renderComponent: <ModelTextileDrape />,
  },
  {
    id: 'geode',
    name: 'Cyber Geode',
    renderComponent: <ModelCyberGeode />,
  },
];

export default function ModelComparisonLab() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-neutral-200/80">
      {/* Pure Minimalist Grid with ample breathing room and zero cropping */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
        {MODELS.map((model) => (
          <div key={model.id} className="flex flex-col items-center group">
            {/* 3D Canvas with safe frustum clearance */}
            <div className="relative w-full h-[320px] sm:h-[360px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
              <Canvas
                camera={{ position: [0, 0, 4.6], fov: 42 }}
                gl={{ antialias: true, alpha: true }}
                className="w-full h-full"
              >
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 8, 4]} intensity={1.8} />
                <pointLight position={[-4, -3, -2]} intensity={1.2} color="#851830" />
                <spotLight position={[0, 5, 3]} intensity={1.2} angle={0.6} penumbra={1} />

                <Suspense fallback={null}>
                  <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
                    {model.renderComponent}
                  </Float>
                  <Environment preset="city" />
                  <ContactShadows
                    position={[0, -1.35, 0]}
                    opacity={0.25}
                    scale={3.6}
                    blur={2.4}
                    far={2.5}
                    color="#3A0811"
                  />
                </Suspense>

                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate={false}
                  dampingFactor={0.06}
                />
              </Canvas>
            </div>

            {/* Clean Element Name */}
            <div className="pt-2 text-center">
              <h3 className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-neutral-800 font-semibold transition-colors duration-300 group-hover:text-[#580D1A]">
                {model.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
