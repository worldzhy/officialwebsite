import { FC, useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HomeVideoProps } from "../../../types";
import { initLoadingProgress } from "../../../constants/animation";
import LoadingContext from "../../../contexts/LoadingContext";

type IProps = {
  videos: HomeVideoProps[];
  current: number;
  setCurrent: (value: number) => void;
  canTransition: boolean;
  setCanTransition: (value: boolean) => void;
  shouldReverse: boolean;
  setShouldReverse: (value: boolean) => void;
  currentText: number;
  textTransition: (index: number, lenght: number) => any;
  textAnimation: any;
};

const WebAnimations: FC<IProps> = ({
  videos,
  current,
  setCurrent,
  canTransition,
  setCanTransition,
  shouldReverse,
  setShouldReverse,
  currentText,
  textTransition,
  textAnimation,
}) => {
  const { dispatchVisible, dispatchProgress, visible } =
    useContext(LoadingContext);
  const [canPreload, setCanPreload] = useState(false);
  const currentRef = useRef<HTMLVideoElement>(null);

  const handleEnded = () => {
    const next = canTransition ? current + 1 : current - 1;
    const video = document.querySelectorAll(".loop-video")[
      next
    ] as unknown as HTMLVideoElement;
    if (!video) return;
    video.currentTime = 0;
    video.play().then(() => {
      setShouldReverse(false);
      setCanTransition(false);
      setCurrent(next);
    });
  };

  const handleCanPlay = (isCurrent: boolean) => {
    if (visible && isCurrent) {
      dispatchProgress(100);
      dispatchVisible(false, 500);
      setCanPreload(true);
    }
  };

  const handleCanPreload = (index: number) => {
    const gap = Math.abs(index - current);
    if (gap === 0) {
      return "auto";
    }
    if (gap === 1) {
      return "metadata";
    }
    return "none";
  };

  const onProgress = (isCurrent: boolean) => {
    if (visible && isCurrent) {
      const ele = currentRef.current;
      if (!ele) return;
      const percentage = (ele.currentTime / ele.duration) * 100;
      if (percentage > initLoadingProgress) {
        dispatchProgress(percentage);
      }
    }
  };

  return (
    <>
      {videos.map(
        (
          {
            video: { transition, current: currentVideo, reverse },
            texts,
            position,
          },
          i
        ) => (
          <div className="web-animation" key={currentVideo}>
            <video
              ref={currentRef}
              muted
              loop
              key={"loop"}
              preload={handleCanPreload(i)}
              autoPlay={(current === i && !canTransition) || !shouldReverse}
              className={"loop-video"}
              disablePictureInPicture
              style={{
                zIndex: current === i ? 1 : -1,
                visibility:
                  canTransition || shouldReverse ? "hidden" : "visible",
              }}
              src={currentVideo}
              onProgress={() => onProgress(current === i)}
              onCanPlay={() => handleCanPlay(current === i)}
            />
            <video
              muted
              key={"transition"}
              autoPlay={current === i && canTransition}
              preload={handleCanPreload(i)}
              onEnded={handleEnded}
              className={"transition-video"}
              disablePictureInPicture
              style={{
                zIndex: current === i ? 1 : -1,
                visibility: canTransition ? "visible" : "hidden",
              }}
              src={transition}
            />
            <video
              muted
              key={"reverse"}
              autoPlay={current === i && shouldReverse}
              preload={handleCanPreload(i)}
              onEnded={handleEnded}
              className={"reverse-video"}
              disablePictureInPicture
              style={{
                zIndex: current === i ? 1 : -1,
                visibility: shouldReverse ? "visible" : "hidden",
              }}
              src={reverse}
            />
            <motion.div
              className={`text-wrapper position-${position}`}
              style={{
                zIndex: currentText === i ? 2 : -1,
                visibility: currentText === i ? "visible" : "hidden",
              }}
            >
              <motion.ul>
                {texts.heading.map((text, index) => (
                  <motion.li
                    key={`${currentVideo}-heading-${index}`}
                    transition={textTransition(index, texts.heading.length)}
                    animate={
                      currentText === i
                        ? {
                            ...textAnimation,
                          }
                        : { opacity: 0, y: 50 }
                    }
                  >
                    <span className={"heading"}>{text}</span>
                  </motion.li>
                ))}
                {texts.subtitle?.map((text, index) => {
                  return (
                    <motion.li
                      className={"text-center"}
                      key={`${currentVideo}-sub-title-${index}`}
                      transition={textTransition(
                        texts.heading.length + index + 1,
                        texts.heading.length + (texts.subtitle?.length || 0)
                      )}
                      animate={
                        currentText === i
                          ? {
                              ...textAnimation,
                            }
                          : { opacity: 0, y: 50 }
                      }
                    >
                      <span className={"subtitle"}>{text}</span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          </div>
        )
      )}
    </>
  );
};

export default WebAnimations;
