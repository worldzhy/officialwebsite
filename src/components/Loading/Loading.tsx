import styled from "@emotion/styled";
import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useHistory, useLocation } from "react-router-dom";
import DataContext from "../../contexts/DataContext";

export interface LoadingProps {
  progress: number;
  visible: boolean;
}

const StyledLoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 80rem;
    height: 70rem;
    margin-bottom: 30rem;
  }
  .text {
    margin-top: 15rem;
    font-size: 12rem;
    line-height: 13rem;
  }
`;

const ProgressWrapper = styled(motion.div)`
  width: 248rem;
  height: 13rem;
  border: 1px solid white;
  .filling {
    background-color: white;
    height: 100%;
  }
`;

const Progress: React.FC<LoadingProps> = ({ progress }) => {
  return (
    <ProgressWrapper>
      <motion.div
        className={"filling"}
        initial={{ width: 0 }}
        animate={{
          width: `${progress}%`,
          transition: { delay: 0.2, duration: 0.5 },
        }}
      />
    </ProgressWrapper>
  );
};

const Loading: React.FC<LoadingProps> = ({ children, progress, visible }) => {
  const {
    headers: { logo },
  } = useContext(DataContext);
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (pathname === "/") {
      history.replace("/home");
    }
  }, [history, pathname]);
  return (
    <div>
      {children}
      {visible && (
        <StyledLoadingWrapper>
          <img src={logo} alt="" />
          <Progress progress={progress} visible={visible} />
          <div className={"text"}>Loading</div>
        </StyledLoadingWrapper>
      )}
    </div>
  );
};

export default Loading;
