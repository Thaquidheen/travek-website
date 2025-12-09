"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Globe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const gridRef = useRef<THREE.LineSegments>(null);

  // Auto-rotate the globe
  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.15;
    }
    if (gridRef.current) {
      gridRef.current.rotation.y += delta * 0.15;
    }
  });

  // Create grid geometry for latitude/longitude lines
  const createGridGeometry = () => {
    const points: THREE.Vector3[] = [];
    const radius = 2.52;

    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
      const phi = (90 - lat) * (Math.PI / 180);
      const r = radius * Math.sin(phi);
      const y = radius * Math.cos(phi);

      for (let lon = 0; lon <= 360; lon += 5) {
        const theta = lon * (Math.PI / 180);
        const x = r * Math.cos(theta);
        const z = r * Math.sin(theta);
        points.push(new THREE.Vector3(x, y, z));

        if (lon < 360) {
          const nextTheta = (lon + 5) * (Math.PI / 180);
          const nextX = r * Math.cos(nextTheta);
          const nextZ = r * Math.sin(nextTheta);
          points.push(new THREE.Vector3(nextX, y, nextZ));
        }
      }
    }

    // Longitude lines
    for (let lon = 0; lon < 360; lon += 30) {
      const theta = lon * (Math.PI / 180);

      for (let lat = -90; lat <= 90; lat += 5) {
        const phi = (90 - lat) * (Math.PI / 180);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        points.push(new THREE.Vector3(x, y, z));

        if (lat < 90) {
          const nextPhi = (90 - (lat + 5)) * (Math.PI / 180);
          const nextX = radius * Math.sin(nextPhi) * Math.cos(theta);
          const nextY = radius * Math.cos(nextPhi);
          const nextZ = radius * Math.sin(nextPhi) * Math.sin(theta);
          points.push(new THREE.Vector3(nextX, nextY, nextZ));
        }
      }
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  };

  return (
    <group>
      {/* Main Globe - Ocean */}
      <Sphere ref={globeRef} args={[2.5, 64, 64]} position={[0, 0, 0]}>
        <meshPhongMaterial
          color="#0a4d8c"
          emissive="#051d3a"
          emissiveIntensity={0.3}
          specular="#ffffff"
          shininess={30}
        />
      </Sphere>

      {/* Grid Lines */}
      <lineSegments ref={gridRef} geometry={createGridGeometry()}>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </lineSegments>

      {/* Inner Atmosphere Glow */}
      <Sphere args={[2.55, 64, 64]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Outer Atmosphere Glow */}
      <Sphere ref={atmosphereRef} args={[2.8, 64, 64]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

export default function Interactive3DGlobe() {
  return (
    <group>
      <Globe />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="#3b82f6" />

      {/* Controls for user interaction */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={4}
        maxDistance={10}
        autoRotate={false}
        rotateSpeed={0.5}
        zoomSpeed={0.5}
      />
    </group>
  );
}
