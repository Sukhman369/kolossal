'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  Environment,
  ContactShadows,
  useGLTF,
  MeshDistortMaterial,
} from '@react-three/drei';
import * as THREE from 'three';

// Procedural high-fashion 3D geometry rendered as the Kolossal chrome emblem
function ProceduralEmblemMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.18;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.25;
      ringRef.current.rotation.y = -t * 0.2;
    }
  });

  return (
    <group position={[0, 0.05, 0]}>
      {/* Central Sculpted Chrome Monolith Emblem */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusKnotGeometry args={[0.88, 0.28, 128, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#f4f4f4"
          metalness={0.96}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.06}
          distort={0.16}
          speed={1.5}
        />
      </mesh>

      {/* Outer Floating Titanium Orbital Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.65, 0.032, 16, 100]} />
        <meshStandardMaterial
          color="#8a8a8a"
          metalness={0.98}
          roughness={0.15}
          wireframe={false}
        />
      </mesh>
    </group>
  );
}

// User Model Loader Component if a custom .glb file is present
function ExternalGLBModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1.4} position={[0, -0.3, 0]} />;
}

export default function ComingSoon3DScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [hasCustomModel, setHasCustomModel] = useState(false);

  // Check if custom model file exists
  useEffect(() => {
    fetch('/models/hero-garment.glb', { method: 'HEAD' })
      .then((res) => {
        if (res.ok) setHasCustomModel(true);
      })
      .catch(() => {
        setHasCustomModel(false);
      });
  }, []);

  // Pause render loop when offscreen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={className || "relative w-full h-[360px] sm:h-[440px] md:h-[500px] lg:h-[560px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"}
    >
      {/* Soft ambient maroon halo matching Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(88,13,26,0.08)_0%,rgba(250,249,247,0)_70%)] pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        frameloop={isInView ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[6, 8, 5]} intensity={2.0} castShadow />
        <pointLight position={[-5, -3, -3]} intensity={1.4} color="#781428" />
        <spotLight position={[0, 6, 3]} intensity={1.5} angle={0.6} penumbra={1} />

        <Suspense fallback={null}>
          <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
            {hasCustomModel ? (
              <ExternalGLBModel url="/models/hero-garment.glb" />
            ) : (
              <ProceduralEmblemMesh />
            )}
          </Float>

          <Environment preset="city" />
          <ContactShadows
            position={[0, -1.45, 0]}
            opacity={0.32}
            scale={4.5}
            blur={2.8}
            far={3}
            color="#3A0811"
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.05}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI / 1.65}
        />
      </Canvas>

      {/* Decorative architectural coordinate overlay */}
      <div className="absolute bottom-3 left-4 sm:left-6 flex items-center space-x-2 pointer-events-none opacity-60">
        <span className="w-1.5 h-1.5 rounded-full bg-[#580D1A] animate-ping" />
        <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-600">
          3D SCULPT / CHANDIGARH STUDIO
        </span>
      </div>
      <div className="absolute bottom-3 right-4 sm:right-6 pointer-events-none opacity-60 hidden sm:block">
        <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-500">
          INTERACTIVE DRAG ACTIVE
        </span>
      </div>
    </div>
  );
}
