import React from 'react'
import * as THREE from 'three'
import PageWrapper from '../components/PageWrapper'

class HomePage extends React.Component {
  componentDidMount() {
    this._initThree()
  }

  render() {
    return <div id="three-root" />
  }

  _initThree = () => {
    var renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.querySelector('#three-root').appendChild(renderer.domElement)

    var camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      500
    )
    camera.position.set(0, 0, 100)
    camera.lookAt(0, 0, 0)

    var scene = new THREE.Scene()

    var material = new THREE.LineBasicMaterial({ color: 0x0000ff })
    var geometry = new THREE.Geometry()
    geometry.vertices.push(new THREE.Vector3(-10, 0, 0))
    geometry.vertices.push(new THREE.Vector3(0, 10, 0))
    geometry.vertices.push(new THREE.Vector3(10, 0, 0))
    var line = new THREE.Line(geometry, material)

    scene.add(line)
    renderer.render(scene, camera)
  }
}

export default PageWrapper(HomePage)
