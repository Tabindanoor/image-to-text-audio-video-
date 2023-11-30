

// import React from 'react'
// import { Link } from 'react-router-dom'

// const App = () => {
//   return (
//     <div>
//       <Link to={"/"}>app home </Link>
//       <Link to={"/login"}>login </Link>
//       <Link to={"/signup"}>signup </Link>
//       <Link to={"/video"}>video </Link>
//       <Link to={"/image-2-pdf"}>pdf </Link>
//       <Link to={"/image-2-text"}>text audio </Link>
//     </div>
//   )
// }



// export default App


import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "./components/Utils";
import Navbar from "./components/Navbar";
// import { ThemeProvider } from "./components/ThemeContext";
// import { useDarkMode } from "./context/DarkModeContext";
// import ChangeMode from "./components/ChangeMode";


const ParticleRing = () => {
  // const { theme, toggleTheme } = useDarkMode();
  return (
    <div>  
    <div className="relative">
      {/* <ThemeProvider> */}
      <Navbar/>
       {/* <div className={`App ${theme === 'dark' ? 'dark' : ''}`}>
      <ChangeMode theme={theme} toggleTheme={toggleTheme} />
    </div> */}
      <Canvas
        camera={{
          position: [10, -7.5, -5],
        }}
        style={{ height: "100vh" }}
        className="bg-slate-900"
      >
        <OrbitControls maxDistance={20} minDistance={10} />
        <directionalLight />
        <pointLight position={[-30, 0, -30]} power={10.0} />
        <PointCircle />
      </Canvas>

      <h1 className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-slate-200 font-medium text-2xl md:text-5xl pointer-events-none">
       IMAGE TO TEXT EXTRACTOR
      </h1>
      {/* </ThemeProvider> */}
    </div>
    </div>
  );
};

const PointCircle = () => {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Point = ({ position, color }) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.5}
        color={color}
      />
    </Sphere>
  );
};

export default ParticleRing;