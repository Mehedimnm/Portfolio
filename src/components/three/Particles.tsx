"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Props = { count?: number };

/** Pre-compute a spherical-shell point distribution (outside render = pure). */
function createPositions(count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 4 + Math.random() * 6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
}

// Generated once at module load (default field) — keeps render pure.
const DEFAULT_POSITIONS = createPositions(3500);

/** Amber point-cloud distributed in a spherical shell, slowly rotating. */
export function Particles({ count }: Props) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(
    () => (count ? createPositions(count) : DEFAULT_POSITIONS),
    [count]
  );

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    pts.rotation.y += delta * 0.045 + state.pointer.x * delta * 0.08;
    pts.rotation.x += delta * 0.012 + state.pointer.y * delta * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#d8f3ff"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
