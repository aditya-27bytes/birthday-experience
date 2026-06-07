"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Sparkles, SpotLight } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import confetti from "canvas-confetti";
import { Mic, MicOff } from "lucide-react";

// A procedural 3D Cake made of primitives
const CakeModel = ({ isBlownOut }: { isBlownOut: boolean }) => {
  const flameRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (flameRef.current) {
      if (!isBlownOut) {
        // Flickering animation
        flameRef.current.scale.y = 1 + Math.sin(clock.elapsedTime * 20) * 0.1;
        flameRef.current.scale.x = 1 + Math.sin(clock.elapsedTime * 15) * 0.05;
        flameRef.current.rotation.z = Math.sin(clock.elapsedTime * 5) * 0.05;
        if (glowRef.current) glowRef.current.intensity = 2 + Math.sin(clock.elapsedTime * 10) * 0.5;
      } else {
        // Blow out animation: shrink and bend away
        flameRef.current.scale.lerp(new THREE.Vector3(0, 0, 0), 0.1);
        flameRef.current.position.x += 0.005; // slight drift
        flameRef.current.position.y += 0.005;
        if (glowRef.current) glowRef.current.intensity = THREE.MathUtils.lerp(glowRef.current.intensity, 0, 0.1);
      }
    }
  });

  return (
    <group position={[0, -1.6, 0]}>
      {/* Plate */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[2.8, 3.2, 0.2, 64]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.2} metalness={0.5} />
      </mesh>
      
      {/* Base Tier Frosting Rim */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.15, 16, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>

      {/* Bottom Tier */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[2.2, 2.2, 1, 64]} />
        <meshStandardMaterial color="#ffcfdf" roughness={0.8} />
      </mesh>

      {/* Middle Tier Frosting Rim */}
      <mesh position={[0, 1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.12, 16, 64]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>

      {/* Top Tier */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[1.6, 1.6, 0.8, 64]} />
        <meshStandardMaterial color="#fdfbf7" roughness={0.7} />
      </mesh>

      {/* Sprinkles on Top */}
      <group position={[0, 1.8, 0]}>
        {Array.from({ length: 40 }).map((_, i) => {
          const angle = (i / 40) * Math.PI * 2;
          const radius = 1.3 * Math.random();
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const colors = ["#ff5e62", "#ffb703", "#4facfe", "#43e97b", "#a18cd1"];
          return (
            <mesh key={i} position={[x, 0.01, z]} rotation={[Math.random() * Math.PI, 0, Math.random() * Math.PI]}>
              <cylinderGeometry args={[0.02, 0.02, 0.12, 8]} />
              <meshStandardMaterial color={colors[i % colors.length]} roughness={0.3} />
            </mesh>
          );
        })}
      </group>

      {/* Candle */}
      <group position={[0, 2.2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.06, 0.8, 32]} />
          <meshStandardMaterial color="#ff5e62" roughness={0.3} />
        </mesh>
        {/* Wick */}
        <mesh position={[0, 0.42, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.08, 8]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        
        {/* Flame Group */}
        <group position={[0, 0.5, 0]} ref={flameRef}>
          {/* Outer Flame */}
          <mesh position={[0, 0.1, 0]}>
            <coneGeometry args={[0.08, 0.25, 16]} />
            <meshBasicMaterial color="#ffb703" transparent opacity={0.8} />
          </mesh>
          {/* Inner Flame */}
          <mesh position={[0, 0.05, 0]}>
            <coneGeometry args={[0.04, 0.15, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <pointLight ref={glowRef} color="#ffb703" distance={6} decay={2} intensity={2} />
        </group>
        
        {/* Smoke (when blown out) */}
        {isBlownOut && (
          <Sparkles 
            count={40} 
            scale={1.5} 
            size={6} 
            speed={0.6} 
            opacity={0.4} 
            color="#a8a8a8" 
            position={[0, 0.8, 0]}
          />
        )}
      </group>
    </group>
  );
};

interface InteractiveCakeProps {
  data: any;
}

export function InteractiveCake({ data }: InteractiveCakeProps) {
  const [isBlownOut, setIsBlownOut] = useState(false);

  const handleBlowOut = () => {
    if (isBlownOut) return;
    setIsBlownOut(true);
    
    // Confetti explosion
    const end = Date.now() + 2000;
    const colors = ['#ffcfdf', '#ffb703', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <section className="relative w-full h-screen bg-transparent flex flex-col items-center justify-center overflow-hidden">
      
      <div className="absolute top-10 md:top-16 left-0 right-0 text-center z-20 pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-editorial text-5xl md:text-7xl text-brand-light"
        >
          Make a Wish
        </motion.h2>
        {!isBlownOut && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-brand-light/60 mt-4 tracking-widest text-sm uppercase"
          >
            Click anywhere to blow out the candle
          </motion.p>
        )}
        {isBlownOut && (
          <motion.p 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-brand-primary mt-4 tracking-widest text-lg font-bold uppercase"
          >
            Your wish has been sent to the universe ✨
          </motion.p>
        )}
      </div>

      <div className="absolute inset-0 cursor-pointer" onClick={() => handleBlowOut()}>
        <Canvas camera={{ position: [0, 5, 14], fov: 40 }}>
          <Environment preset="city" />
          <ambientLight intensity={isBlownOut ? 0.2 : 0.5} />
          <SpotLight 
            position={[5, 5, 5]} 
            angle={0.15} 
            penumbra={1} 
            intensity={isBlownOut ? 0.5 : 1} 
            color="#ffffff"
          />
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <CakeModel isBlownOut={isBlownOut} />
          </Float>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={!isBlownOut} autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2 - 0.05} minPolarAngle={Math.PI / 3} />
        </Canvas>
      </div>
    </section>
  );
}
