import styled from "@emotion/styled";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useGesture } from "@use-gesture/react";
import { AnimatePresence, motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useDataContext } from "../../contexts/DataContext";
import { enterAnimation } from "../../constants/animation";
import { MobileMediaQuery, mobileMedia } from "../../constants";
import Carousel from "./components/Carousel";
import GlobalContext from "../../contexts/GlobalContext";
import WebAnimations from "./components/WebAnimations";
import MobileAnimation from "./components/MobileAnimation";

const TextAnimationDuration = 800;

const StyledItemWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  padding-top: 156rem;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  ${mobileMedia} {
    padding: 80px 0 220px 0;
  }
  & > * {
    z-index: 1;
  }
  img {
    width: 97rem;
    height: 97rem;
    border-radius: 50%;
    ${mobileMedia} {
      width: 100px;
      height: 100px;
    }
  }
  .name {
    font-size: 32rem;
    margin-top: 4rem;
    line-height: 48rem;
    font-family: Prompt-Regular;
    ${mobileMedia} {
      font-size: 24px;
      margin-top: 6px;
      line-height: 24px;
    }
  }
  .info-wrapper {
    font-size: 18rem;
    margin-top: 7rem;
    line-height: 21rem;
    ${mobileMedia} {
      font-size: 18px;
      margin-top: 20px;
      line-height: 20px;
    }
    .title {
      font-family: Propmt;
      opacity: 0.5;
    }
    .company-name {
      margin-left: 26rem;
      font-family: Propmt-Regular;
      font-weight: bold;
      opacity: 0.5;
    }
  }
  .description {
    width: 788rem;
    height: 196rem;
    margin-top: 25rem;
    font-size: 18rem;
    line-height: 40rem;
    font-family: Prompt-Light;
    ${mobileMedia} {
      width: 100%;
      padding: 0 40px;
      font-size: 18px;
      margin-top: 20px;
      line-height: 32px;
    }
  }
`;

const StyledContainer = styled(motion.div)`
  background: black;
  &,
  video,
  .scroll-wrapper {
    position: absolute;
    min-height: 56vw;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    overflow: hidden;
  }
  .web-animation {
    ${mobileMedia} {
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
  .down-arrow {
    position: absolute;
    display: block;
    bottom: 6vh;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 9;
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
    font-size: 56rem;
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
    font-family: Prompt;
    font-size: 24rem;
    ${mobileMedia} {
      font-size: 14px;
    }
  }
  .navigate-case-button {
    position: absolute;
    font-family: Prompt-Regular;
    width: 183px;
    height: 40px;
    top: 557rem;
    left: 50%;
    line-height: 24px;
    transform: translate(-50%, 0);
    font-size: 16px;
    color: white;
    border: 2px solid #ffffff;
    z-index: 10;
    ${mobileMedia} {
      bottom: 140px;
      top: auto;
      margin: 0 auto;
    }
  }
`;

const Home: FC = () => {
  const {
    state: { carouselVisible, shouldResetHomePage },
    dispatch,
  } = useContext(GlobalContext);
  const isMobile = useMediaQuery(MobileMediaQuery);
  const history = useHistory();
  const [canTransition, setCanTransition] = useState(false);
  const [shouldReverse, setShouldReverse] = useState(false);
  const {
    contents: {
      home: { videos, carousels },
    },
  } = useDataContext();
  const [current, setCurrent] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    if (!carouselVisible && shouldResetHomePage) {
      setCanTransition(false);
      setShouldReverse(false);
      setCurrent(0);
      if (!isMobile) {
        setCurrentText(0);
      }
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
      drag: { axis: "y" },
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
          setCurrentText={setCurrentText}
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
                className="navigate-case-button"
                onClick={() => history.push("/case")}
              >
                {carousels.carouselStudyBtn}
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
