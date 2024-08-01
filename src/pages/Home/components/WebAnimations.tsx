import { FC, useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HomeVideoProps } from "../../../types";
import { initLoadingProgress } from "../../../constants/animation";
import LoadingContext from "../../../contexts/LoadingContext";

type IProps = {
  current: number;
  textAnimation: any;
  currentText: number;
  canTransition: boolean;
  shouldReverse: boolean;
  videos: HomeVideoProps[];
  setCurrent: (value: number) => void;
  setCanTransition: (value: boolean) => void;
  setShouldReverse: (value: boolean) => void;
  textTransition: (index: number, lenght: number) => any;
};

const WebAnimations: FC<IProps> = ({
  videos,
  current,
  currentText,
  canTransition,
  textAnimation,
  shouldReverse,
  setCurrent,
  textTransition,
  setCanTransition,
  setShouldReverse,
}) => {
  const currentRef = useRef<HTMLVideoElement>(null);
  const [canPlayIndex, setCanPlayIndex] = useState<number[]>([]);
  const { dispatchVisible, dispatchProgress, visible } =
    useContext(LoadingContext);

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

  const handleCanPlay = (index: number, isFirst: boolean) => {
    const isCurrent = index === current;

    if (visible && isCurrent && isFirst) {
      dispatchProgress(100);
      dispatchVisible(false, 500);
    }
    canPlayIndex.push(index);
    setCanPlayIndex(Array.from(new Set(canPlayIndex)));
  };

  const handleCanPreload = (index: number) => {
    const isCurrent = index === current;
    const loadIndex = Math.max(...canPlayIndex);
    const nextIndex = loadIndex + 1 > videos.length - 1 ? 0 : loadIndex + 1;

    if (isCurrent || canPlayIndex.includes(index) || index === nextIndex) {
      return "auto";
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
              muted
              loop
              key="loop"
              ref={currentRef}
              src={currentVideo}
              disablePictureInPicture
              className={"loop-video"}
              autoPlay={(current === i && !canTransition) || !shouldReverse}
              style={{
                zIndex: current === i ? 1 : -1,
                visibility:
                  canTransition || shouldReverse ? "hidden" : "visible",
              }}
              preload={handleCanPreload(i)}
              onCanPlay={() => handleCanPlay(i, true)}
              onProgress={() => onProgress(current === i)}
            />
            <video
              muted
              src={transition}
              key={"transition"}
              disablePictureInPicture
              className={"transition-video"}
              autoPlay={current === i && canTransition}
              style={{
                zIndex: current === i ? 1 : -1,
                visibility: canTransition ? "visible" : "hidden",
              }}
              onEnded={handleEnded}
              preload={handleCanPreload(i)}
              onCanPlay={() => handleCanPlay(i, false)}
            />
            <video
              muted
              src={reverse}
              key={"reverse"}
              disablePictureInPicture
              className={"reverse-video"}
              autoPlay={current === i && shouldReverse}
              style={{
                zIndex: current === i ? 1 : -1,
                visibility: shouldReverse ? "visible" : "hidden",
              }}
              onEnded={handleEnded}
              preload={handleCanPreload(i)}
              onCanPlay={() => handleCanPlay(i, false)}
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
