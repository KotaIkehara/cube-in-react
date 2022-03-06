import React from 'react';
import * as THREE from 'three';
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";


const createDesk = () => {
  const desk = {x: 10, y:0.25,z:7};
  const leg = {x: 0.5, y:4,z:0.5};
  
  const boxes=[];
  var TopBoard = new THREE.BoxBufferGeometry(desk.x,desk.y,desk.z);
  TopBoard.translate(0,leg.y+desk.y/2,0);
  boxes.push(TopBoard);

  const positions = [
    [desk.x/2-leg.x,leg.y/2,desk.z/2-leg.z],
    [desk.x/2-leg.x,leg.y/2,-desk.z/2+leg.z],
    [-desk.x/2+leg.x,leg.y/2,desk.z/2-leg.z],
    [-desk.x/2+leg.x,leg.y/2,-desk.z/2+leg.z]
  ]

  for(let i=0;i<4;i++) {
    var Leg = new THREE.BoxBufferGeometry(leg.x,leg.y,leg.z);
    Leg.translate(positions[i][0],positions[i][1],positions[i][2]);
    boxes.push(Leg);
  }
  return mergeBufferGeometries(boxes);
}

const Desk = () => {
  const title = "Desk";
  const details = [{name: "Top Board", num: 1}, {name:"Leg", num: 4}];
  const desk=createDesk();
  
  return (
    <mesh castShadow geometry={desk}
      title={title}
      details={details}
    >
      <meshStandardMaterial attach='material' color="lightblue"/>
    </mesh>
  )
}

export default Desk