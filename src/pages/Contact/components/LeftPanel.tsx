import styled from "@emotion/styled";
import { FC, useContext } from "react";
import LocationList from "./LocationList";
import { useDataContext } from "../../../contexts/DataContext";

const StyledLeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 85rem;
  margin-left: 150rem;
  width: 500rem;
  overflow-y: auto;
  padding-top: 100rem;
  padding-bottom: 90rem;
  h2 {
    font-family: Prompt;
    font-size: 56rem;
    line-height: 64rem;
    margin-bottom: 8rem;
  }
  .sub-title {
    font-size: 18rem;
    line-height: 27rem;
    margin-bottom: 97rem;
    font-family: Prompt;
  }
`;
const LeftPanel: FC = () => {
  const {
    contents: {
      contact: { title, subTitle, companyInfo },
    },
  } = useDataContext();

  return (
    <StyledLeftPanel>
      <h2>{title}</h2>
      <p className={"sub-title"}>{subTitle}</p>
      <LocationList {...companyInfo} />
    </StyledLeftPanel>
  );
};

export default LeftPanel;
