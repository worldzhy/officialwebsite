import styled from "@emotion/styled";
import { FunctionComponent, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "usehooks-ts";
import { mobileMedia } from "../../constants";
import { enterAnimation } from "../../constants/animation";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import MobileForm from "./components/MobileForm";
import LoadingContext from "../../contexts/LoadingContext";

const StyledContainer = styled(motion.div)`
  position: absolute;
  display: flex;
  ${mobileMedia} {
    flex-direction: column;
  }
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  background-color: #000;
`;

const Contact: FunctionComponent = () => {
  const { visible, dispatchProgress, dispatchVisible } =
    useContext(LoadingContext);
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (visible) {
      dispatchProgress(100);
      dispatchVisible(false, 1000);
    }
  }, [dispatchProgress, dispatchVisible, visible]);

  const contentRender = isMobile ? (
    <MobileForm />
  ) : (
    <>
      <LeftPanel />
      <RightPanel />
    </>
  );

  return <StyledContainer {...enterAnimation}>{contentRender}</StyledContainer>;
};
export default Contact;
