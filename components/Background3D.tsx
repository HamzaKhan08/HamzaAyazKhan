import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Starfield = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const particlesCount = 1500;

    const positions = useMemo(() => {
        const pos = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20; // x
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
        }
        return pos;
    }, [particlesCount]);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.05;
            pointsRef.current.rotation.x += delta * 0.02;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#6366f1"
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

const CyberSphere = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1;
            meshRef.current.rotation.x += delta * 0.08;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -5]}>
            <icosahedronGeometry args={[3, 1]} />
            <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.15} />
        </mesh>
    );
};

const Background3D: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <Starfield />
                <CyberSphere />
            </Canvas>
        </div>
    );
};

export default Background3D;