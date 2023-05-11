import React from "react";
import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./CanvasLoader";
import { useRef } from "react";
import { Mesh } from "three";

function Bug() {
  const meshRef = useRef < Mesh > null;

  useFrame(() => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });
  const bug = useGLTF("./scene.gltf");
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight scale={2.5} position-y={0} rotation-y={0} />
      {/* position={[-4, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      /> */}
      <pointLight intensity={1} />
      <primitive object={bug.scene} scale={4} position={[0, -1, 0]} />
    </mesh>
  );
}

const BugCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
      gl={{ preserveDrawingBuffer: true }}
      dpr={[1, 2]}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Bug />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BugCanvas;
