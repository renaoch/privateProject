import React, { useEffect } from "react";
import * as THREE from "three";
import VANTA from "vanta/src/vanta.net";

const VantaBackground = () => {
  useEffect(() => {
    const element = document.getElementById("vanta-background");

    if (element) {
      const vantaEffect = VANTA({
        el: element,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        backgroundColor: 0x000000,
      });

      return () => {
        if (vantaEffect) {
          vantaEffect.destroy();
        }
      };
    }
  }, []);

  return (
    <div
      id="vanta-background"
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default VantaBackground;
