import styled from "@emotion/styled";
import { FC, useContext, useEffect, useState } from "react";
import { useGesture } from "@use-gesture/react";
import { AnimatePresence, motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import DataContext from "../../contexts/DataContext";
import { enterAnimation } from "../../constants/animation";
import Carousel from "./components/Carousel";
import GlobalContext from "../../contexts/GlobalContext";
import WebAnimations from "./components/WebAnimations";
import MobileAnimation from "./components/MobileAnimation";

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
    @media screen and (min-width: 320px) and (max-width: 767px) {
      display: none;
    }
  }
  .mobile-animation {
    display: block;
    @media screen and (min-width: 320px) and (max-width: 767px) {
      display: flex;
    }
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
  const [current, setCurrent] = useState(0);
  const [currentText, setCurrentText] = useState(0);

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
          setTimeout(() => {
            setCurrentText(current + 1);
          }, 800);
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
          setTimeout(() => {
            setCurrentText(current - 1);
          }, 800);
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

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <StyledContainer {...bind()} {...enterAnimation}>
      <WebAnimations
        videos={videos}
        current={current}
        setCurrent={setCurrent}
        canTransition={canTransition}
        setCanTransition={setCanTransition}
        shouldReverse={shouldReverse}
        setShouldReverse={setShouldReverse}
        currentText={currentText}
      />
      <MobileAnimation />
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
