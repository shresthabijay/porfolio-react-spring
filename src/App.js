import React from "react";
import "./App.css";
import { animated, useSpring } from "react-spring";
import { FirstComponent } from "./components/FirstComponent";

const MAX_INDEX = 2;
const SPRING_CONFIG = { mass: 2, tension: 260, friction: 60 }

function App() {
  const [index, setIndex] = React.useState(0);
  const indexRef = React.useRef(0);
  const animationStatusRef = React.useRef(false);
  const { y } = useSpring({
    to: { y: index * 100 },
    config: SPRING_CONFIG,
    onRest: () => (animationStatusRef.current = false)
  });

  React.useEffect(() => {
    indexRef.current = index;
  }, [index])

  const scrollHandler = direction => {
    if(animationStatusRef.current) return

    if(direction === 'down' && indexRef.current < MAX_INDEX) {
      animationStatusRef.current = true
      setIndex((index) => index + 1);
    }
    else if(direction === 'up' && indexRef.current > 0){
      animationStatusRef.current = true
      setIndex((index) => index - 1);
    }
  }

  const handleWheelEvent = (e) => {
    // scroll up
    if (e.deltaY < 0) scrollHandler('up')
    // scroll down
    else scrollHandler('down')
  };

  React.useEffect(() => {
    window.addEventListener("wheel", handleWheelEvent);
    if ("ontouchstart" in window) {
      window.addEventListener("touchmove", handleWheelEvent);
    }

    return () => {
      window.removeEventListener("wheel", handleWheelEvent);
      window.removeEventListener("touchmove", handleWheelEvent);
    };
  }, []);

  return (
    <div className="App" style={{ height: "100vh", overflow: "hidden" }}>
      <animated.div
        style={{ transform: y.interpolate((_y) => `translateY(-${_y}vh)`) }}
      >
        <div style={{ background: "pink", height: "100vh" }}></div>
        <FirstComponent active={index === 1} />
        <div style={{ background: "yellow", height: "100vh" }}></div>
      </animated.div>
    </div>
  );
}

export default App;
