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
      meshRef.current.rotation.y = t * 0.32;
      meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.14;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.22;
      ringRef.current.rotation.y = -t * 0.18;
    }
  });

  return (
    <group position={[0, 0.05, 0]}>
      {/* Central Sculpted Chrome Monolith Emblem */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusKnotGeometry args={[0.9, 0.28, 128, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#f5f5f5"
          metalness={0.98}
          roughness={0.06}
          clearcoat={1}
          clearcoatRoughness={0.04}
          distort={0.14}
          speed={1.4}
        />
      </mesh>

      {/* Outer Floating Titanium Orbital Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.72, 0.028, 16, 100]} />
        <meshStandardMaterial
          color="#a3a3a3"
          metalness={0.99}
          roughness={0.12}
          wireframe={false}
        />
      </mesh>
    </group>
  );
}

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

export default function ComingSoon3DScene({
  className,
  isDark = true,
}: {
  className?: string;
  isDark?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [hasCustomModel, setHasCustomModel] = useState(false);

  useEffect(() => {
    fetch('/models/hero-garment.glb', { method: 'HEAD' })
      .then((res) => {
        if (res.ok) setHasCustomModel(true);
      })
      .catch(() => {
        setHasCustomModel(false);
      });
  }, []);

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
      className={className || "relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"}
    >
      {/* Deep atmospheric maroon radial halo */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isDark
            ? 'bg-[radial-gradient(circle_at_center,rgba(88,13,26,0.18)_0%,rgba(10,10,10,0)_68%)] opacity-100'
            : 'bg-[radial-gradient(circle_at_center,rgba(88,13,26,0.07)_0%,rgba(250,249,247,0)_68%)] opacity-80'
        }`}
      />

      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 40 }}
        frameloop={isInView ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <ambientLight intensity={isDark ? 0.8 : 0.9} />
        <directionalLight position={[6, 8, 5]} intensity={isDark ? 2.2 : 2.0} castShadow />
        <pointLight position={[-5, -3, -3]} intensity={1.8} color="#851830" />
        <spotLight position={[0, 6, 3]} intensity={1.6} angle={0.6} penumbra={1} />

        <Suspense fallback={null}>
          <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
            {hasCustomModel ? (
              <ExternalGLBModel url="/models/hero-garment.glb" />
            ) : (
              <ProceduralEmblemMesh />
            )}
          </Float>

          <Environment preset="city" />
          <ContactShadows
            position={[0, -1.45, 0]}
            opacity={isDark ? 0.35 : 0.28}
            scale={4.8}
            blur={2.5}
            far={3}
            color={isDark ? "#2a050c" : "#3A0811"}
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
