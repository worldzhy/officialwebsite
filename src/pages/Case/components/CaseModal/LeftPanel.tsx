import React from "react";
import styled from "@emotion/styled";

interface LeftPanelProps {
  onClose: () => void;
}

const StyledLeftPanel = styled.div`
  flex: 0;
  min-width: 90px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  button {
    width: 32px;
    height: 32px;
    margin-bottom: 50px;
  }
`;
const LeftPanel: React.FC<LeftPanelProps> = ({ onClose }) => {
  return (
    <StyledLeftPanel>
      <button onClick={onClose}>
        <img src={"/image/close.png"} alt="" />
      </button>
    </StyledLeftPanel>
  );
};

export default LeftPanel;
