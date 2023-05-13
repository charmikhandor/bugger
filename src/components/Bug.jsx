import React from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Stage } from "@react-three/drei";
import CanvasLoader from "./CanvasLoader";
import { useEffect, useState } from "react";

function Bug({ isMobile }) {
  const bug = useGLTF("./free_lowpoly_ladybug/scene.gltf");
  return (
    <mesh>
      <ambientLight intensity={1} />
      <hemisphereLight intensity={1} groundColor="black" />
      <spotLight
        //scale={2.5} position-y={0} rotation-y={0} />
        position={[-4, 10, 6]}
        angle={0.12}
        penumbra={1}
        intensity={10}
        castShadow
        shadow-mapSize={1024}
        
      />
      <pointLight intensity={3}/>
      <primitive object={bug.scene} scale={3} position={[0, -5, -1]} />
    </mesh>
  );
}

const BugCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={2}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

          <Bug isMobile={isMobile} />
        
        </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BugCanvas;
