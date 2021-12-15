import styled from "@emotion/styled";
import React, {
  ReactEventHandler,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useGesture } from "@use-gesture/react";
import { AnimatePresence, motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import DataContext from "../../contexts/DataContext";
import { enterAnimation } from "../../constants/animation";
import LoadingContext from "../../contexts/LoadingContext";
import Carousel from "./components/Carousel";

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
    font-family: Prompt;
    font-weight: regular;
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
    font-family: Prompt;
    font-weight: light;
    font-size: 18rem;
    line-height: 40rem;
    height: 196rem;
  }
  button {
    width: 163rem;
    height: 40rem;
    border: 2px solid #ffffff;
    font-family: Prompt;
    font-weight: regular;
    font-size: 16rem;
    line-height: 24rem;
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
  .text {
    width: 720rem;
    color: white;
    font-family: Prompt;
    font-size: 48rem;
    line-height: 64rem;
    font-weight: 500;
    text-shadow: 0 4rem 4rem rgba(0, 0, 0, 0.25);
  }
`;
const Home = () => {
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLVideoElement>(null);
  const reverseRef = useRef<HTMLVideoElement>(null);
  const [carouselVisible, setCarouselVisible] = useState(false);
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

  const handler = ({ delta: [, y] }: any) => {
    if (canTransition || shouldReverse || carouselVisible) return;
    if (y > 0) {
      if (current < videos.length - 1) {
        const video = document.querySelectorAll(".transition-video")[
          current
        ] as unknown as HTMLVideoElement;
        video.currentTime = 0;
        video.play().then(() => {
          setCanTransition(true);
        });
      } else {
        setCarouselVisible(true);
      }
    }
    if (y < 0) {
      if (current > 0) {
        const video = document.querySelectorAll(".reverse-video")[
          current
        ] as unknown as HTMLVideoElement;
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
      onWheelEnd: ({ delta: [, y] }) => {
        if (y < 0 && carouselVisible) {
          setCarouselVisible(false);
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
    video.currentTime = 0;
    video.play().then(() => {
      setShouldReverse(false);
      setCanTransition(false);
      setCurrent(next);
    });
  };

  const handleCanPlay: ReactEventHandler = () => {
    if (visible) {
      dispatchProgress(100);
      dispatchVisible(false, 1000);
    }
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

  const textAnimation = useMemo(() => {
    if (canTransition) {
      // return { transform: "translateY(-100rem)", opacity: 0 };
      return { y: -50, opacity: 0 };
    }
    if (shouldReverse) {
      // return { transform: "translateY(100rem)", opacity: 0 };
      return { y: 50, opacity: 0 };
    }
    return { opacity: 1, y: 0 };
  }, [canTransition, shouldReverse]);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <StyledContainer {...bind()} {...enterAnimation}>
      {videos.map(
        (
          {
            video: { transition, current: currentVideo, reverse },
            texts,
            position,
          },
          i
        ) => {
          return (
            <div key={currentVideo}>
              <video
                muted
                loop
                key={"loop"}
                preload={"auto"}
                autoPlay={(current === i && !canTransition) || !shouldReverse}
                className={"loop-video"}
                disablePictureInPicture
                onCanPlay={handleCanPlay}
                style={{
                  zIndex: current === i ? 1 : -1,
                  visibility:
                    canTransition || shouldReverse ? "hidden" : "visible",
                }}
                src={currentVideo}
              />
              <video
                muted
                key={"transition"}
                ref={transitionRef}
                autoPlay={current === i && canTransition}
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
              <video
                muted
                key={"reverse"}
                ref={reverseRef}
                autoPlay={current === i && shouldReverse}
                preload={"auto"}
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
                  // animate={current === i ? textAnimation : { opacity: 0 }}
                  // transition={{ ease: "easeIn", duration: 0.5 }}
                  style={{
                    zIndex: current === i ? 2 : -1,
                    visibility: current === i ? "visible" : "hidden",
                  }}
                >
                  {texts.map((text, index) => {
                    return (
                      <motion.li
                        transition={textTransition(index, texts.length)}
                        animate={
                          current === i
                            ? {
                                ...textAnimation,
                              }
                            : { opacity: 0, y: 50 }
                        }
                      >
                        <span className={"text"}>{text}</span>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </motion.div>
            </div>
          );
        }
      )}
      <AnimatePresence initial={false}>
        {carouselVisible && (
          <Carousel autoPlay={false}>
            {carousels.map(
              (
                {
                  name,
                  avatar,
                  companyName,
                  title,
                  description,
                  brandingColor,
                  backgroundImage,
                },
                i
              ) => (
                <StyledItemWrapper
                  key={i}
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                >
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
                  <button onClick={() => history.push("/case")}>
                    Read Case Study
                  </button>
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
