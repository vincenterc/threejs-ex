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

    let camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 30, 50)
    camera.lookAt(new THREE.Vector3(0, 15, 0))

    let renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xfff6e6)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    document.querySelector('#three-root').appendChild(renderer.domElement)

    let ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)

    let pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(25, 50, 25)
    pointLight.castShadow = true
    pointLight.shadow.mapSize.width = 1024
    pointLight.shadow.mapSize.height = 1024
    scene.add(pointLight)

    let shadowMaterial = new THREE.ShadowMaterial({ color: 0xeeeeee })
    shadowMaterial.opacity = 0.5
    let groundMesh = new THREE.Mesh(
      new THREE.BoxGeometry(100, 0.1, 100),
      shadowMaterial
    )
    groundMesh.receiveShadow = true
    scene.add(groundMesh)

    // let plane = new THREE.Mesh(
    //   new THREE.PlaneGeometry(5,5,5,5),
    //   new THREE.MeshBasicMaterial({ color: 0x222222, wireframe: true })
    // )
    // plane.rotateX(Math.PI / 2)
    // scene.add(plane)

    let geometry = new THREE.OctahedronGeometry(10, 1)
    let material = new THREE.MeshStandardMaterial({
      color: 0xff0051,
      shading: THREE.FlatShading, // default is THREE.SmoothShading
      metalness: 0,
      roughness: 0.8,
    })
    let shapeOne = new THREE.Mesh(geometry, material)
    shapeOne.position.y += 10
    shapeOne.rotateZ(Math.PI / 3)
    shapeOne.castShadow = true
    scene.add(shapeOne)

    let shapeTwo = new THREE.Mesh(
      new THREE.OctahedronGeometry(5, 1),
      new THREE.MeshStandardMaterial({
        color: 0x47689b,
        shading: THREE.FlatShading,
        metalness: 0,
        roughness: 0.8,
      })
    )
    shapeTwo.position.y += 5
    shapeTwo.position.x += 15
    shapeTwo.rotateZ(Math.PI / 5)
    shapeTwo.castShadow = true
    scene.add(shapeTwo)

    renderer.render(scene, camera)

    let controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', function() {
      renderer.render(scene, camera)
    })
  }
}

export default PageWrapper(HomePage)
