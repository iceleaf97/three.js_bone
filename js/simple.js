/**
 * Created by iceleaf on 2016/8/30.
 */
var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container;

var WIDTH, HEIGHT;

window.addEventListener('load', init, false);

function init() {
    createScene();
    createLight();
    createModel();

    render();
    loop();


}

function createScene() {
    scene = new THREE.Scene();

    WIDTH = document.getElementById('world').clientWidth;
    HEIGHT = document.getElementById('world').clientHeight;
    fieldOfView = 40;
    aspectRatio = WIDTH/HEIGHT;
    nearPlane = 1;
    farPlane = 10000;

    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    camera.position.set(0, 0, 10);

}

function createLight(){
    var spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(-100, 100, 100);
    scene.add(spotLight);
}

function createModel(){
    var geom = new THREE.SphereGeometry(10, 20, 20);
    var mtl = new THREE.MeshLambertMaterial({color:0xffffff});
    var mesh = new THREE.Mesh(geom, mtl);

   // scene.add(mesh);



    var jsonLoader = new THREE.JSONLoader();
    jsonLoader.load('model/monkey.json', addModel);
    function addModel(geometry, material) {
        var mtl2 = new THREE.MeshFaceMaterial(material);
        var mesh2 = new THREE.Mesh(geometry, mtl2);
        scene.add(mesh2);
    }


}

function render() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);

    renderer.render(scene, camera);

    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
}


function loop() {
    renderer.render(scene, camera);
    requestAnimationFrame(loop);

}


