import styled from "@emotion/styled";
import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useGesture } from "@use-gesture/react";
import { AnimatePresence, motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import DataContext from "../../contexts/DataContext";
import { enterAnimation, initLoadingProgress } from "../../constants/animation";
import LoadingContext from "../../contexts/LoadingContext";
import Carousel from "./components/Carousel";
import GlobalContext from "../../contexts/GlobalContext";

const StyledItemWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: white;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding-top: 156rem;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  & > * {
    z-index: 1;
  }
  img {
    width: 97rem;
    height: 97rem;
    border-radius: 50%;
  }
  .name {
    margin-top: 4rem;
    font-family: Prompt-Regular;
    font-size: 32rem;
    line-height: 48rem;
  }
  .info-wrapper {
    margin-top: 7rem;
    font-size: 18rem;
    line-height: 21rem;
    .title {
      font-family: Arial;
      opacity: 0.5;
    }
    .company-name {
      margin-left: 26rem;
      font-family: Lora;
      font-weight: bold;
      opacity: 0.5;
    }
  }
  .description {
    width: 788rem;
    margin-top: 25rem;
    font-family: Prompt-Light;
    font-size: 18rem;
    line-height: 40rem;
    height: 196rem;
  }
`;

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
    overflow: hidden;
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
    & .text {
      width: 980rem;
      text-align: center;
    }
  }
  .heading,
  .subtitle {
    width: 720rem;
    color: white;
    font-family: Prompt;
    font-size: 48rem;
    line-height: 64rem;
    font-weight: 500;
    text-shadow: 0 4rem 4rem rgba(0, 0, 0, 0.25);
  }
  .subtitle {
    font-family: Prompt-Light;
    font-size: 24rem;
  }
  .navigate-case-button {
    position: absolute;
    top: 557rem;
    left: 639rem;
    z-index: 10;
    color: white;
    width: 163rem;
    height: 40rem;
    border: 2px solid #ffffff;
    font-family: Prompt-Regular;
    font-size: 16rem;
    line-height: 24rem;
  }
`;

const Home: FC = () => {
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLVideoElement>(null);
  const transitionRef = useRef<HTMLVideoElement>(null);
  const reverseRef = useRef<HTMLVideoElement>(null);
  const {
    state: { carouselVisible, shouldResetHomePage },
    dispatch,
  } = useContext(GlobalContext);
  const history = useHistory();
  const [canTransition, setCanTransition] = useState(false);
  const [shouldReverse, setShouldReverse] = useState(false);
  const {
    contents: {
      home: { videos, carousels },
    },
  } = useContext(DataContext);
  const { dispatchVisible, dispatchProgress, visible } =
    useContext(LoadingContext);
  const [current, setCurrent] = useState(0);
  const [canPreload, setCanPreload] = useState(false);

  useEffect(() => {
    if (!carouselVisible && shouldResetHomePage) {
      setCurrent(0);
      setCanTransition(false);
      dispatch({ shouldResetHomePage: false });
    }
  }, [carouselVisible, dispatch, shouldResetHomePage]);

  const handler = ({ delta: [, y] }: any) => {
    if (canTransition || shouldReverse || carouselVisible) return;
    if (y > 0) {
      if (current < videos.length - 1) {
        const video = document.querySelectorAll(".transition-video")[
          current
        ] as unknown as HTMLVideoElement;
        if (!video) return;
        video.currentTime = 0;
        video.play().then(() => {
          setCanTransition(true);
        });
      } else {
        dispatch({ carouselVisible: true });
      }
    }
    if (y < 0) {
      if (current > 0) {
        const video = document.querySelectorAll(".reverse-video")[
          current
        ] as unknown as HTMLVideoElement;
        if (!video) return;
        video.currentTime = 0;
        video.play().then(() => {
          setShouldReverse(true);
        });
      }
    }
  };

  const bind = useGesture(
    {
      onWheel: handler,
      onWheelStart: handler,
      onWheelEnd: ({ delta: [, y] }: any) => {
        if (y < 0 && carouselVisible) {
          dispatch({ carouselVisible: false });
        }
      },
    },
    {
      wheel: { axis: "y" },
    }
  );

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

  const textTransition = (index: number, length: number) => {
    if (!shouldReverse)
      return {
        ease: "easeIn",
        duration: 0.3,
        delay: index * 0.15,
      };
    return {
      ease: "easeIn",
      duration: 0.3,
      delay: (length - index) * 0.2,
    };
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

  const textAnimation = useMemo(() => {
    if (canTransition) {
      return { y: -50, opacity: 0 };
    }
    if (shouldReverse) {
      return { y: 50, opacity: 0 };
    }
    return { opacity: 1, y: 0 };
  }, [canTransition, shouldReverse]);

  const displayVideos = useMemo(() => {
    if (canPreload) return videos;
    return [videos[0]];
  }, [videos, canPreload]);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <StyledContainer {...bind()} {...enterAnimation}>
      {displayVideos.map(
        (
          {
            video: { transition, current: currentVideo, reverse },
            texts,
            position,
          },
          i
        ) => (
          <div key={currentVideo}>
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
              ref={transitionRef}
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
              ref={reverseRef}
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
              ref={textWrapperRef}
              className={`text-wrapper position-${position}`}
            >
              <motion.ul
                style={{
                  zIndex: current === i ? 2 : -1,
                  visibility: current === i ? "visible" : "hidden",
                }}
              >
                {texts.heading.map((text, index) => {
                  return (
                    <motion.li
                      key={`${currentVideo}-heading-${index}`}
                      transition={textTransition(index, texts.heading.length)}
                      animate={
                        current === i
                          ? {
                              ...textAnimation,
                            }
                          : { opacity: 0, y: 50 }
                      }
                    >
                      <span className={"heading"}>{text}</span>
                    </motion.li>
                  );
                })}
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
                        current === i
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
      <AnimatePresence initial={false}>
        {carouselVisible && (
          <Carousel
            autoPlay={false}
            styles={{ backgroundImage: carousels.backgroundImage }}
            extraComponent={
              <button
                className={"navigate-case-button"}
                onClick={() => history.push("/case")}
              >
                Read Case Study
              </button>
            }
          >
            {carousels.contents.map(
              (
                {
                  name,
                  avatar,
                  companyName,
                  title,
                  description,
                  brandingColor,
                },
                i
              ) => (
                <StyledItemWrapper key={i}>
                  <img src={avatar} alt={""} />
                  <h3 className={"name"}>{name}</h3>
                  <p className={"info-wrapper"}>
                    <span className={"title"}>{title}</span>

                    <span
                      className={"company-name"}
                      style={{ color: brandingColor || "white" }}
                    >
                      {companyName}
                    </span>
                  </p>
                  <p className={"description"}>{description}</p>
                </StyledItemWrapper>
              )
            )}
          </Carousel>
        )}
      </AnimatePresence>
    </StyledContainer>
  );
};

export default Home;
