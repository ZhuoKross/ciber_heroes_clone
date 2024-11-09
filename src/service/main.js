import * as three from "three";

const scene = three.Scene();
const camera = three.PerspectiveCamera(75, innerWidth, 0.1, 1000);


const renderer = new three.WebGLRenderer();

renderer.setSize( window.innerHeight, window.innerWidth);

export function main (){
    document.body.appendChild( renderer.domElement );
}