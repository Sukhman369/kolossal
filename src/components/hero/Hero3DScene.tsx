'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  Environment,
  ContactShadows,
  useGLTF,
  MeshDistortMaterial
} from '@react-three/drei';
import * as THREE from 'three';

// Procedural high-fashion 3D geometry rendered while /models/hero-garment.glb is pending
function ProceduralHeroMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.35;
      meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.2;
      ringRef.current.rotation.y = -t * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Sculpted Chrome Monolith Emblem */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusKnotGeometry args={[1.1, 0.35, 128, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#e0e0e0"
          metalness={0.92}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.1}
          distort={0.18}
          speed={1.5}
        />
      </mesh>

      {/* Outer Floating Titanium Orbital Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.0, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#888888"
          metalness={0.98}
          roughness={0.2}
          wireframe={false}
        />
      </mesh>
    </group>
  );
}

// User Model Loader Component for when a .glb file is provided
function ExternalGLBModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1.8} position={[0, -0.5, 0]} />;
}

export default function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [hasCustomModel, setHasCustomModel] = useState(false);

  // Check if user has added a custom model file at /models/hero-garment.glb
  useEffect(() => {
    fetch('/models/hero-garment.glb', { method: 'HEAD' })
      .then((res) => {
        if (res.ok) setHasCustomModel(true);
      })
      .catch(() => {
        setHasCustomModel(false);
      });
  }, []);

  // Performance Guardian: Pause WebGL render loop when hero is scrolled out of viewport
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
      className="relative w-full h-[520px] md:h-[640px] cursor-grab active:cursor-grabbing select-none"
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        frameloop={isInView ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[6, 8, 5]} intensity={1.8} castShadow />
        <pointLight position={[-6, -4, -4]} intensity={1.2} color="#781428" />
        <spotLight position={[0, 5, 2]} intensity={1.5} angle={0.6} penumbra={1} />

        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
            {hasCustomModel ? (
              <ExternalGLBModel url="/models/hero-garment.glb" />
            ) : (
              <ProceduralHeroMesh />
            )}
          </Float>

          <Environment preset="city" />
          <ContactShadows
            position={[0, -1.9, 0]}
            opacity={0.35}
            scale={8}
            blur={2.4}
            far={4}
            color="#3A0811"
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>

      {/* Floating 3D Interaction Badge */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-10 flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#580D1A]/20 shadow-md backdrop-blur-md text-[10px] tracking-[0.2em] uppercase font-mono text-[#580D1A]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#580D1A] animate-ping" />
        <span className="font-semibold">3D Scene Active // Drag to Rotate</span>
      </div>
    </div>
  );
}
