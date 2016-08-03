function webglApp() {

  'use strict';

  //// Переменные
  // Сцена
  var DPR = window.devicePixelRatio ? window.devicePixelRatio : 1
  var renderer, scene;
  var rotationObject; // DOM
  var sceneWidth = 200;
  var sceneHeight = 400;
  // Освещение
  var light, spotLight;
  var shadowMapWidth = 1024;
  var shadowMapHeight = shadowMapWidth;
  // Камера
  var camera;

  // объекты
  var cube, cubeGeometry, cubeMaterial, texture, normalMap, displacementMap, aoMap;
  var plane, planeGeometry, planeMaterial;



  var engine = function () {

    // Сцена
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });

    rotationObject = document.getElementById('rotationObject'); // DOM
    rotationObject.appendChild(renderer.domElement);

    renderer.setPixelRatio(DPR);
    renderer.setSize(sceneWidth, sceneHeight);
    // renderer.setViewport(0, 0, WsceneWidthW * DPR, sceneHeight * DPR);
    scene = new THREE.Scene();



    // Свет
    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 150, 0); // поднимаем освещение над кубиком
    // spotLight.castShadow = true;
    // spotLight.shadowMapWidth = shadowMapWidth;
    // spotLight.shadowMapHeight = shadowMapHeight;
    // spotLight.shadowDarkness = 0.11;
    scene.add(spotLight);

    light = new THREE.AmbientLight(0x595959);
    scene.add(light);



    // Тени
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;



    // Камера
    var cameraZoom = 15;
    camera = new THREE.OrthographicCamera(
      sceneWidth / - cameraZoom,
      sceneWidth / cameraZoom,
      sceneHeight / cameraZoom,
      sceneHeight / - cameraZoom,
      1, 1000
    );
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    scene.add(camera);
  };



  var objects = function () {

    // Куб
    cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
    texture = THREE.ImageUtils.loadTexture('images/texture.jpg');
    normalMap = THREE.ImageUtils.loadTexture('images/normal.jpg');
    aoMap = THREE.ImageUtils.loadTexture('images/amb.png');
    // displacementMap = THREE.ImageUtils.loadTexture('images/disp.png');
    cubeMaterial = new THREE.MeshPhongMaterial({
      color: 0xd7b77c,
      wireframe: false,
      map: texture,
      normalMap: normalMap,
      aoMap: aoMap,
      // displacementMap: displacementMap,
      // displacementScale: 0,
      shininess: 5,
      specular: 0xffffff,
      metal: true
    });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.y = 0;
    cube.position.z = 0;
    cube.position.z = 0;
    scene.add(cube);



    // Плоскость
    planeGeometry = new THREE.PlaneGeometry(300,300,1,1);
    planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x595959
    });
    plane = new THREE.Mesh(planeGeometry,planeMaterial);
    // plane.receiveShadow = true;
    plane.rotation.x=-0.5*Math.PI;
    plane.position.x = 0;
    plane.position.y = -15; // опустить горизонт ниже кубика
    plane.position.z = 0;
    scene.add(plane);
  };



  var action = function () {
    cube.rotation.x += -0.01;
    cube.rotation.y += 0.005;
    cube.rotation.z -= 0.005;

    requestAnimationFrame(action);
    renderer.render(scene, camera);
  };



  engine();
  objects();
  action();
}

window.onload = webglApp;
