import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";

interface CaseModalProps {
  visible: boolean;
}

const StyledModal = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: black;
  z-index: 11;
  color: white;
`;

const StyledModalContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px 48px 0 40px;
  display: flex;
`;

const CaseModal: FunctionComponent<CaseModalProps> = ({
  visible,
  children,
}) => {
  return (
    <StyledModal
      id={"modal"}
      style={{
        width: visible ? "100%" : "500px",
        height: visible ? "100%" : "500px",
        borderRadius: visible ? 0 : "50%",
        transform: visible ? "translate(0,0)" : "translate(-100%, 100%)",
        visibility: visible ? "visible" : "hidden",
        opacity: visible ? 1 : 0,
        transition: "all ease-in-out .3s",
      }}
    >
      <StyledModalContainer>{children}</StyledModalContainer>
    </StyledModal>
  );
};

export default CaseModal;
