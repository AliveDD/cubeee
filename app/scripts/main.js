function init() {

  // глобальные
  var renderer, scene, camera, spotLight;

  // сцена
  var rotationObject; // DOM

  var sceneWidth = window.innerWidth / 3;
  var sceneHeight = window.innerHeight / 2;

  var shadowMapWidth = 2048;
  var shadowMapheigh = shadowMapWidth;

  // объекты
  var cube, geometry, material;





  var scene = function () {

    // Сцена
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });

    rotationObject = document.getElementById('rotationObject'); // DOM
    rotationObject.appendChild(renderer.domElement);

    renderer.setSize(sceneWidth, sceneHeight);
    scene = new THREE.Scene();



    // Свет
    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 70, 0); // поднимаем освещение над кубиком
    spotLight.castShadow = true;
    spotLight.shadowMapWidth = shadowMapWidth;
    spotLight.shadowMapHeight = shadowMapheigh;
    spotLight.shadowDarkness = 0.11;
    scene.add(spotLight);

    light = new THREE.AmbientLight(0x303030);
    scene.add(light);



    // Тени
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;



    // Камера
    camera = new THREE.OrthographicCamera(
      sceneWidth / - 10, sceneWidth / 10, sceneHeight / 10, sceneHeight / - 10, 1, 1000
    );
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    scene.add(camera);



    // Плоскость
    var planeGeometry = new THREE.PlaneGeometry(300,300,1,1);
    var planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x595959
    });
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x=-0.5*Math.PI;
    plane.position.x = 0;
    plane.position.y = -15; // опустить горизонт ниже кубика
    plane.position.z = 0;
    scene.add(plane);



    // Куб
    cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
    cubeMaterial = new THREE.MeshLambertMaterial({
      wireframe: false,
      shading: THREE.SmoothShading,
      color: 0x9933ff
    });

    var texture = THREE.ImageUtils.loadTexture('../images/home/pattern.png');
    var cubeMaterial = new THREE.MeshPhongMaterial({
      color: 0xf2f2f2,
      specular: 0x111111,
      map: texture,
      normalMap: texture,
      specular: texture,
      reflectivity: 1,
      shininess: 300,
      metal: false
    });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.y = 0;
    cube.position.z = 0;
    cube.position.z = 0;
    scene.add(cube);
  }



  var action = function () {
    cube.rotation.x += -0.01;
    cube.rotation.y += 0.005;
    cube.rotation.z -= 0.005;

    requestAnimationFrame(action);
    renderer.render(scene, camera);
  };





  scene();
  action();
}

init();
