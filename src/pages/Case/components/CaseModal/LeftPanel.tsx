import React from "react";
import styled from "@emotion/styled";
import Close from "../../../../components/Icons/Close";

interface LeftPanelProps {
  onClose: () => void;
}

const StyledLeftPanel = styled.div`
  flex: 0;
  margin-left: 170rem;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  button {
    width: 17rem;
    height: 17rem;
    position: fixed;
    left: 150rem;
    bottom: 100rem;
  }
`;
const LeftPanel: React.FC<LeftPanelProps> = ({ onClose }) => {
  return (
    <StyledLeftPanel>
      <button onClick={onClose}>
        <Close />
      </button>
    </StyledLeftPanel>
  );
};

export default LeftPanel;
