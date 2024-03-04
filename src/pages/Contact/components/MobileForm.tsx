import { FC, useContext } from "react";
import styled from "@emotion/styled";
import RightPanel from "./RightPanel";
import LocationList from "./LocationList";
import { useDataContext } from "../../../contexts/DataContext";

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
    font-size: 18px;
    line-height: 20px;
    font-family: Prompt;
  }
`;

const MobileForm: FC = () => {
  const {
    contents: {
      contact: { title, subTitleMobile, companyInfo },
    },
  } = useDataContext();

  return (
    <>
      <StyledTitle>
        <h2>{title}</h2>
        <p className={"sub-title"}>{subTitleMobile}</p>
      </StyledTitle>
      <RightPanel />
      <LocationList {...companyInfo} />
    </>
  );
};

export default MobileForm;
