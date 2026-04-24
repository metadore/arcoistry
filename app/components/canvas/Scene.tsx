"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Points, PointMaterial } from '@react-three/drei';
import { useAppStore } from '@/store/useAppStore';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function ArcoistryVisualizer() {
  const ref = useRef<THREE.Points>(null);
  const particleCount = 1000;

  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00AEEF" size={0.05} sizeAttenuation={true} depthWrite={false} />
    </Points>
  );
}

function FutureQuantumModel() {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={ref}>
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <mesh>
          <torusKnotGeometry args={[2, 0.5, 128, 32]} />
          <meshPhysicalMaterial 
            color="#E60012" 
            emissive="#E60012"
            emissiveIntensity={0.5}
            wireframe 
            transparent 
            opacity={0.3} 
          />
        </mesh>
      </Float>
    </group>
  );
}

function PastRetroLab() {
  return (
    <Float>
      <mesh>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#FFD700" wireframe />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  const timelineState = useAppStore(state => state.timelineState);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {timelineState === 'PRESENT' && <ArcoistryVisualizer />}
        {timelineState === 'FUTURE' && <FutureQuantumModel />}
        {timelineState === 'PAST' && <PastRetroLab />}

        <OrbitControls enableZoom={false} enablePan={false} autoRotate={timelineState === 'PAST'} autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}
