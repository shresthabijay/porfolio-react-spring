import React from "react";
import { animated, useTrail } from "react-spring";

const SPRING_CONFIG = { mass: 2, tension: 260, friction: 80 };

export const FirstComponent = ({ active }) => {
  const animationArray = useTrail(2, {
    from: {
      opacity: 0,
      x: 20,
    },
    to: {
      opacity: active ? 1 : 0,
      x: active ? 0 : 20,
    },
    config: SPRING_CONFIG,
  });

  return (
    <section
      style={{
        boxSizing: "border-box",
        height: "100vh",
        paddingTop: "12vh",
        paddingLeft: "25vh",
      }}
    >
      <div style={{ textAlign: "left" }}>
        <animated.h1
          style={{
            opacity: animationArray[0].opacity,
            transform: animationArray[0].x.interpolate(
              (_x) => `translateX(-${_x}rem)`
            ),
            fontSize: "16vh",
            margin: "0",
          }}
        >
          {" "}
          About Me
        </animated.h1>
        <animated.p
          style={{
            opacity: animationArray[1].opacity,
            transform: animationArray[1].x.interpolate(
              (_x) => `translateX(-${_x}rem)`
            ),
            fontSize: "4.5vh",
            letterSpacing: "0.3rem",
          }}
        >
          {" "}
          I love Design, Technology <br /> and Story
        </animated.p>
      </div>
    </section>
  );
};
