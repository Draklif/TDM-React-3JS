import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Model from "./Model";

export default function Scene({ showCar = false, showHelpers = false }) {
  const cubeRef = useRef();
  const modelRef = useRef();

  const dirLightRef = useRef();
  const pointLightRef = useRef();

  const dirHelperRef = useRef();
  const pointHelperRef = useRef();

  const gridRef = useRef();
  const axesRef = useRef();

  const { scene } = useThree();

  // Montar helpers
  useEffect(() => {
    if (!scene) return;

    if (showHelpers) {
      // Grid y ejes
      gridRef.current = new THREE.GridHelper(10, 10);
      axesRef.current = new THREE.AxesHelper(5);
      scene.add(gridRef.current);
      scene.add(axesRef.current);

      // Helpers de luz
      const dirLight = dirLightRef.current;
      const pointLight = pointLightRef.current;

      if (dirLight) {
        dirHelperRef.current = new THREE.DirectionalLightHelper(
          dirLight,
          1,
          0xff0000
        );
        scene.add(dirHelperRef.current);
      }

      if (pointLight) {
        pointHelperRef.current = new THREE.PointLightHelper(
          pointLight,
          0.3,
          0x00ffff
        );
        scene.add(pointHelperRef.current);
      }
    }

    return () => {
      // Limpiar todo al desmontar
      if (gridRef.current) scene.remove(gridRef.current);
      if (axesRef.current) scene.remove(axesRef.current);
      if (dirHelperRef.current) scene.remove(dirHelperRef.current);
      if (pointHelperRef.current) scene.remove(pointHelperRef.current);
    };
  }, [scene, showHelpers]);

  // Actualización por frame
  useFrame((_, delta) => {
    if (dirHelperRef.current) dirHelperRef.current.update();
    if (pointHelperRef.current) pointHelperRef.current.update();

    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.7;
      cubeRef.current.rotation.y += delta * 0.9;
    }

    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <>
      {/* Luces */}
      <ambientLight intensity={0.5} />
      <directionalLight ref={dirLightRef} position={[10, 5, 5]} intensity={2} />
      <pointLight ref={pointLightRef} position={[0, 5, 0]} intensity={10} />

      {/* Modelos */}
      {showCar ? (
        <group ref={modelRef} position={[0, 0, 0]}>
          <Model scale={100.0} />
        </group>
      ) : (
        <mesh ref={cubeRef}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#9370DB"
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
      )}
    </>
  );
}
