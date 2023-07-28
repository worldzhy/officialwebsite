import { FC } from "react";
import styled from "@emotion/styled";
import { CaseProps } from "../../../types";
import { mobileMedia } from "../../../constants";
import CaseTags from "./CaseTags";

type TinyCasePreviewProps = CaseProps & {
  onClick: () => void;
};

const StyledCaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  padding: 0 0 27rem 24rem;
  ${mobileMedia} {
    padding: 5px 10px;
  }
  .title {
    margin: 7rem 0;
    font-size: 20rem;
    line-height: 30rem;
    font-weight: 500;
    font-family: Prompt-Regular;
    ${mobileMedia} {
      margin: 7px 0;
      font-size: 20px;
      line-height: 30px;
    }
  }
  img {
    object-fit: cover;
  }
`;
const TinyCasePreview: FC<TinyCasePreviewProps> = ({
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
