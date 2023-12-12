import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CamersRig from "./CamersRig";

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <CamersRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CamersRig>
    </Canvas>
  );
};

export default CanvasModel;
