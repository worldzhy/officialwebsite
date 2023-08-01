import { FC, useContext, useEffect, useRef } from "react";
import lottie from "lottie-web";
import styled from "@emotion/styled";
import { useMediaQuery } from "usehooks-ts";
import { useLocation } from "react-router-dom";
import { MobileMediaQuery } from "../../constants";
import animationData from "../../animations/footer_button.json";
import GlobalContext, { FooterIconEnum } from "../../contexts/GlobalContext";

const StyledCircleIcon = styled.div`
  &:hover {
    svg:first-of-type {
      height: 0;
      visibility: hidden;
      opacity: 0;
      transform: scale(0.8);
    }
    svg:last-of-type {
      height: auto;
      visibility: visible;
      opacity: 1;
      transform: scale(1);
    }
  }
  svg {
    transition: transform ease-in 0.3s;
    transform: scale(1);
    &:last-of-type {
      height: 0;
      visibility: hidden;
      transform: scale(0.8);
    }
  }
`;

const Mouse: FC = () => {
  const {
    state: { footerIconName },
    dispatch,
  } = useContext(GlobalContext);
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isMobile = useMediaQuery(MobileMediaQuery);

  const handleTriangleClicked = () =>
    dispatch({
      carouselVisible: false,
      shouldResetHomePage: pathname === "/home",
      shouldResetCasePage: pathname === "/case",
    });

  useEffect(() => {
    if (!ref.current) return;
    if (footerIconName === FooterIconEnum.Default) {
      lottie.loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData,
      });
    }
  }, [ref, footerIconName]);

  if (footerIconName === FooterIconEnum.Triangle)
    return (
      <StyledCircleIcon onClick={handleTriangleClicked}>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="18" cy="18" r="17" stroke="white" strokeWidth="2" />
          <path
            d="M17.9931 12.8442L17.9931 24.849"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M24.0385 17.0886L17.9499 11L11.8613 17.0886"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36ZM17.9499 9.58594L24.7456 16.3816C25.1362 16.7722 25.1362 17.4053 24.7456 17.7959C24.3551 18.1864 23.722 18.1864 23.3314 17.7959L18.9929 13.4573V24.8495C18.9929 25.4018 18.5452 25.8495 17.9929 25.8495C17.4406 25.8495 16.9929 25.4018 16.9929 24.8495V13.3714L12.5684 17.7959C12.1779 18.1864 11.5447 18.1864 11.1542 17.7959C10.7637 17.4053 10.7637 16.7722 11.1542 16.3816L17.9499 9.58594Z"
            fill="white"
          />
        </svg>
      </StyledCircleIcon>
    );

  return <div ref={ref} style={{ display: isMobile ? "none" : "block" }} />;
};
export default Mouse;
