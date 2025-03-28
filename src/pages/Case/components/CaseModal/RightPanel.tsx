import { FC } from "react";
import styled from "@emotion/styled";

const StyledRightPanel = styled.div`
  margin-top: 44rem;
  flex: 1;
  max-height: 100%;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 100px;
`;

const RightPanel: FC = ({ children }) => {
  return (
    <StyledRightPanel
      onScroll={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {children}
    </StyledRightPanel>
  );
};

export default RightPanel;
