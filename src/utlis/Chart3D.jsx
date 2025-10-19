import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import pic from '../assets/hero.svg'
// Single 3D Bar component
const Bar = ({ height, x, color }) => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={mesh} position={[x, height / 2, 0]}>
      <boxGeometry args={[0.5, height, 0.5]} />
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={1.2}
        color={color}
        metalness={0.6}
        roughness={0.3}
      />
    </mesh>
  );
};

// Glowing Line connecting bars
const CurveLine = ({ points }) => {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const tubeGeometry = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.05, 8, false), [curve]);

  return (
    <mesh geometry={tubeGeometry}>
      <meshStandardMaterial
        emissive="#00ff99"
        emissiveIntensity={1.5}
        color="#00ffaa"
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  );
};

// Floating label for values
const Label = ({ position, text }) => (
  <Html position={position} center>
    <div className="text-xs font-semibold bg-green-500 text-white rounded px-2 py-1 shadow">
      {text}
    </div>
  </Html>
);

const ChartScene = () => {
  const data = useMemo(
    () => [
      { value: 4, color: "#12c2e9" },
      { value: 6, color: "#00e676" },
      { value: 8, color: "#12c2e9" },
      { value: 5, color: "#00e676" },
      { value: 7, color: "#12c2e9" },
      { value: 9, color: "#00e676" },
      { value: 6, color: "#12c2e9" },
    ],
    []
  );

  const points = data.map((d, i) => new THREE.Vector3(i * 1.2 - 3, d.value, 0));

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 15, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={1} />

      {/* Bars */}
      {data.map((d, i) => (
        <Bar key={i} height={d.value} x={i * 1.2 - 3} color={d.color} />
      ))}

      {/* Line */}
      <CurveLine points={points} />

      {/* Floating Labels */}
      {data.map((d, i) => (
        <Label
          key={i}
          position={[i * 1.2 - 3, d.value + 0.5, 0]}
          text={`${(d.value * 100).toFixed(0)}%`}
        />
      ))}

      <OrbitControls enableZoom={true} />
    </>
  );
};

const Chart3D = () => (
  <div className="w-full h-[300px] bg-gradient-to-b from-blue-900 to-blue-700 rounded-xl overflow-hidden shadow-lg"  style={{
      backgroundImage: `url(${pic})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
    <Canvas camera={{ position: [0, 6, 10], fov: 45 }}>
      <ChartScene />
    </Canvas>
  </div>
);

export default Chart3D;
