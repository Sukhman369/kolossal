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
    <group position={[0, 0.05, 0]}>
      {/* Central Sculpted Chrome Monolith Emblem */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusKnotGeometry args={[0.88, 0.28, 128, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#f0f0f0"
          metalness={0.94}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.08}
          distort={0.14}
          speed={1.4}
        />
      </mesh>

      {/* Outer Floating Titanium Orbital Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.65, 0.032, 16, 100]} />
        <meshStandardMaterial
          color="#999999"
          metalness={0.98}
          roughness={0.18}
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

  return <primitive ref={modelRef} object={scene} scale={1.4} position={[0, -0.3, 0]} />;
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
      className="relative w-full h-[560px] md:h-[660px] lg:h-[700px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    >
      {/* Soft ambient aura blending 3D seamlessly into open space */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(88,13,26,0.06)_0%,rgba(250,249,247,0)_68%)] pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 42 }}
        frameloop={isInView ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 8, 5]} intensity={1.8} castShadow />
        <pointLight position={[-5, -3, -3]} intensity={1.2} color="#781428" />
        <spotLight position={[0, 6, 3]} intensity={1.4} angle={0.6} penumbra={1} />

        <Suspense fallback={null}>
          <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.5}>
            {hasCustomModel ? (
              <ExternalGLBModel url="/models/hero-garment.glb" />
            ) : (
              <ProceduralHeroMesh />
            )}
          </Float>

          <Environment preset="city" />
          {/* Feathered contact shadow with compact scale to prevent any edge clipping */}
          <ContactShadows
            position={[0, -1.45, 0]}
            opacity={0.28}
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

    </div>
  );
}
