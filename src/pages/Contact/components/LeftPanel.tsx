import { useContext } from "react";
import styled from "@emotion/styled";
import DataContext from "../../../contexts/DataContext";
import LocationList from "./LocationList";

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
    font-size: 56rem;
    line-height: 64rem;
    font-weight: 500;
    margin-bottom: 8rem;
  }
  .sub-title {
    font-weight: 300;
    font-size: 18rem;
    line-height: 27rem;
    margin-bottom: 97rem;
  }
`;
const LeftPanel = () => {
  const {
    contents: {
      contact: { title, subTitle, companyInfo },
    },
  } = useContext(DataContext);

  return (
    <StyledLeftPanel>
      <h2>{title}</h2>
      <p className={"sub-title"}>{subTitle}</p>
      <LocationList {...companyInfo} />
    </StyledLeftPanel>
  );
};

export default LeftPanel;
