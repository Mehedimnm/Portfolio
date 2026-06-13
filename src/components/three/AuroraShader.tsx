"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uRes;

  // --- Simplex noise (Ashima) ---
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main(){
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 p = vec2((vUv.x - 0.5) * aspect, vUv.y - 0.5) * 2.4;

    float t = uTime * 0.05;

    // domain warp for organic flow
    vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t)));
    vec2 r = vec2(fbm(p + 1.7 * q + vec2(1.7 + t * 0.3, 9.2)),
                  fbm(p + 1.7 * q + vec2(8.3, 2.8 - t * 0.4)));

    float n = fbm(p + 2.2 * r + uMouse * 0.4);
    n = n * 0.5 + 0.5;

    // palette: deep base -> dark red -> amber highlight
    vec3 deep  = vec3(0.035, 0.035, 0.045);
    vec3 red   = vec3(0.62, 0.10, 0.10);
    vec3 amber = vec3(0.98, 0.64, 0.09);

    vec3 col = mix(deep, red, smoothstep(0.25, 0.6, n));
    col = mix(col, amber, smoothstep(0.62, 0.96, n));

    // glow concentration
    float glow = pow(smoothstep(0.45, 1.0, n), 1.6);
    float alpha = clamp(glow * 0.95, 0.0, 1.0);

    gl_FragColor = vec4(col, alpha);
  }
`;

/** Fullscreen flowing aurora/nebula shader (amber → dark red), mouse-reactive. */
export function AuroraShader() {
  const mat = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uRes: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame((state, delta) => {
    const m = mat.current;
    if (!m) return;
    m.uniforms.uTime.value += delta;
    m.uniforms.uRes.value.set(state.size.width, state.size.height);
    const mouse = m.uniforms.uMouse.value as THREE.Vector2;
    mouse.x += (state.pointer.x - mouse.x) * 0.04;
    mouse.y += (state.pointer.y - mouse.y) * 0.04;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
