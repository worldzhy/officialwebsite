import styled from "@emotion/styled";
import { FunctionComponent, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import { enterAnimation } from "../../constants/animation";
import LoadingContext from "../../contexts/LoadingContext";

const StyledContainer = styled(motion.div)`
  color: white;
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
`;

const Contact: FunctionComponent = () => {
  const { visible, dispatchProgress, dispatchVisible } =
    useContext(LoadingContext);

  useEffect(() => {
    if (visible) {
      dispatchProgress(100);
      dispatchVisible(false, 1000);
    }
  }, [dispatchProgress, dispatchVisible, visible]);
  return (
    <StyledContainer {...enterAnimation}>
      <LeftPanel />
      <RightPanel />
    </StyledContainer>
  );
};
export default Contact;
