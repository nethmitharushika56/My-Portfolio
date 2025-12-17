import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { SECTION_CONFIG } from '../constants';
import { SectionType } from '../types';
import { useSpring, animated } from '@react-spring/three';

// Fix for missing R3F types in JSX
// We use declare global to augment the JSX namespace safely without overwriting React's core definitions.
// This allows standard HTML tags (div, span, etc.) to coexist with Three.js elements.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Three.js elements
      group: any;
      mesh: any;
      capsuleGeometry: any;
      meshStandardMaterial: any;
      boxGeometry: any;
      cylinderGeometry: any;
      sphereGeometry: any;
      torusGeometry: any;
      torusKnotGeometry: any;
      octahedronGeometry: any;
      dodecahedronGeometry: any;
      icosahedronGeometry: any;
      coneGeometry: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      color: any;

      // HTML elements
      div: any;
      span: any;
      p: any;
      a: any;
      img: any;
      button: any;
      input: any;
      textarea: any;
      h1: any;
      h2: any;
      h3: any;
      h4: any;
      h5: any;
      h6: any;
      ul: any;
      li: any;
      form: any;
      label: any;
      section: any;
      header: any;
      footer: any;
      nav: any;
    }
  }
}

interface SceneProps {
  activeSection: SectionType;
  onSectionChange: (section: SectionType) => void;
}

// Create an animated version of the material to support spring animations on props
const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial);

// --- Office Casual Girl Avatar Component ---
const CuteGirlAvatar = () => {
  const group = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const hairRef = useRef<THREE.Group>(null);
  
  // Face Refs
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftEyebrowRef = useRef<THREE.Mesh>(null);
  const rightEyebrowRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  
  const { mouse } = useThree();

  // Animation state refs (to avoid re-renders)
  const blinkState = useRef({ isBlinking: false, nextBlink: 2 });
  
  const colors = {
    skin: "#FFE0BD",
    hair: "#4A3728", // Dark Brown
    shirt: "#A7C7E7", // Light Blue
    pants: "#D2B48C", // Beige/Tan
    shoes: "#2A2A2A",
    lips: "#EE9999"
  };

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const { x, y } = mouse;

    // --- 1. Head Tracking & Dynamics ---
    if (headRef.current) {
      // Target rotations based on mouse
      // Up/Down (inverted Y), Left/Right
      const targetHeadX = -y * 0.5; 
      const targetHeadY = x * 0.7;
      // Tilt head towards the mouse (cute effect)
      const targetHeadZ = -x * 0.15; 
      
      // Add subtle idle head bob/weave noise
      const idleX = Math.sin(t * 1.5) * 0.05;
      const idleY = Math.cos(t * 1.1) * 0.05;

      // Smoothly interpolate current rotation to target
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetHeadX + idleX, delta * 6);
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetHeadY + idleY, delta * 6);
      headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, targetHeadZ, delta * 6);
    }

    // --- 2. Hair Physics (Secondary Motion) ---
    if (hairRef.current && headRef.current) {
       // Hair lags slightly behind head movement and sways in "wind"
       const hairLag = headRef.current.rotation.y * -0.15;
       const windSway = Math.sin(t * 2.5) * 0.03;
       
       hairRef.current.rotation.y = THREE.MathUtils.lerp(hairRef.current.rotation.y, hairLag + windSway, delta * 4);
       hairRef.current.rotation.z = Math.sin(t * 3) * 0.01; // subtle vertical bounce
    }

    // --- 3. Body Movement & Breathing ---
    if (group.current) {
      // Breathing: Heaving motion (Y axis) and subtle scale
      const breath = Math.sin(t * 2.2);
      group.current.position.y = -2.6 + breath * 0.04;
      
      // Dynamic Leaning: Lean body towards mouse
      const leanZ = x * 0.08;
      const leanX = -y * 0.05;
      
      // Idle Sway: Shifting weight
      const idleSway = Math.sin(t * 0.8) * 0.04;

      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, leanZ + idleSway, delta * 3);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, leanX, delta * 3);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.2, delta * 3); // Turn body slightly
    }

    // --- 4. Eye Mechanics (Blinking & Tracking) ---
    // Blink Logic
    if (t > blinkState.current.nextBlink) {
        if (!blinkState.current.isBlinking) {
            blinkState.current.isBlinking = true;
        } else {
            // End blink (blink lasts ~0.15s)
            if (t > blinkState.current.nextBlink + 0.15) {
                blinkState.current.isBlinking = false;
                // Schedule next blink (random 2-6s)
                blinkState.current.nextBlink = t + 2 + Math.random() * 4;
            }
        }
    }
    const targetScaleY = blinkState.current.isBlinking ? 0.1 : 1;

    // Eye Tracking: Eyes move inside sockets towards interest point
    // We offset the eye mesh position locally
    const eyeTrackX = x * 0.08;
    const eyeTrackY = y * 0.08;

    if (leftEyeRef.current) {
        leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, targetScaleY, delta * 30);
        leftEyeRef.current.position.x = THREE.MathUtils.lerp(leftEyeRef.current.position.x, -0.12 + eyeTrackX, delta * 15);
        leftEyeRef.current.position.y = THREE.MathUtils.lerp(leftEyeRef.current.position.y, eyeTrackY, delta * 15);
    }
    if (rightEyeRef.current) {
        rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, targetScaleY, delta * 30);
        rightEyeRef.current.position.x = THREE.MathUtils.lerp(rightEyeRef.current.position.x, 0.12 + eyeTrackX, delta * 15);
        rightEyeRef.current.position.y = THREE.MathUtils.lerp(rightEyeRef.current.position.y, eyeTrackY, delta * 15);
    }

    // --- 5. Facial Expressions ---
    // Eyebrows: React to vertical mouse position (Up=Surprise, Down=Focus)
    if (leftEyebrowRef.current && rightEyebrowRef.current) {
        const surpriseFactor = Math.max(0, y);
        const focusFactor = Math.min(0, y);

        const browY = 0.14 + (surpriseFactor * 0.08) + (focusFactor * 0.02);
        // Rotate brows: Inner up for surprise, inner down for focus
        const browRot = (surpriseFactor * 0.3) + (focusFactor * 0.2); 

        leftEyebrowRef.current.position.y = THREE.MathUtils.lerp(leftEyebrowRef.current.position.y, browY, delta * 8);
        leftEyebrowRef.current.rotation.z = THREE.MathUtils.lerp(leftEyebrowRef.current.rotation.z, 0.1 - browRot, delta * 8);

        rightEyebrowRef.current.position.y = THREE.MathUtils.lerp(rightEyebrowRef.current.position.y, browY, delta * 8);
        rightEyebrowRef.current.rotation.z = THREE.MathUtils.lerp(rightEyebrowRef.current.rotation.z, -0.1 + browRot, delta * 8);
    }

    // Mouth: Smile widens when looking at center or up, tightens when looking down
    if (mouthRef.current) {
        // Base smile + mouse interaction
        const excitement = Math.max(0, y) * 0.3; // Looking up = happy/excited
        const width = Math.abs(x) * 0.2; // Widen when looking sideways
        
        const targetSmileX = 1 + width + excitement;
        const targetSmileY = 1 + excitement * 1.5; // Open mouth slightly if excited

        mouthRef.current.scale.x = THREE.MathUtils.lerp(mouthRef.current.scale.x, targetSmileX, delta * 5);
        mouthRef.current.scale.y = THREE.MathUtils.lerp(mouthRef.current.scale.y, targetSmileY, delta * 5);
    }
  });

  return (
    <group ref={group} position={[0, -2.6, 0]} scale={1.3}>
      
      {/* --- LEGS (Pants) --- */}
      <group position={[0, 0, 0]}>
        {/* Left Leg */}
        <mesh position={[-0.18, 0.7, 0]}>
          <capsuleGeometry args={[0.14, 1.4, 4, 16]} />
          <meshStandardMaterial color={colors.pants} />
        </mesh>
        {/* Right Leg */}
        <mesh position={[0.18, 0.7, 0]}>
          <capsuleGeometry args={[0.14, 1.4, 4, 16]} />
          <meshStandardMaterial color={colors.pants} />
        </mesh>
        {/* Hips/Belt area */}
        <mesh position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.26, 0.28, 0.3, 16]} />
          <meshStandardMaterial color={colors.pants} />
        </mesh>
      </group>

      {/* --- SHOES --- */}
      <mesh position={[-0.18, 0.05, 0.05]}>
         <boxGeometry args={[0.16, 0.1, 0.35]} />
         <meshStandardMaterial color={colors.shoes} />
      </mesh>
      <mesh position={[0.18, 0.05, 0.05]}>
         <boxGeometry args={[0.16, 0.1, 0.35]} />
         <meshStandardMaterial color={colors.shoes} />
      </mesh>

      {/* --- TORSO (Shirt) --- */}
      <group position={[0, 1.85, 0]}>
        {/* Main Body */}
        <mesh position={[0, 0, 0]}>
           <cylinderGeometry args={[0.25, 0.28, 0.8, 16]} />
           <meshStandardMaterial color={colors.shirt} />
        </mesh>
        {/* Chest area */}
        <mesh position={[0, 0.15, 0.05]} rotation={[0.1, 0, 0]}>
           <capsuleGeometry args={[0.24, 0.35, 4, 16]} />
           <meshStandardMaterial color={colors.shirt} />
        </mesh>
        
        {/* Collar */}
        <group position={[0, 0.42, 0]}>
           <mesh position={[0.12, 0, 0]} rotation={[0, 0, -0.5]}>
              <boxGeometry args={[0.15, 0.05, 0.15]} />
              <meshStandardMaterial color={colors.shirt} />
           </mesh>
           <mesh position={[-0.12, 0, 0]} rotation={[0, 0, 0.5]}>
              <boxGeometry args={[0.15, 0.05, 0.15]} />
              <meshStandardMaterial color={colors.shirt} />
           </mesh>
        </group>

        {/* Buttons */}
        <mesh position={[0, 0, 0.26]}>
           <sphereGeometry args={[0.015, 8, 8]} />
           <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0, 0.15, 0.26]}>
           <sphereGeometry args={[0.015, 8, 8]} />
           <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0, -0.15, 0.26]}>
           <sphereGeometry args={[0.015, 8, 8]} />
           <meshStandardMaterial color="white" />
        </mesh>
      </group>

      {/* --- ARMS (Crossed Pose) --- */}
      <group position={[0, 2.1, 0]}>
        {/* Shoulders */}
        <mesh position={[-0.32, 0, 0]}>
           <sphereGeometry args={[0.14, 16, 16]} />
           <meshStandardMaterial color={colors.shirt} />
        </mesh>
         <mesh position={[0.32, 0, 0]}>
           <sphereGeometry args={[0.14, 16, 16]} />
           <meshStandardMaterial color={colors.shirt} />
        </mesh>

        {/* Left Arm (Outer) */}
        <group position={[-0.32, 0, 0]} rotation={[0.4, 0.5, -0.2]}>
             {/* Upper Arm */}
             <mesh position={[0, -0.25, 0]}>
                <capsuleGeometry args={[0.11, 0.5, 4, 16]} />
                <meshStandardMaterial color={colors.shirt} />
             </mesh>
             {/* Forearm (Crossed) */}
             <mesh position={[0.25, -0.5, 0.1]} rotation={[0, 0, -1.8]}>
                <capsuleGeometry args={[0.1, 0.5, 4, 16]} />
                <meshStandardMaterial color={colors.shirt} />
                {/* Hand */}
                <mesh position={[0, 0.3, 0]}>
                   <sphereGeometry args={[0.1, 16, 16]} />
                   <meshStandardMaterial color={colors.skin} />
                </mesh>
             </mesh>
        </group>

        {/* Right Arm (Inner/Tucked) */}
        <group position={[0.32, 0, 0]} rotation={[0.4, -0.5, 0.2]}>
             {/* Upper Arm */}
             <mesh position={[0, -0.25, 0]}>
                <capsuleGeometry args={[0.11, 0.5, 4, 16]} />
                <meshStandardMaterial color={colors.shirt} />
             </mesh>
             {/* Forearm (Crossed) */}
             <mesh position={[-0.25, -0.5, 0.1]} rotation={[0, 0, 1.8]}>
                <capsuleGeometry args={[0.1, 0.5, 4, 16]} />
                <meshStandardMaterial color={colors.shirt} />
                {/* Hand */}
                <mesh position={[0, 0.3, 0]}>
                   <sphereGeometry args={[0.1, 16, 16]} />
                   <meshStandardMaterial color={colors.skin} />
                </mesh>
             </mesh>
        </group>
      </group>

      {/* --- NECK --- */}
      <mesh position={[0, 2.3, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
        <meshStandardMaterial color={colors.skin} />
      </mesh>

      {/* --- HEAD --- */}
      <group ref={headRef} position={[0, 2.55, 0]}>
        {/* Face Shape */}
        <mesh>
          <sphereGeometry args={[0.38, 32, 32]} />
          <meshStandardMaterial color={colors.skin} />
        </mesh>

        {/* --- HAIR (Brown Wavy) --- */}
        <group ref={hairRef}>
            {/* Main scalp hair */}
            <mesh position={[0, 0.05, -0.05]}>
               <sphereGeometry args={[0.4, 32, 32]} />
               <meshStandardMaterial color={colors.hair} />
            </mesh>
            {/* Top volume */}
            <mesh position={[0, 0.2, 0.05]} rotation={[0.1, 0, 0]}>
               <sphereGeometry args={[0.35, 32, 32]} />
               <meshStandardMaterial color={colors.hair} />
            </mesh>
            
            {/* Left Side Waves */}
            <mesh position={[-0.35, -0.1, 0.1]} rotation={[0, 0, 0.2]}>
               <capsuleGeometry args={[0.12, 0.6, 4, 16]} />
               <meshStandardMaterial color={colors.hair} />
            </mesh>
            <mesh position={[-0.25, 0.2, 0.25]} rotation={[0.2, 0.2, 0.4]}>
               <capsuleGeometry args={[0.08, 0.5, 4, 16]} />
               <meshStandardMaterial color={colors.hair} />
            </mesh>
             {/* Left Back/Shoulder */}
            <mesh position={[-0.3, -0.3, -0.1]} rotation={[0, 0, 0.1]}>
               <capsuleGeometry args={[0.15, 0.7, 4, 16]} />
               <meshStandardMaterial color={colors.hair} />
            </mesh>

            {/* Right Side Waves */}
            <mesh position={[0.35, -0.1, 0.1]} rotation={[0, 0, -0.2]}>
               <capsuleGeometry args={[0.12, 0.6, 4, 16]} />
               <meshStandardMaterial color={colors.hair} />
            </mesh>
             <mesh position={[0.25, 0.2, 0.25]} rotation={[0.2, -0.2, -0.4]}>
               <capsuleGeometry args={[0.08, 0.5, 4, 16]} />
               <meshStandardMaterial color={colors.hair} />
            </mesh>
             {/* Right Back/Shoulder */}
            <mesh position={[0.3, -0.3, -0.1]} rotation={[0, 0, -0.1]}>
               <capsuleGeometry args={[0.15, 0.7, 4, 16]} />
               <meshStandardMaterial color={colors.hair} />
            </mesh>
        </group>

        {/* --- FACE FEATURES --- */}
        <group position={[0, -0.05, 0.32]}>
           {/* Eyes */}
           <group position={[0, 0.05, 0]}>
             {/* Left Eye */}
             <mesh ref={leftEyeRef} position={[-0.12, 0, 0]} rotation={[0, 0, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color="#222" />
                <mesh position={[0.02, 0.02, 0.04]}>
                    <sphereGeometry args={[0.02, 8, 8]} />
                    <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.8} />
                </mesh>
             </mesh>
             {/* Right Eye */}
             <mesh ref={rightEyeRef} position={[0.12, 0, 0]} rotation={[0, 0, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color="#222" />
                 <mesh position={[0.02, 0.02, 0.04]}>
                    <sphereGeometry args={[0.02, 8, 8]} />
                    <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.8} />
                </mesh>
             </mesh>
           </group>

           {/* Eyebrows */}
           <mesh ref={leftEyebrowRef} position={[-0.12, 0.14, 0.02]} rotation={[0, 0, 0.1]}>
              <capsuleGeometry args={[0.015, 0.12, 4, 8]} rotation={[0, 0, Math.PI / 2]} />
              <meshStandardMaterial color={colors.hair} />
           </mesh>
           <mesh ref={rightEyebrowRef} position={[0.12, 0.14, 0.02]} rotation={[0, 0, -0.1]}>
              <capsuleGeometry args={[0.015, 0.12, 4, 8]} rotation={[0, 0, Math.PI / 2]} />
              <meshStandardMaterial color={colors.hair} />
           </mesh>

           {/* Blush */}
           <mesh position={[-0.18, -0.08, 0.02]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial color="#FFB7B2" transparent opacity={0.4} />
           </mesh>
           <mesh position={[0.18, -0.08, 0.02]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial color="#FFB7B2" transparent opacity={0.4} />
           </mesh>

           {/* Smile */}
           <mesh ref={mouthRef} position={[0, -0.12, 0.02]} rotation={[0, 0, 0]}>
              <torusGeometry args={[0.06, 0.015, 8, 16, Math.PI]} rotation={[0, 0, Math.PI]} />
              <meshStandardMaterial color={colors.lips} />
           </mesh>
        </group>

      </group>
    </group>
  );
};


// Interactive Shape Component
const InteractiveShape = ({ 
  position, 
  color, 
  section, 
  activeSection, 
  onClick, 
  geometryType 
}: { 
  position: [number, number, number], 
  color: string, 
  section: SectionType, 
  activeSection: SectionType,
  onClick: (s: SectionType) => void,
  geometryType: 'box' | 'sphere' | 'torus' | 'octahedron' | 'dodecahedron' | 'icosahedron' | 'cone'
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  
  const isActive = activeSection === section;

  // Add glow (emissiveIntensity) to the spring configuration
  const { scale, dist, glow } = useSpring({
    scale: isActive ? 1.5 : hovered ? 1.1 : 0.8,
    dist: isActive ? 0.6 : 0.2,
    glow: isActive ? 2.5 : hovered ? 0.5 : 0,
    config: { mass: 1, tension: 170, friction: 26 }
  });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <animated.mesh
        ref={meshRef}
        position={position}
        scale={scale}
        onClick={(e) => { e.stopPropagation(); onClick(section); }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; setHover(true); }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; setHover(false); }}
      >
        {geometryType === 'box' && <boxGeometry args={[1, 1, 1]} />}
        {geometryType === 'sphere' && <sphereGeometry args={[0.7, 32, 32]} />}
        {geometryType === 'torus' && <torusKnotGeometry args={[0.5, 0.2, 128, 16]} />}
        {geometryType === 'octahedron' && <octahedronGeometry args={[0.8]} />}
        {geometryType === 'dodecahedron' && <dodecahedronGeometry args={[0.8]} />}
        {geometryType === 'icosahedron' && <icosahedronGeometry args={[0.8]} />}
        {geometryType === 'cone' && <coneGeometry args={[0.7, 1.5, 16]} />}
        
        {/* Use the animated material with emissive properties */}
        <AnimatedMeshDistortMaterial
          color={color}
          speed={3}
          distort={dist}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={glow}
        />
      </animated.mesh>
    </Float>
  );
};

const PortfolioScene: React.FC<SceneProps> = ({ activeSection, onSectionChange }) => {
  
  const handleMissed = () => {
    onSectionChange(SectionType.HOME);
  };

  return (
    <Canvas 
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      onPointerMissed={handleMissed}
      shadows
    >
      <color attach="background" args={['#050505']} />
      
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4c1d95" />
      <pointLight position={[-10, -5, -10]} intensity={1} color="#0ea5e9" />
      <spotLight position={[0, 5, 10]} intensity={1.5} angle={0.5} penumbra={1} castShadow />
      
      {/* Environment */}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="city" />

      {/* Central Character */}
      <CuteGirlAvatar />

      {/* Navigation Nodes */}
      <group>
        {/* About - Sphere - Left */}
        <InteractiveShape 
          position={[-3.5, 0, -1]} 
          color={SECTION_CONFIG[SectionType.ABOUT].color} 
          section={SectionType.ABOUT}
          activeSection={activeSection}
          onClick={onSectionChange}
          geometryType="sphere"
        />

        {/* Projects - Box - Top Left */}
        <InteractiveShape 
          position={[-2, 2.5, -2]} 
          color={SECTION_CONFIG[SectionType.PROJECTS].color} 
          section={SectionType.PROJECTS}
          activeSection={activeSection}
          onClick={onSectionChange}
          geometryType="box"
        />

        {/* Certificates - Cone - Top Center */}
        <InteractiveShape 
          position={[0, 3.8, -2]} 
          color={SECTION_CONFIG[SectionType.CERTIFICATES].color} 
          section={SectionType.CERTIFICATES}
          activeSection={activeSection}
          onClick={onSectionChange}
          geometryType="cone"
        />

        {/* Skills - Torus - Top Right */}
        <InteractiveShape 
          position={[2, 2.5, -2]} 
          color={SECTION_CONFIG[SectionType.SKILLS].color} 
          section={SectionType.SKILLS}
          activeSection={activeSection}
          onClick={onSectionChange}
          geometryType="torus"
        />

        {/* Volunteering - Icosahedron - Bottom Right */}
        <InteractiveShape 
          position={[3, -2.5, -0.5]} 
          color={SECTION_CONFIG[SectionType.VOLUNTEERING].color} 
          section={SectionType.VOLUNTEERING}
          activeSection={activeSection}
          onClick={onSectionChange}
          geometryType="icosahedron"
        />

        {/* Contact - Octahedron - Right */}
        <InteractiveShape 
          position={[3.5, 0, -1]} 
          color={SECTION_CONFIG[SectionType.CONTACT].color} 
          section={SectionType.CONTACT}
          activeSection={activeSection}
          onClick={onSectionChange}
          geometryType="octahedron"
        />
      </group>

      <ContactShadows position={[0, -3.5, 0]} opacity={0.6} scale={20} blur={2.5} far={4} color="#000000" />
    </Canvas>
  );
};

export default PortfolioScene;