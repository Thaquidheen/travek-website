"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Interactive3DGlobe from "./Interactive3DGlobe";

export default function GlobeCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <Interactive3DGlobe />
        </Suspense>
      </Canvas>
    </div>
  );
}
