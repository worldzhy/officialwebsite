import styled from "@emotion/styled";
import React, { ReactEventHandler, useContext, useRef, useState } from "react";
import { useGesture } from "@use-gesture/react";
import { motion } from "framer-motion";
import DataContext from "../../contexts/DataContext";
import { enterAnimation } from "../../constants/animation";
import LoadingContext from "../../contexts/LoadingContext";

const StyledContainer = styled(motion.div)`
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
  }
  .text-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .position-left {
    padding-left: 150rem;
    justify-content: flex-start;
  }
  .position-center {
    justify-content: center;
  }
  .text {
    width: 720rem;
    color: white;
    font-size: 56rem;
    line-height: 64rem;
    font-weight: 500;
    text-shadow: 0 4rem 4rem rgba(0, 0, 0, 0.25);
  }
`;
const Home = () => {
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const [canTransition, setCanTransition] = useState(false);
  const {
    contents: { home },
  } = useContext(DataContext);
  const { dispatchVisible, dispatchProgress, visible } =
    useContext(LoadingContext);
  const [current, setCurrent] = useState(0);

  const playVideo = (
    isTransition: boolean,
    target: number,
    callback?: () => void,
    errorCallback?: () => void
  ): void => {
    const video = document.querySelectorAll(
      isTransition ? ".transition-video" : ".loop-video"
    ) as unknown as HTMLVideoElement[];
    video[target].currentTime = 0;
    video[target]
      ?.play()
      .then(() => {
        if (callback) {
          callback();
        }
      })
      .catch(() => {
        if (errorCallback) {
          errorCallback();
        }
      });
  };

  const bind = useGesture(
    {
      onWheelStart: async ({ delta: [_, y] }) => {
        if (canTransition) return;
        if (y > 0) {
          /**
           * direction is down
           */
          if (current < home.length - 1) {
            playVideo(current < home.length - 1, current, () =>
              setCanTransition(() => current < home.length - 1)
            );
          }
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
      playVideo(false, current + 1, () => {
        setCanTransition(false);
        setCurrent((prev) => prev + 1);
      });
    }
  };

  const handleCanPlay: ReactEventHandler = () => {
    if (visible) {
      dispatchProgress(100);
      dispatchVisible(false, 1000);
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <StyledContainer {...bind()} {...enterAnimation}>
      {home.map(
        (
          { video: { transition, current: currentVideo }, text, position },
          i
        ) => {
          return (
            <div key={currentVideo}>
              <video
                preload={"auto"}
                muted
                loop
                autoPlay
                className={"loop-video"}
                disablePictureInPicture
                onCanPlay={handleCanPlay}
                style={{
                  zIndex: current === i ? 1 : -1,
                  visibility: canTransition ? "hidden" : "visible",
                }}
                src={currentVideo}
              />
              {transition && (
                <video
                  autoPlay
                  preload={"auto"}
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

              <motion.div
                ref={textWrapperRef}
                className={`text-wrapper position-${position}`}
              >
                <motion.span
                  initial={{ translateY: "0%", opacity: 0 }}
                  animate={{
                    translateY:
                      canTransition && current === i ? "-200px" : "0%",
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
        }
      )}
    </StyledContainer>
  );
};

export default Home;
