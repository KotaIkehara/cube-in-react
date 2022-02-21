import React, {useRef} from 'react';
import { Canvas,useFrame } from "@react-three/fiber";
import { OrbitControls, softShadows } from "@react-three/drei";

import "./styles.css";

softShadows();

const SpinningBox = () => {
  const mesh = useRef(null);
  useFrame(()=> {mesh.current.rotation.y = mesh.current.rotation.y += 0.01});

  return (
    <mesh castShadow ref={mesh}>
        {/* args in box represents [width,height,depth] */}
          <boxBufferGeometry attach='geometry' args={[1,1,1]}/>
          <meshStandardMaterial attach='material' color="lightblue"/>
        </mesh>
  )
}

export default function App() {
  
     return (
    <div className="App" id="root">
      {/* start to define react three fiber scene */}
      {/* Canvas takes only three.js elements */}
      <Canvas colorManagement shadows>
        {/* makeDefault will be desabled automatically when the user is pulling the transfomr gizmo */}
        <OrbitControls makeDefault/>
        <ambientLight intensity={0.3} />
        <directionalLight
                castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <group>
          <mesh receiveShadow rotation={[-Math.PI/2,0,0]} position={[0,-2,0]}>
            <planeBufferGeometry attach="geometry" args={[100, 100]}/>
            <shadowMaterial attach="material" opacity={0.3}/>
          </mesh>
        </group>
        <SpinningBox/>
        <gridHelper visible={true} position={[0,-2,0]} args={[50, 50]} />
      </Canvas>
    </div>
  );
}