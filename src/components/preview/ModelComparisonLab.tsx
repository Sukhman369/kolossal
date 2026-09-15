'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  Environment,
  ContactShadows,
} from '@react-three/drei';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════════════════
   1. MAMMOTH — Colossal Prehistoric Beast (Sculpted Silhouette & Sweeping Tusks)
   ═══════════════════════════════════════════════════════════════════════════ */
function ModelMammoth() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.35;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.04;
    }
  });

  // Curved majestic tusks using 3D Catmull-Rom splines
  const { leftTuskGeo, rightTuskGeo } = useMemo(() => {
    const leftPoints = [
      new THREE.Vector3(-0.25, 0.08, 0.42),
      new THREE.Vector3(-0.45, -0.05, 0.72),
      new THREE.Vector3(-0.55, 0.18, 0.95),
      new THREE.Vector3(-0.35, 0.52, 0.88),
    ];
    const rightPoints = [
      new THREE.Vector3(0.25, 0.08, 0.42),
      new THREE.Vector3(0.45, -0.05, 0.72),
      new THREE.Vector3(0.55, 0.18, 0.95),
      new THREE.Vector3(0.35, 0.52, 0.88),
    ];

    const leftCurve = new THREE.CatmullRomCurve3(leftPoints);
    const rightCurve = new THREE.CatmullRomCurve3(rightPoints);

    return {
      leftTuskGeo: new THREE.TubeGeometry(leftCurve, 32, 0.048, 12, false),
      rightTuskGeo: new THREE.TubeGeometry(rightCurve, 32, 0.048, 12, false),
    };
  }, []);

  // Trunk spline curving down and forward
  const trunkGeo = useMemo(() => {
    const trunkPoints = [
      new THREE.Vector3(0, 0.22, 0.48),
      new THREE.Vector3(0, -0.15, 0.62),
      new THREE.Vector3(0, -0.48, 0.58),
      new THREE.Vector3(0, -0.68, 0.72),
      new THREE.Vector3(0, -0.62, 0.85),
    ];
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(trunkPoints), 28, 0.075, 12, false);
  }, []);

  return (
    <group ref={groupRef} position={[0, 0.05, 0]} scale={1.15}>
      {/* High Massive Muscular Shoulder Hump */}
      <mesh position={[0, 0.38, -0.15]} castShadow receiveShadow>
        <sphereGeometry args={[0.52, 32, 24]} />
        <meshStandardMaterial color="#1a1818" roughness={0.7} metalness={0.25} />
      </mesh>

      {/* Rear Flank */}
      <mesh position={[0, 0.2, -0.62]} castShadow receiveShadow>
        <sphereGeometry args={[0.44, 28, 20]} />
        <meshStandardMaterial color="#181616" roughness={0.75} metalness={0.2} />
      </mesh>

      {/* Broad Cranial Head & Brow */}
      <mesh position={[0, 0.42, 0.32]} castShadow receiveShadow>
        <sphereGeometry args={[0.38, 28, 24]} />
        <meshStandardMaterial color="#201c1c" roughness={0.65} metalness={0.3} />
      </mesh>

      {/* Massive Sweeping Mammoth Tusks (Polished Antique Ivory & Pale Gold) */}
      <mesh geometry={leftTuskGeo} castShadow>
        <meshPhysicalMaterial
          color="#f4eee2"
          roughness={0.18}
          metalness={0.15}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
        />
      </mesh>
      <mesh geometry={rightTuskGeo} castShadow>
        <meshPhysicalMaterial
          color="#f4eee2"
          roughness={0.18}
          metalness={0.15}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Curled Trunk */}
      <mesh geometry={trunkGeo} castShadow receiveShadow>
        <meshStandardMaterial color="#1a1818" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Stylized Mammoth Ears */}
      <mesh position={[-0.38, 0.36, 0.12]} rotation={[0, -0.4, 0.2]}>
        <cylinderGeometry args={[0.18, 0.12, 0.03, 16]} />
        <meshStandardMaterial color="#1c1919" roughness={0.8} />
      </mesh>
      <mesh position={[0.38, 0.36, 0.12]} rotation={[0, 0.4, -0.2]}>
        <cylinderGeometry args={[0.18, 0.12, 0.03, 16]} />
        <meshStandardMaterial color="#1c1919" roughness={0.8} />
      </mesh>

      {/* 4 Sturdy Pillar Legs */}
      <mesh position={[-0.26, -0.32, 0.18]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 0.72, 16]} />
        <meshStandardMaterial color="#171515" roughness={0.8} />
      </mesh>
      <mesh position={[0.26, -0.32, 0.18]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 0.72, 16]} />
        <meshStandardMaterial color="#171515" roughness={0.8} />
      </mesh>
      <mesh position={[-0.24, -0.36, -0.58]} castShadow>
        <cylinderGeometry args={[0.11, 0.14, 0.65, 16]} />
        <meshStandardMaterial color="#171515" roughness={0.8} />
      </mesh>
      <mesh position={[0.24, -0.36, -0.58]} castShadow>
        <cylinderGeometry args={[0.11, 0.14, 0.65, 16]} />
        <meshStandardMaterial color="#171515" roughness={0.8} />
      </mesh>

      {/* Heavyweight Crimson Saddle Accent Ring */}
      <mesh position={[0, 0.36, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.56, 0.024, 16, 64]} />
        <meshStandardMaterial color="#580D1A" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. FASHION HUMAN MODEL — Runway Mannequin in Fancy Draped Streetwear
   ═══════════════════════════════════════════════════════════════════════════ */
function ModelHumanFashion() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.35;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.05, 0]} scale={1.05}>
      {/* Sleek Faceless High-Fashion Mannequin Head (Alabaster Chrome) */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <sphereGeometry args={[0.17, 32, 32]} />
        <meshPhysicalMaterial
          color="#f0f0f0"
          roughness={0.1}
          metalness={0.92}
          clearcoat={1}
        />
      </mesh>

      {/* Architectural High Neck / Cowl Collar */}
      <mesh position={[0, 0.76, 0]}>
        <cylinderGeometry args={[0.13, 0.15, 0.14, 24]} />
        <meshStandardMaterial color="#141414" roughness={0.5} />
      </mesh>

      {/* Dramatic Wide-Shoulder Trench Coat / Kimono Tailoring */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.34, 0.58, 24]} />
        <meshPhysicalMaterial
          color="#580D1A"
          roughness={0.45}
          metalness={0.25}
          clearcoat={0.6}
        />
      </mesh>

      {/* Drop Shoulder Epaulettes (Extreme Streetwear Width) */}
      <mesh position={[-0.42, 0.62, 0]} rotation={[0, 0, 0.25]}>
        <boxGeometry args={[0.22, 0.08, 0.26]} />
        <meshStandardMaterial color="#380710" roughness={0.5} />
      </mesh>
      <mesh position={[0.42, 0.62, 0]} rotation={[0, 0, -0.25]}>
        <boxGeometry args={[0.22, 0.08, 0.26]} />
        <meshStandardMaterial color="#380710" roughness={0.5} />
      </mesh>

      {/* Fashionable Oversized Coat Sleeves */}
      <mesh position={[-0.44, 0.28, 0.06]} rotation={[0.2, 0, 0.15]} castShadow>
        <cylinderGeometry args={[0.11, 0.14, 0.58, 20]} />
        <meshStandardMaterial color="#4a0a16" roughness={0.5} />
      </mesh>
      <mesh position={[0.44, 0.28, 0.06]} rotation={[0.2, 0, -0.15]} castShadow>
        <cylinderGeometry args={[0.11, 0.14, 0.58, 20]} />
        <meshStandardMaterial color="#4a0a16" roughness={0.5} />
      </mesh>

      {/* Curbed Hardware Waist Buckle / Belt */}
      <mesh position={[0, 0.14, 0.19]}>
        <boxGeometry args={[0.16, 0.08, 0.05]} />
        <meshStandardMaterial color="#ffffff" metalness={0.98} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.31, 0.31, 0.06, 24]} />
        <meshStandardMaterial color="#111111" roughness={0.6} />
      </mesh>

      {/* Flowing Asymmetrical Coat Skirt Hem */}
      <mesh position={[0, -0.24, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.33, 0.48, 0.72, 24]} />
        <meshStandardMaterial color="#3a0710" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Pleated Wide-Leg Trousers Peeking Beneath */}
      <mesh position={[-0.15, -0.68, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.18, 0.42, 20]} />
        <meshStandardMaterial color="#181818" roughness={0.7} />
      </mesh>
      <mesh position={[0.15, -0.68, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.18, 0.42, 20]} />
        <meshStandardMaterial color="#181818" roughness={0.7} />
      </mesh>

      {/* Sculpted Chunky Architecture Soles */}
      <mesh position={[-0.15, -0.92, 0.05]}>
        <boxGeometry args={[0.16, 0.08, 0.32]} />
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0.15, -0.92, 0.05]}>
        <boxGeometry args={[0.16, 0.08, 0.32]} />
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.7} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. STREETWEAR APPAREL — 3D Floating Heavyweight Architectural Hoodie
   ═══════════════════════════════════════════════════════════════════════════ */
function ModelStreetwearApparel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.35;
      groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.05, 0]} scale={1.1}>
      {/* Cavernous Architectural Hood (Stands Upright with Streetwear Drape) */}
      <mesh position={[0, 0.52, -0.06]} rotation={[0.2, 0, 0]} castShadow>
        <torusGeometry args={[0.3, 0.13, 20, 36, Math.PI * 1.35]} />
        <meshStandardMaterial color="#222020" roughness={0.75} metalness={0.15} />
      </mesh>
      {/* Hood Interior Depth Void */}
      <mesh position={[0, 0.48, -0.05]}>
        <sphereGeometry args={[0.24, 24, 24]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>

      {/* Extreme Boxy Drop-Shoulder Torso (500 GSM Heavy French Terry) */}
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.78, 0.64, 0.42]} />
        <meshStandardMaterial color="#2a2626" roughness={0.7} metalness={0.18} />
      </mesh>

      {/* Frontal Architectural Kangaroo Pocket */}
      <mesh position={[0, -0.08, 0.22]} castShadow>
        <boxGeometry args={[0.48, 0.24, 0.08]} />
        <meshStandardMaterial color="#221e1e" roughness={0.75} />
      </mesh>

      {/* Drop Shoulders Extending Wide */}
      <mesh position={[-0.44, 0.24, 0]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[0.22, 0.18, 0.38]} />
        <meshStandardMaterial color="#282424" roughness={0.7} />
      </mesh>
      <mesh position={[0.44, 0.24, 0]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.22, 0.18, 0.38]} />
        <meshStandardMaterial color="#282424" roughness={0.7} />
      </mesh>

      {/* Extended Baggy Arms with Heavy Streetwear Gather */}
      <mesh position={[-0.52, -0.04, 0.05]} rotation={[0.2, 0, 0.35]} castShadow>
        <cylinderGeometry args={[0.13, 0.11, 0.58, 20]} />
        <meshStandardMaterial color="#262222" roughness={0.7} />
      </mesh>
      <mesh position={[0.52, -0.04, 0.05]} rotation={[0.2, 0, -0.35]} castShadow>
        <cylinderGeometry args={[0.13, 0.11, 0.58, 20]} />
        <meshStandardMaterial color="#262222" roughness={0.7} />
      </mesh>

      {/* Heavy Gathered Wrist Cuffs */}
      <mesh position={[-0.62, -0.34, 0.11]}>
        <cylinderGeometry args={[0.09, 0.09, 0.12, 16]} />
        <meshStandardMaterial color="#1a1818" roughness={0.8} />
      </mesh>
      <mesh position={[0.62, -0.34, 0.11]}>
        <cylinderGeometry args={[0.09, 0.09, 0.12, 16]} />
        <meshStandardMaterial color="#1a1818" roughness={0.8} />
      </mesh>

      {/* Thick Ribbed Bottom Hem */}
      <mesh position={[0, -0.34, 0]}>
        <boxGeometry args={[0.74, 0.12, 0.38]} />
        <meshStandardMaterial color="#1e1a1a" roughness={0.8} />
      </mesh>

      {/* Hanging Thick Woven Drawstrings with Silver Metal Aglets */}
      <mesh position={[-0.1, 0.14, 0.24]}>
        <cylinderGeometry args={[0.012, 0.012, 0.44, 12]} />
        <meshStandardMaterial color="#FAF9F7" roughness={0.4} />
      </mesh>
      <mesh position={[-0.1, -0.1, 0.24]}>
        <cylinderGeometry args={[0.018, 0.018, 0.06, 12]} />
        <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.1} />
      </mesh>

      <mesh position={[0.1, 0.18, 0.24]}>
        <cylinderGeometry args={[0.012, 0.012, 0.36, 12]} />
        <meshStandardMaterial color="#FAF9F7" roughness={0.4} />
      </mesh>
      <mesh position={[0.1, -0.02, 0.24]}>
        <cylinderGeometry args={[0.018, 0.018, 0.06, 12]} />
        <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Signature Kolossal Maroon Hem Bar Tag */}
      <mesh position={[0.26, -0.33, 0.2]}>
        <boxGeometry args={[0.09, 0.04, 0.015]} />
        <meshStandardMaterial color="#580D1A" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. KOLOSSAL MONOLITH — Brutalist 'K' Monolith & Amphitheater Halo
   ═══════════════════════════════════════════════════════════════════════════ */
function ModelKolossalEmblem() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.35;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.3;
      ringRef.current.rotation.y = -t * 0.2;
    }
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 3) * 0.1;
      coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.05, 0]} scale={1.12}>
      {/* ── The Architectural 'K' Monolith ── */}

      {/* 1. Main Towering Vertical Pillar */}
      <mesh position={[-0.32, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.22, 1.45, 0.26]} />
        <meshPhysicalMaterial
          color="#222222"
          metalness={0.96}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* 2. Upper Cantilever Diagonal Arm */}
      <mesh position={[0.12, 0.36, 0]} rotation={[0, 0, -Math.PI / 4.2]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.88, 0.24]} />
        <meshPhysicalMaterial
          color="#333333"
          metalness={0.96}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* 3. Lower Cantilever Diagonal Arm */}
      <mesh position={[0.16, -0.36, 0]} rotation={[0, 0, Math.PI / 4.2]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.94, 0.24]} />
        <meshPhysicalMaterial
          color="#333333"
          metalness={0.96}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* Central Heartbeat Core (Deep Kolossal Crimson Crystal) */}
      <mesh ref={coreRef} position={[-0.08, 0, 0]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshPhysicalMaterial
          color="#580D1A"
          emissive="#3a060f"
          metalness={0.6}
          roughness={0.15}
          clearcoat={1}
        />
      </mesh>

      {/* Colossal Orbiting Titanium Halo Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.18, 0.024, 16, 100]} />
        <meshStandardMaterial
          color="#999999"
          metalness={0.98}
          roughness={0.12}
        />
      </mesh>

      {/* Stepped Brutalist Foundation Pedestal */}
      <mesh position={[0, -0.74, 0]}>
        <boxGeometry args={[1.0, 0.05, 0.44]} />
        <meshStandardMaterial color="#181818" metalness={0.8} roughness={0.3} />
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
    id: 'mammoth',
    name: 'MAMMOTH',
    renderComponent: <ModelMammoth />,
  },
  {
    id: 'human-fashion',
    name: 'FASHION MODEL',
    renderComponent: <ModelHumanFashion />,
  },
  {
    id: 'streetwear',
    name: 'STREETWEAR APPAREL',
    renderComponent: <ModelStreetwearApparel />,
  },
  {
    id: 'kolossal-monolith',
    name: 'KOLOSSAL MONOLITH',
    renderComponent: <ModelKolossalEmblem />,
  },
];

export default function ModelComparisonLab() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-b border-neutral-200/80">
      {/* Pure Minimalist 4-Column Grid: Just the 3D element and its clean name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
        {MODELS.map((model) => (
          <div key={model.id} className="flex flex-col items-center group">
            {/* Open-space 3D Canvas */}
            <div className="relative w-full h-[320px] sm:h-[360px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
              <Canvas
                camera={{ position: [0, 0, 4.6], fov: 42 }}
                gl={{ antialias: true, alpha: true }}
                className="w-full h-full"
              >
                <ambientLight intensity={0.85} />
                <directionalLight position={[5, 8, 4]} intensity={1.9} />
                <pointLight position={[-4, -3, -2]} intensity={1.2} color="#851830" />
                <spotLight position={[0, 5, 3]} intensity={1.3} angle={0.6} penumbra={1} />

                <Suspense fallback={null}>
                  <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.35}>
                    {model.renderComponent}
                  </Float>
                  <Environment preset="city" />
                  <ContactShadows
                    position={[0, -1.35, 0]}
                    opacity={0.28}
                    scale={3.8}
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

            {/* Clean Element Name Only */}
            <div className="pt-3 text-center">
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
