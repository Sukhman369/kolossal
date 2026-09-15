'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  Environment,
  ContactShadows,
  MeshDistortMaterial,
} from '@react-three/drei';
import * as THREE from 'three';
import { Check, Sparkles, Move3d } from 'lucide-react';

/* ── MODEL 01: The Monolith (Liquid Chrome Torus Knot & Orbital Halo) ── */
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
        <torusKnotGeometry args={[0.75, 0.24, 128, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#f5f5f5"
          metalness={0.96}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.06}
          distort={0.14}
          speed={1.5}
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[1.45, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#888888"
          metalness={0.98}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
}

/* ── MODEL 02: Kinetic Tesseract (Brutalist Nested Frames & Core) ── */
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
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshStandardMaterial
          color="#1a1a1a"
          wireframe={true}
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>
      {/* Inner Solid Beveled Box */}
      <mesh ref={innerRef}>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshPhysicalMaterial
          color="#333333"
          metalness={0.95}
          roughness={0.12}
          clearcoat={1}
        />
      </mesh>
      {/* Core Maroon Refractive Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.36, 32, 32]} />
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

/* ── MODEL 03: Heavyweight Textile Fold (Mobius Garment Drapery) ── */
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
        <torusKnotGeometry args={[0.82, 0.32, 120, 24, 3, 4]} />
        <meshStandardMaterial
          color="#420812"
          roughness={0.65}
          metalness={0.25}
          bumpScale={0.05}
        />
      </mesh>
      {/* Secondary Accent Ribbon */}
      <mesh>
        <torusGeometry args={[1.4, 0.04, 16, 80]} />
        <meshStandardMaterial
          color="#1c1c1c"
          roughness={0.3}
          metalness={0.85}
        />
      </mesh>
    </group>
  );
}

/* ── MODEL 04: Prismatic Cyber Geode (Faceted Icosahedron & Gyro Rings) ── */
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
        <icosahedronGeometry args={[0.78, 0]} />
        <meshStandardMaterial
          color="#e0e0e0"
          metalness={0.98}
          roughness={0.05}
          flatShading={true}
        />
      </mesh>
      {/* Gimbal Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.35, 0.022, 16, 90]} />
        <meshStandardMaterial
          color="#580D1A"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      {/* Gimbal Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.6, 0.022, 16, 90]} />
        <meshStandardMaterial
          color="#777777"
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
}

interface ModelCard {
  id: string;
  name: string;
  category: string;
  spec: string;
  description: string;
  renderComponent: React.ReactNode;
}

const MODELS: ModelCard[] = [
  {
    id: 'monolith',
    name: 'The Monolith Emblem',
    category: 'CYBER ORGANIC // LIQUID CHROME',
    spec: 'Dynamic Torus Knot · Orbital Titanium Halo',
    description: 'Continuous metallic flow with real-time fluid surface distortion, paired with a titanium orbital ring.',
    renderComponent: <ModelMonolith />,
  },
  {
    id: 'tesseract',
    name: 'Brutalist Tesseract',
    category: 'ARCHITECTURAL // KINETIC FRAME',
    spec: 'Multi-Axis Cube Matrix · Maroon Refractive Core',
    description: 'Industrial Area architectural discipline: dual counter-rotating wireframe cubes shielding a pulsating core.',
    renderComponent: <ModelTesseract />,
  },
  {
    id: 'textile',
    name: 'Heavyweight Drapery Fold',
    category: 'TEXTILE // 500 GSM HEAVYWEIGHT',
    spec: 'Sculpted Organic Fold · Deep Crimson Matte',
    description: 'Mimics the architectural fall of double-faced organic French Terry and heavyweight canvas streetwear drape.',
    renderComponent: <ModelTextileDrape />,
  },
  {
    id: 'geode',
    name: 'Prismatic Cyber Geode',
    category: 'HARDWARE // STERLING SILVER & TITANIUM',
    spec: 'Faceted Icosahedron · Dual Gyroscope Gimbals',
    description: 'High-contrast jewelry & hardware inspiration with razor-sharp facet reflections and concentric orbital rings.',
    renderComponent: <ModelCyberGeode />,
  },
];

export default function ModelComparisonLab() {
  const [selectedId, setSelectedId] = useState<string>('monolith');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-neutral-200/80 bg-[#FAF9F7]">
      {/* Lab Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 sm:pb-8 border-b border-neutral-200/80 gap-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#580D1A] animate-ping" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#580D1A] uppercase font-semibold">
              INTERACTIVE 3D DESIGN LAB // HERITAGE SHOWCASE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-neutral-950">
            COMPARE 3D EMBLEMS
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-xl leading-relaxed">
            Drag to orbit and test all 4 interactive geometries in real time. Choose your preferred emblem to finalize the primary hero sculpture.
          </p>
        </div>

        <div className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-white border border-neutral-300 text-neutral-700 text-xs font-mono shadow-xs self-start md:self-auto">
          <Move3d className="w-4 h-4 text-[#580D1A]" />
          <span>Click & Drag to Rotate Any Model</span>
        </div>
      </div>

      {/* Side-by-Side 4-Column / 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {MODELS.map((model, idx) => {
          const isSelected = selectedId === model.id;
          return (
            <div
              key={model.id}
              className={`group flex flex-col justify-between rounded-2xl bg-white border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-xl ${
                isSelected
                  ? 'border-[#580D1A] ring-2 ring-[#580D1A]/20'
                  : 'border-neutral-200/90 hover:border-neutral-400'
              }`}
            >
              {/* Card Top Pill */}
              <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-semibold">
                  OPTION 0{idx + 1}
                </span>
                {isSelected && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#580D1A] text-white text-[9px] font-mono font-bold uppercase tracking-wider flex items-center space-x-1 shadow-xs">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Selected</span>
                  </span>
                )}
              </div>

              {/* 3D Interactive Canvas Canvas Container */}
              <div className="relative w-full h-[280px] sm:h-[320px] bg-neutral-50/50 cursor-grab active:cursor-grabbing select-none">
                <Canvas
                  camera={{ position: [0, 0, 4.4], fov: 42 }}
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
                      position={[0, -1.3, 0]}
                      opacity={0.3}
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

              {/* Model Spec & Description */}
              <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between border-t border-neutral-100">
                <div className="space-y-2">
                  <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#580D1A] font-semibold">
                    {model.category}
                  </div>
                  <h3 className="text-base font-bold uppercase tracking-tight text-neutral-950">
                    {model.name}
                  </h3>
                  <div className="text-[11px] font-mono text-neutral-500 font-medium">
                    {model.spec}
                  </div>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed pt-1">
                    {model.description}
                  </p>
                </div>

                {/* Finalize Selection Action */}
                <div className="pt-4 border-t border-neutral-100">
                  <button
                    onClick={() => handleSelect(model.id)}
                    className={`w-full py-3 px-4 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
                      isSelected
                        ? 'bg-[#580D1A] text-white shadow-md'
                        : 'bg-neutral-100 text-neutral-800 hover:bg-[#580D1A] hover:text-white'
                    }`}
                  >
                    {copiedId === model.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Selected As Favorite</span>
                      </>
                    ) : isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Current Favorite</span>
                      </>
                    ) : (
                      <span>Choose Option 0{idx + 1}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
