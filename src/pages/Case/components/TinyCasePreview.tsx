import React from "react";
import styled from "@emotion/styled";
import { CaseProps } from "../../../types";
import CaseTags from "./CaseTags";

type TinyCasePreviewProps = CaseProps & {
  onClick: () => void;
};

const StyledCaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  padding: 0 0 27rem 24rem;
  .title {
    margin: 7rem 0;
    font-size: 20rem;
    line-height: 30rem;
    font-weight: 500;
  }
  img {
    object-fit: cover;
  }
`;
const TinyCasePreview: React.FC<TinyCasePreviewProps> = ({
  thumbImage,
  title,
  tags,
  onClick,
}) => {
  return (
    <StyledCaseWrapper
      onClick={onClick}
      className={"tiny-preview-wrapper lg:w-1/3 md:w-1/2"}
    >
      <img src={thumbImage} alt="" />
      <p className={"title truncate"}>{title}</p>
      <CaseTags tags={tags} />
    </StyledCaseWrapper>
  );
};

export default TinyCasePreview;
