import React, { useContext, useEffect, useRef } from "react";
import lottie from "lottie-web";
import styled from "@emotion/styled";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import animationData from "../../animations/footer_button.json";
import GlobalContext, { FooterIconEnum } from "../../contexts/GlobalContext";

const StyledTriangle = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  svg:last-of-type {
    align-self: center;
    transform: translateY(-25rem);
  }
`;

const Mouse = () => {
  const {
    state: { footerIconName },
    dispatch,
  } = useContext(GlobalContext);
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const handleTriangleClicked = () => {
    console.log(
      {
        carouselVisible: false,
        shouldResetHomePage: pathname === "/home",
        shouldResetCasePage: pathname === "/case",
      },
      pathname
    );
    dispatch({
      carouselVisible: false,
      shouldResetHomePage: pathname === "/home",
      shouldResetCasePage: pathname === "/case",
    });
  };
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
      <StyledTriangle onClick={handleTriangleClicked}>
        <svg
          width="46"
          height="41"
          viewBox="0 0 46 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.78153 39.2504L23 2.49902L44.2184 39.2504H1.78153Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.1677 9.6791L9.94738 0.789062L5.71891 9.69623L9.94773 8.46967L14.1677 9.6791ZM5.71126 9.71294L5.15407 10.8866L9.93965 11.8467L14.7252 10.8866L14.1599 9.69587L19.9896 11.3666L9.9399 13.2868L0.00982666 11.3666L5.71126 9.71294ZM9.99977 17.6075L9.99987 17.6074L10 17.6075V17.6072L13.8282 13.2872L9.9998 14.2472L6.17156 13.2872L9.99977 17.6072V17.6075Z"
            fill="white"
          />
        </svg>
      </StyledTriangle>
    );
  return <div ref={ref} id={"lottie-footer-button"} />;
};
export default Mouse;
