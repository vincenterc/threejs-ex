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

    var renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.querySelector('#three-root').appendChild(renderer.domElement)

    // add icosahedron
    var mesh
    var geometry = new THREE.OctahedronGeometry(20)
    var color = new THREE.Color('#7833aa')
    var textureLoader = new THREE.TextureLoader()
    textureLoader.crossOrigin = true
    textureLoader.load(
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/4268-bump.jpg',
      function(texture) {
        var material = new THREE.MeshPhongMaterial({
          color: color.getHex(),
          bumpMap: texture,
        })
        mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
        render()
      }
    )

    var light = new THREE.PointLight(0xffffff, 1.5)
    light.position.set(10, 0, 80)
    scene.add(light)
    var light = new THREE.PointLight(0xffffff, 1.5)
    light.position.set(25, 0, -80)
    scene.add(light)

    var render = function() {
      requestAnimationFrame(render)
      controls.update()
      renderer.render(scene, camera)
    }
  }
}

export default PageWrapper(HomePage)
