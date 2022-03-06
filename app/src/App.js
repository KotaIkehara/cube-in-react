import React, { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, softShadows, Bounds, useBounds } from "@react-three/drei";
import Desk from './components/Desk';
import MaterialList from './components/MaterialList';
import "./styles.css";

softShadows();

const SpinningBox = ({position}) => {
  const title = "Box";
  const details = [{name: "Box", num: 1}];

  const mesh = useRef(null);
  useFrame(()=> {mesh.current.rotation.y = mesh.current.rotation.y += 0.01});

  return (
      <mesh castShadow position={position} ref={mesh}
        title={title}
        details={details}
      >
        <boxBufferGeometry attach='geometry' args={[1,1,1]}/>
        <meshStandardMaterial attach='material' color="lightblue"/>
      </mesh>
  )
}

const Floor = () => {
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI/2,0,0]} position={[0,-3,0]}>
        <planeBufferGeometry attach="geometry" args={[100, 100]}/>
        <shadowMaterial attach="material" opacity={0.3}/>
      </mesh>
    </group>
  );
}


export default function App() {
     const [title,setTitle] = useState("");
     const [details,setDetails] = useState([]);
     const [autoRotate,setAutoRotate]  = useState(false);

     return (
      <div className="App" id="root">
      {/* Canvas takes only three.js elements */}
      <Canvas colorManagement shadows className='canvas' camera={{ position: [0, -10, 80], fov: 50 }} dpr={[1, 2]}>
        {/* makeDefault will be desabled automatically when the user is pulling the transfomr gizmo */}
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.8}
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

        <Suspense fallback={null}>
          <Bounds fit clip margin={1.5}>
            <SelectToZoom setTitle={setTitle} setDetails={setDetails} setAutoRotate={setAutoRotate}>
              <Desk/>
              <SpinningBox position={[0,0,8]} setAutoRotate={setAutoRotate}/>
            </SelectToZoom>
          </Bounds>
          <Floor/>
          <gridHelper visible position={[0,-3,0]} args={[50, 50]} />
        </Suspense>
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} autoRotate={autoRotate}/>
      </Canvas>
      <MaterialList title={title} details={details}/>
    </div>
  );
}

// This component wraps children in a group with a click handler
// Clicking any object will refresh and fit bounds
const SelectToZoom = (props) => {
  const api = useBounds();
  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        e.delta <= 2 && api.refresh(e.object).fit();
        props.setTitle(e.object.title);
        props.setDetails(e.object.details);
        props.setAutoRotate(true);
      }}
      onPointerMissed={(e) => {
        e.button === 0 && api.refresh().fit();
        props.setTitle("");
        props.setDetails([]);
        props.setAutoRotate(false);
      }}
    >
      {props.children}
    </group>
  );
}
