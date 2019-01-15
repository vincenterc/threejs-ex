import React from 'react'
import * as THREE from 'three'
import PageWrapper from '../components/PageWrapper'
import OrbitControls from '../utils/OrbitControls'

class HomePage extends React.Component {
  componentDidMount() {
    this._initThree()
  }

  render() {
    return <div id="three-root" />
  }

  _initThree = () => {
    let scene = new THREE.Scene()

    var camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 100

    let controls = new OrbitControls(camera)
    controls.autoRotate = true

    var renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.querySelector('#three-root').appendChild(renderer.domElement)

    var geometry = new THREE.OctahedronGeometry(20)
    // var material = new THREE.MeshNormalMaterial();
    var color = new THREE.Color('#7833aa')
    // var material = new THREE.MeshLambertMaterial( {color: color.getHex(), wireframe: true} );
    // var material = new THREE.MeshLambertMaterial( {color: color.getHex()} );
    var material = new THREE.MeshPhongMaterial({
      color: color.getHex(),
      specular: 0x009900,
      shinyness: 20,
    })
    var cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // for (let i = 0; i < geometry.vertices.length; i++) {
    //   geometry.vertices[i].x += -10 + Math.random()*20;
    //   geometry.vertices[i].y += -10 + Math.random()*20;
    // }

    // cube.rotation.x = 0.45;
    // cube.rotation.y = -0.25;
    // cube.position.x = -30;

    // var light = new THREE.PointLight(0xFFFFFF, 1.5);
    // light.position.set(10, 0, 80);
    // scene.add(light);

    var light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(0, 1, 0)
    scene.add(light)
    var light = new THREE.DirectionalLight(0xffffff, 0.5)
    light.position.set(0, -1, 0)
    scene.add(light)
    var light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(1, 0, 0)
    scene.add(light)
    var light = new THREE.DirectionalLight(0xffffff, 0.5)
    light.position.set(0, 0, 1)
    scene.add(light)
    var light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(0, 0, -1)
    scene.add(light)
    var light = new THREE.DirectionalLight(0xffffff, 0.5)
    light.position.set(-1, 0, 0)
    scene.add(light)

    var render = function() {
      requestAnimationFrame(render)
      controls.update()
      renderer.render(scene, camera)
    }

    render()
  }
}

export default PageWrapper(HomePage)
