import * as THREE from 'three/build/three.min.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import model from './lowPolyHead.glb';



const loader = new GLTFLoader();
const scene = new THREE.Scene();
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.x = 0.5
  pointLight.position.y = 0.5
  pointLight.position.z = 4
  scene.add(pointLight);

let materials = [{r:0.85, g:0.56, b:0.28}, {r:0.06, g:0.02, b:0.01}, {r:0.22, g:0.056, b:0.0008}]
let head;
loader.load(
    model,
    (gltf) => {
        head = gltf.scene.children[2]
        head.position.z = 2;
        head.position.y = 0.5;
        head.children.forEach((element, index) => {
            element.material.metalness = 0;
            element.material.color = materials[index]
            console.log(element)
        });   
        console.log('lqksd', head)
        scene.add(head);
        console.log(THREE.ObitControls)
    }, 
    (xhr) => {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    }, 
    (error) => {
        console.log('A loading error occured', error)
    }
)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerWidth, 0.1, 1000);
const canvas = document.querySelector('#Main')

const renderer = new THREE.WebGLRenderer({canvas, antialias: true}});
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerWidth);
camera.position.z = 5;
let rotational = 0.001;

function animate() {
	requestAnimationFrame( animate );

        if(head.rotation.y <= -0.5 || head.rotation.y >= 0.5){rotational*=-1;}
        head.rotation.y += rotational;
    
    
	renderer.render( scene, camera );
}
animate();