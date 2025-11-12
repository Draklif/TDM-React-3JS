import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Header from "./components/Header"
import Scene from "./components/Scene"

export default function App() {
  return (
    <div className="h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-full">
          <Canvas camera={{ position: [3, 3, 3] }}>
            <Scene showCar={false} showHelpers={true} />
            <OrbitControls />
          </Canvas>
        </div>
      </div>
    </div>
  )
}
