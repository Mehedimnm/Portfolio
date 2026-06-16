"use client";

import { Canvas } from "@react-three/fiber";
import { AuroraShader } from "./AuroraShader";
import { Particles } from "./Particles";

/** Site-wide WebGL backdrop: flowing aurora + subtle starfield. Imported dynamically (ssr:false). */
export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 8], fov: 60 }}
      className="!absolute inset-0"
    >
      <AuroraShader />
      <Particles count={1100} />
    </Canvas>
  );
}
