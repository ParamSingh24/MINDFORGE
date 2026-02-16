import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Create flexible lines
    float t = iTime * 0.2; // Slower, smoother speed
    vec3 finalColor = vec3(0.0);
    
    // Color Palette matching MindForge (Neon Blue + Green)
    vec3 neonBlue = vec3(0.0, 0.95, 1.0); // Cyan/Neon
    vec3 neonGreen = vec3(0.22, 1.0, 0.08); // Green
    
    // Number of lines
    for(float i = 0.0; i < 5.0; i++) {
        // Complex wave function
        float y = 0.5;
        y += sin(uv.x * 2.0 + t + i * 1.5) * 0.15;
        y += sin(uv.x * 5.0 - t * 0.5 + i) * 0.05;
        
        // Distance field
        float dist = abs(uv.y - y);
        
        // Thickness and Glow
        float thickness = 0.003;
        float glow = 0.008 / dist;
        
        // Combine
        float intensity = smoothstep(thickness, 0.0, dist) + glow * 0.5;
        
        // Mix colors based on position
        vec3 col = mix(neonBlue, neonGreen, sin(t + i) * 0.5 + 0.5);
        finalColor += col * intensity * 0.6; // Scale down intensity a bit
    }
    
    gl_FragColor = vec4(finalColor, 1.0);
    // Use alpha blending logic effectively
    gl_FragColor.a = min(1.0, length(finalColor));
  }
`;

const FloatingLinesShader = () => {
    const mesh = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(
        () => ({
            iTime: { value: 0 },
            iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        }),
        []
    );

    useFrame((state) => {
        if (mesh.current) {
            // @ts-ignore
            mesh.current.material.uniforms.iTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={mesh}>
            <planeGeometry args={[20, 10]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </mesh>
    );
};

const FloatingLines = () => {
    return (
        <div className="w-full h-full absolute inset-0 -z-20 pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <FloatingLinesShader />
            </Canvas>
        </div>
    )
}

export default FloatingLines;
