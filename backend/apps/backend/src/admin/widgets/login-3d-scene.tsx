import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

/**
 * Beyond Humans 3D Login Emblem Scene
 * - Procedural chrome torus knot + floating titanium orbital ring + burgundy halo
 * - Supports hot-swapping with /models/hero-garment.glb
 * - Guarded by IntersectionObserver to stop render loop when off-screen (saves GPU)
 */
export default function Login3DScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    let isDisposed = false
    let animationFrameId: number | null = null
    let isInView = true

    // 1. Scene, Camera, Renderer
    const width = container.clientWidth || 330
    const height = container.clientHeight || 180

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 0, 5.2)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15

    // 2. OrbitControls (Smooth inertia, no zoom/pan, limited tilt)
    const controls = new OrbitControls(camera, canvas)
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minPolarAngle = Math.PI / 3.5
    controls.maxPolarAngle = Math.PI / 1.65

    // 3. Lighting - High Fashion Architectural Dialect
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4)
    keyLight.position.set(5, 7, 5)
    scene.add(keyLight)

    // Beyond Humans Signature Deep Burgundy Point Light
    const burgundyRimLight = new THREE.PointLight(0xa32238, 3.2, 10)
    burgundyRimLight.position.set(-4, -2, -2)
    scene.add(burgundyRimLight)

    const fillLight = new THREE.PointLight(0xffffff, 1.2, 10)
    fillLight.position.set(3, 3, 2)
    scene.add(fillLight)

    // 4. Geometry Group
    const group = new THREE.Group()
    scene.add(group)

    // Procedural Mesh Fallback
    const torusKnotGeo = new THREE.TorusKnotGeometry(0.8, 0.23, 128, 32, 2, 3)
    const chromeMat = new THREE.MeshPhysicalMaterial({
      color: 0xf2f2f2,
      metalness: 0.96,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 1.0,
    })
    const torusKnotMesh = new THREE.Mesh(torusKnotGeo, chromeMat)
    group.add(torusKnotMesh)

    // Titanium Orbital Ring
    const titaniumRingGeo = new THREE.TorusGeometry(1.5, 0.024, 16, 100)
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x9e9b97,
      metalness: 0.98,
      roughness: 0.15,
    })
    const titaniumRingMesh = new THREE.Mesh(titaniumRingGeo, titaniumMat)
    group.add(titaniumRingMesh)

    // Beyond Humans Burgundy Accent Ring
    const burgundyRingGeo = new THREE.TorusGeometry(1.68, 0.016, 16, 80)
    const burgundyMat = new THREE.MeshStandardMaterial({
      color: 0xa32238,
      emissive: 0x580d1a,
      emissiveIntensity: 0.8,
      metalness: 0.92,
      roughness: 0.2,
    })
    const burgundyRingMesh = new THREE.Mesh(burgundyRingGeo, burgundyMat)
    group.add(burgundyRingMesh)

    // Soft Ground Shadow disc
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6)
    const canvasShadow = document.createElement("canvas")
    canvasShadow.width = 128
    canvasShadow.height = 128
    const ctx = canvasShadow.getContext("2d")
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60)
      grad.addColorStop(0, "rgba(58, 8, 17, 0.45)")
      grad.addColorStop(0.5, "rgba(20, 10, 12, 0.25)")
      grad.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 128, 128)
    }
    const shadowTex = new THREE.CanvasTexture(canvasShadow)
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    })
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat)
    shadowMesh.rotation.x = -Math.PI / 2
    shadowMesh.position.y = -1.35
    scene.add(shadowMesh)

    // Optional: Load custom GLTF model if dropped at /models/hero-garment.glb
    const checkAndLoadCustomModel = async () => {
      const urls = [
        "/models/hero-garment.glb",
        "http://localhost:3000/models/hero-garment.glb",
      ]
      for (const url of urls) {
        try {
          const res = await fetch(url, { method: "HEAD" })
          if (res.ok && !isDisposed) {
            const loader = new GLTFLoader()
            loader.load(
              url,
              (gltf) => {
                if (isDisposed) return
                // Hide procedural mesh and show custom GLTF
                torusKnotMesh.visible = false
                titaniumRingMesh.visible = false
                burgundyRingMesh.visible = false

                const customModel = gltf.scene
                customModel.scale.set(1.3, 1.3, 1.3)
                customModel.position.set(0, -0.2, 0)
                group.add(customModel)
              },
              undefined,
              () => {
                // keep procedural mesh
              }
            )
            break
          }
        } catch {
          // ignore error
        }
      }
    }
    checkAndLoadCustomModel()

    // 5. Animation Loop with Clock
    const clock = new THREE.Clock()

    const animate = () => {
      if (isDisposed) return

      if (isInView) {
        const elapsedTime = clock.getElapsedTime()

        // Procedural organic floating rotations
        torusKnotMesh.rotation.y = elapsedTime * 0.35
        torusKnotMesh.rotation.x = Math.sin(elapsedTime * 0.25) * 0.15

        titaniumRingMesh.rotation.x = elapsedTime * 0.2
        titaniumRingMesh.rotation.y = -elapsedTime * 0.15

        burgundyRingMesh.rotation.x = -elapsedTime * 0.16
        burgundyRingMesh.rotation.z = elapsedTime * 0.22

        // Soft float
        group.position.y = Math.sin(elapsedTime * 1.6) * 0.06

        controls.update()
        renderer.render(scene, camera)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // 6. IntersectionObserver (Pause frameloop when off-screen to save GPU)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    observer.observe(container)

    // 7. Resize handling
    const handleResize = () => {
      if (!container || isDisposed) return
      const newW = container.clientWidth
      const newH = container.clientHeight
      camera.aspect = newW / newH
      camera.updateProjectionMatrix()
      renderer.setSize(newW, newH)
    }
    window.addEventListener("resize", handleResize)

    // Cleanup on unmount
    return () => {
      isDisposed = true
      observer.disconnect()
      window.removeEventListener("resize", handleResize)
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
      controls.dispose()
      renderer.dispose()
      torusKnotGeo.dispose()
      chromeMat.dispose()
      titaniumRingGeo.dispose()
      titaniumMat.dispose()
      burgundyRingGeo.dispose()
      burgundyMat.dispose()
      shadowGeo.dispose()
      shadowMat.dispose()
      shadowTex.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[175px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    >
      {/* Deep Burgundy Atmosphere Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(88,13,26,0.25)_0%,transparent_70%)] pointer-events-none" />

      {/* Real-time WebGL 3D Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block relative z-10" />
    </div>
  )
}
