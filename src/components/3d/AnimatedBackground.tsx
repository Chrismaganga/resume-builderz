import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, MeshDistortMaterial, Environment, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const FloatingShape = ({ position, color, shape = 'sphere' }: { position: [number, number, number], color: string, shape?: 'sphere' | 'box' | 'torus' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  const ShapeComponent = shape === 'sphere' ? Sphere : shape === 'box' ? Box : Torus;

  return (
    <ShapeComponent ref={meshRef} position={position} args={shape === 'torus' ? [1, 0.4, 16, 32] : undefined}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.1}
        metalness={0.8}
      />
    </ShapeComponent>
  );
};

const AnimatedBackground: React.FC = () => {
  const shapes = useMemo(() => [
    { position: [-4, 2, -2] as [number, number, number], color: '#3b82f6', shape: 'sphere' as const },
    { position: [4, -1, -3] as [number, number, number], color: '#8b5cf6', shape: 'box' as const },
    { position: [0, 3, -4] as [number, number, number], color: '#06b6d4', shape: 'torus' as const },
    { position: [-2, -2, -1] as [number, number, number], color: '#10b981', shape: 'sphere' as const },
    { position: [3, 1, -5] as [number, number, number], color: '#f59e0b', shape: 'box' as const },
  ], []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 -z-10"
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        
        {shapes.map((shape, index) => (
          <FloatingShape
            key={index}
            position={shape.position}
            color={shape.color}
            shape={shape.shape}
          />
        ))}
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20" />
    </motion.div>
  );
};

export default AnimatedBackground;
