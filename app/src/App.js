import "./styles.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, TransformControls } from "@react-three/drei";


export default function App() {
     return (
    <div className="App" id="root">
      {/* start to define react three fiber scene */}
      <Canvas>
        <PerspectiveCamera/>
        {/* makeDefault will be desabled automatically when the user is pulling the transfomr gizmo */}
        <OrbitControls makeDefault/>

        <pointLight position={[10, 10, 10]} />
        <ambientLight intensity={0.50} />
        <gridHelper visible={true} args={[10, 10]} />

        <TransformControls mode="translate">
        <mesh position={[0,0.5,0]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial attach='material' />
        </mesh>
        </TransformControls>

      </Canvas>
    </div>
  );
}