import styled from "@emotion/styled";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useGesture } from "@use-gesture/react";
import { motion } from "framer-motion";
import DataContext from "../../contexts/DataContext";

const StyledContainer = styled.div`
  background: black;
  &,
  video,
  .scroll-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
  video {
    transition: all ease 16ms;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    &::-webkit-media-controls-enclosure {
      display: none;
    }
  }
  .text-wrapper {
    height: 100%;
  }
  .text {
    position: absolute;
    top: 50%;
    color: white;
    font-size: 30px;
    left: 50%;
  }
`;
const Home = () => {
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const [canTransition, setCanTransition] = useState(false);
  const {
    contents: { home },
  } = useContext(DataContext);
  const [current, setCurrent] = useState(0);

  const playVideo = (isTransition: boolean, target: number): void => {
    const video = document.querySelectorAll(
      isTransition ? ".transition-video" : ".loop-video"
    ) as unknown as HTMLVideoElement[];
    video[target]?.play();
  };

  const bind = useGesture(
    {
      onWheelStart: async ({ delta: [_, y] }) => {
        if (canTransition) return;
        if (y > 0) {
          /**
           * direction is down
           */
          setCanTransition(() => current < home.length - 1);
          playVideo(current < home.length - 1, current);
        } else {
          /**
           * direction is up
           */
          setCurrent((prev) => {
            return prev > 0 ? prev - 1 : 0;
          });
        }
      },
    },
    {
      wheel: { axis: "y" },
    }
  );

  const handleEnded = () => {
    if (canTransition) {
      playVideo(false, current + 1);
      setCanTransition(false);
      setCurrent((prev) => prev + 1);
    }
  };

  return (
    <StyledContainer {...bind()}>
      {home.map(({ video: { transition, current: currentVideo }, text }, i) => {
        return (
          <div key={text}>
            <video
              muted
              loop
              autoPlay={i === 0}
              className={"loop-video"}
              disablePictureInPicture
              style={{
                zIndex: current === i ? 1 : -1,
                visibility: canTransition ? "hidden" : "visible",
              }}
              src={currentVideo}
            />
            {transition && (
              <video
                onEnded={handleEnded}
                className={"transition-video"}
                disablePictureInPicture
                style={{
                  zIndex: current === i ? 1 : -1,
                  visibility: canTransition ? "visible" : "hidden",
                }}
                src={transition}
              />
            )}

            <motion.div ref={textWrapperRef} className={"text-wrapper"}>
              <motion.span
                initial={{ translateY: "0%", opacity: 0 }}
                animate={{
                  translateY: canTransition && current === i ? "-200px" : "0%",
                  opacity: canTransition ? 0 : 1,
                }}
                transition={{ ease: "easeIn", duration: 0.5 }}
                style={{
                  zIndex: current === i ? 2 : -1,
                  visibility: current === i ? "visible" : "hidden",
                }}
                className={"text"}
              >
                {text}
              </motion.span>
            </motion.div>
          </div>
        );
      })}
    </StyledContainer>
  );
};

export default Home;
