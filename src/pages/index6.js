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
    var colors = [
      0x05a8aa,
      0xb8d5b8,
      0xd7b49e,
      0xdc602e,
      0xbc412b,
      0xf19c79,
      0xcbdfbd,
      0xf6f4d2,
      0xd4e09b,
      0xffa8a9,
      0xf786aa,
      0xa14a76,
      0xbc412b,
      0x63a375,
      0xd57a66,
      0x731a33,
      0xcbd2dc,
      0xdbd48e,
      0x5e5e5e,
    ]
    var scene, camera, renderer, geometry, mesh

    var verticePositions = []

    function initScene() {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      renderer = new THREE.WebGLRenderer({ alpha: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      document.querySelector('#three-root').appendChild(renderer.domElement)
      camera.position.z = 100
    }

    function initLighting() {
      // so many lights
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
    }

    function initGeometry() {
      // add icosahedron
      geometry = new THREE.IcosahedronGeometry(20)
      for (var i = 0; i < geometry.faces.length; i++) {
        var face = geometry.faces[i]
        face.color.setHex(colors[i])
      }

      mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors })
      )
      scene.add(mesh)
    }

    function render() {
      requestAnimationFrame(render)
      renderer.render(scene, camera)
    }

    function resize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    initScene()
    initLighting()
    initGeometry()
    render()

    window.addEventListener('resize', resize)
  }
}

export default PageWrapper(HomePage)
