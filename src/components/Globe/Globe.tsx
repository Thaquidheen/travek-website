"use client";

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { Country } from "@/types";
import CountryMarker from "./CountryMarker";

interface GlobeProps {
  countries: Country[];
}

// Convert lat/lng to 3D coordinates on sphere
function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ] as [number, number, number];
}

// Earth globe with texture
function EarthSphere({ radius }: { radius: number }) {
  const globeRef = useRef<THREE.Mesh>(null);

  // Load Earth texture from local file
  const earthTexture = useTexture("/textures/earth.jpg");

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={globeRef} args={[radius, 64, 64]}>
      <meshPhongMaterial
        map={earthTexture}
        specular={new THREE.Color(0x333333)}
        shininess={15}
      />
    </Sphere>
  );
}

// Fallback sphere without texture
function FallbackSphere({ radius }: { radius: number }) {
  const globeRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={globeRef} args={[radius, 64, 64]}>
      <meshPhongMaterial
        color="#0c4a6e"
        emissive="#082f49"
        emissiveIntensity={0.3}
        specular="#ffffff"
        shininess={20}
      />
    </Sphere>
  );
}

export default function Globe({ countries }: GlobeProps) {
  const radius = 2.5;

  return (
    <group>
      {/* Main Earth sphere with texture */}
      <EarthSphere radius={radius} />

      {/* Atmosphere glow - inner */}
      <Sphere args={[radius + 0.05, 64, 64]}>
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Atmosphere glow - outer */}
      <Sphere args={[radius + 0.25, 64, 64]}>
        <meshBasicMaterial
          color="#0ea5e9"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Country markers */}
      {countries.map((country) => {
        const position = latLngToVector3(
          country.coordinates.lat,
          country.coordinates.lng,
          radius + 0.1
        );

        return (
          <CountryMarker
            key={country.id}
            country={country}
            position={position}
          />
        );
      })}

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#3b82f6" />
    </group>
  );
}
