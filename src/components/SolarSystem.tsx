import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Sun = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <MeshDistortMaterial
        color="#ffcc00"
        emissive="#ff9900"
        emissiveIntensity={2}
        distort={0.2}
        speed={2}
      />
      <pointLight color="#ffcc00" intensity={2} distance={100} />
    </mesh>
  );
};

const Planet = ({ position, color, size, speed, name }: { position: [number, number, number], color: string, size: number, speed: number, name: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += speed; // orbit speed
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01; // self rotation
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Orbit path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[position[0] - 0.02, position[0] + 0.02, 64]} />
        <meshBasicMaterial color="#ffffff" opacity={0.1} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const SolarSystem = () => {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 20, 30], fov: 45 }}>
        <ambientLight intensity={0.1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} autoRotate autoRotateSpeed={0.5} />
        
        <Sun />
        {/* Mercury */}
        <Planet position={[4, 0, 0]} color="#a8a8a8" size={0.3} speed={0.015} name="Mercury" />
        {/* Venus */}
        <Planet position={[6, 0, 0]} color="#e3bb76" size={0.5} speed={0.012} name="Venus" />
        {/* Earth */}
        <Planet position={[8.5, 0, 0]} color="#3b82f6" size={0.6} speed={0.01} name="Earth" />
        {/* Mars */}
        <Planet position={[11, 0, 0]} color="#c1440e" size={0.4} speed={0.008} name="Mars" />
        {/* Jupiter */}
        <Planet position={[16, 0, 0]} color="#d39c7e" size={1.2} speed={0.005} name="Jupiter" />
        {/* Saturn */}
        <Planet position={[21, 0, 0]} color="#ead6b8" size={1.0} speed={0.003} name="Saturn" />
        
        <fog attach="fog" args={['#050508', 30, 100]} />
      </Canvas>
    </div>
  );
};

export default SolarSystem;
