import styled from "@emotion/styled";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useGesture } from "@use-gesture/react";
import { AnimatePresence, motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import DataContext from "../../contexts/DataContext";
import { enterAnimation } from "../../constants/animation";
import { mobileMedia } from "../../constants";
import Carousel from "./components/Carousel";
import GlobalContext from "../../contexts/GlobalContext";
import WebAnimations from "./components/WebAnimations";
import MobileAnimation from "./components/MobileAnimation";

const TextAnimationDuration = 800;

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
  .web-animation {
     {
      display: none;
    }
  }
  .mobile-animation {
    display: none;
    ${mobileMedia} {
      display: block;
    }
  }
  .animation-canvas {
    width: 100% !important;
    position: absolute;
    bottom: 0;
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
    ${mobileMedia} {
      font-size: 20px;
      font-weight: 500;
      line-height: 32px;
      letter-spacing: 0px;
      text-align: center;
    }
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
  const {
    state: { carouselVisible, shouldResetHomePage },
    dispatch,
  } = useContext(GlobalContext);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const history = useHistory();
  const [canTransition, setCanTransition] = useState(false);
  const [shouldReverse, setShouldReverse] = useState(false);
  const {
    contents: {
      home: { videos, carousels },
    },
  } = useContext(DataContext);
  const [current, setCurrent] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    if (!carouselVisible && shouldResetHomePage) {
      setCurrent(0);
      setCanTransition(false);
      setShouldReverse(false);
      dispatch({ shouldResetHomePage: false });
    }
  }, [carouselVisible, dispatch, shouldResetHomePage]);

  const handler = ({ delta: [, y] }: any, type: "wheel" | "drag") => {
    if (canTransition || shouldReverse || carouselVisible) return;
    const currentY = type === "drag" ? -y : y;
    if (currentY > 0) {
      if (current < videos.length - 1) {
        if (isMobile) {
          setCanTransition(true);
          setTimeout(() => {
            setCurrentText(current + 1);
          }, TextAnimationDuration);
        } else {
          const video = document.querySelectorAll(".transition-video")[
            current
          ] as unknown as HTMLVideoElement;
          if (!video) return;
          video.currentTime = 0;
          video.play().then(() => {
            setCanTransition(true);
            setTimeout(() => {
              setCurrentText(current + 1);
            }, TextAnimationDuration);
          });
        }
      } else {
        dispatch({ carouselVisible: true });
      }
    }
    if (currentY < 0) {
      if (current > 0) {
        if (isMobile) {
          setShouldReverse(true);
          setTimeout(() => {
            setCurrentText(current - 1);
          }, TextAnimationDuration);
        } else {
          const video = document.querySelectorAll(".reverse-video")[
            current
          ] as unknown as HTMLVideoElement;
          if (!video) return;
          video.currentTime = 0;
          video.play().then(() => {
            setShouldReverse(true);
            setTimeout(() => {
              setCurrentText(current - 1);
            }, TextAnimationDuration);
          });
        }
      }
    }
  };

  const bind = useGesture(
    {
      onWheel: (props) => handler(props, "wheel"),
      onWheelStart: (props) => handler(props, "wheel"),
      onWheelEnd: ({ delta: [, y] }: any) => {
        if (y < 0 && carouselVisible) {
          dispatch({ carouselVisible: false });
        }
      },
      onDrag: (props) => handler(props, "drag"),
      onDragStart: (props) => handler(props, "drag"),
      onDragEnd: ({ delta: [, y] }: any) => {
        if (-y < 0 && carouselVisible) {
          dispatch({ carouselVisible: false });
        }
      },
    },
    {
      wheel: { axis: "y" },
    }
  );

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
    if (current !== currentText) {
      return { opacity: 1, y: 0 };
    }
    if (canTransition) {
      return { y: -50, opacity: 0 };
    }
    if (shouldReverse) {
      return { y: 50, opacity: 0 };
    }
    return { opacity: 1, y: 0 };
  }, [canTransition, shouldReverse, current, currentText]);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <StyledContainer {...bind()} {...enterAnimation}>
      {isMobile ? (
        <MobileAnimation
          videos={videos}
          current={current}
          setCurrent={setCurrent}
          canTransition={canTransition}
          setCanTransition={setCanTransition}
          shouldReverse={shouldReverse}
          setShouldReverse={setShouldReverse}
          currentText={currentText}
          textTransition={textTransition}
          textAnimation={textAnimation}
        />
      ) : (
        <WebAnimations
          videos={videos}
          current={current}
          setCurrent={setCurrent}
          canTransition={canTransition}
          setCanTransition={setCanTransition}
          shouldReverse={shouldReverse}
          setShouldReverse={setShouldReverse}
          currentText={currentText}
          textTransition={textTransition}
          textAnimation={textAnimation}
        />
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
