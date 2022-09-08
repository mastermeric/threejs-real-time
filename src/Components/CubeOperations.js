import React from 'react';
import { useEffect } from 'react';
import * as THREE from "../ThreeJS/three"

var scene, camera, renderer ;

function CreateBox(name, w,h,d,color) {
    var geometry = new THREE.BoxGeometry(w,h,d);
    var materyal = new THREE.MeshBasicMaterial({color:color});        
    var mesh = new THREE.Mesh(geometry,materyal);
    mesh.name = name;

    return mesh;
}

//surekli calisan recursive render..
function render() {
    renderer.render(scene,camera);
    scene.getObjectByName("box1").rotation.x  += 0.01;
    requestAnimationFrame(render);
}

const CubeOperations = () => {

    useEffect(() => {
        console.log("%c OK. COMPONENT MOUNTED !","color:green")

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight,1,1000);
        renderer = new THREE.WebGL1Renderer();        

        renderer.setSize(window.innerWidth,window.innerHeight);
        document.getElementById("webgl").appendChild(renderer.domElement);

        var mesh = CreateBox("box1",1,2,3,0xff0000);

        scene.add(mesh);
        
        //Kamera yerini degistir ki goruntuye 0,0,0 dan farklı yerden baksın..
        camera.position.x = 1;
        camera.position.y = 1;
        camera.position.z = 5;

        //Kamera ya bakıs yerini merkeze al..
        camera.lookAt(new THREE.Vector3(0,0,0))

        //continuos render -----------------
        render();
        //----------------------------------
        
        return () => {
            console.log("%c DESTROYED ! Component UnMounted !","color:red")
        }
    }, [])
    

    return (
        <div id="webgl">
            
        </div>
    );
};

export default CubeOperations;