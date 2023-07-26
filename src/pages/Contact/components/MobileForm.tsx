import { FC, useContext } from "react";
import styled from "@emotion/styled";
import RightPanel from "./RightPanel";
import LocationList from "./LocationList";
import DataContext from "../../../contexts/DataContext";

const StyledTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 65px;
  padding: 20px;
  h2 {
    font-family: Prompt;
    font-size: 32px;
    line-height: 64px;
    margin-bottom: 8px;
  }
  .sub-title {
    font-family: Prompt-Light;
    font-size: 18px;
    line-height: 20px;
  }
`;

const MobileForm: FC = () => {
  const {
    contents: {
      contact: { title, subTitle, companyInfo },
    },
  } = useContext(DataContext);

  return (
    <>
      <StyledTitle>
        <h2>{title}</h2>
        <p className={"sub-title"}>{subTitle}</p>
      </StyledTitle>
      <RightPanel />
      <LocationList {...companyInfo} />
    </>
  );
};

export default MobileForm;
