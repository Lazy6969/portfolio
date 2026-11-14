import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei'

export default function Globe3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 5, 3]} intensity={2.2} color="#fff3b0" />
      <pointLight position={[-4, -2, -3]} intensity={30} color="#ffd60a" />
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh>
          <icosahedronGeometry args={[1.3, 4]} />
          <MeshDistortMaterial color="#FFD60A" distort={0.38} speed={2.2} roughness={0.15} metalness={0.6} />
        </mesh>
        <mesh scale={1.55}>
          <icosahedronGeometry args={[1.3, 1]} />
          <meshBasicMaterial color="#ffd60a" wireframe transparent opacity={0.35} />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.6} />
    </Canvas>
  )
}
