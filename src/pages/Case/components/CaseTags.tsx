import styled from "@emotion/styled";
import { FC } from "react";
import { TagType } from "../../../types";
import { mobileMedia } from "../../../constants";

interface CaseTagsProps {
  tags: TagType[] | undefined;
}

const StyledTagsWrapper = styled.p`
  height: 26rem;
  margin-bottom: 16rem;
  ${mobileMedia} {
    height: 26px;
    margin-bottom: 16px;
  }
  & > span {
    &:not(:last-of-type) {
      margin-right: 10rem;
      ${mobileMedia} {
        margin-right: 10px;
      }
    }
    display: inline-block;
    height: 26rem;
    line-height: 26rem;
    padding-left: 10rem;
    padding-right: 10rem;
    border-radius: 1rem;
    font-size: 14rem;
    text-align: center;
    mix-blend-mode: normal;
    font-family: Prompt-Regular;
    background: rgba(245, 245, 245, 0.2);
    ${mobileMedia} {
      height: 26px;
      line-height: 26px;
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 1px;
      font-size: 14px;
    }
  }
`;
const CaseTags: FC<CaseTagsProps> = ({ tags }) => {
  if (!tags) return null;
  return (
    <StyledTagsWrapper className="tags-wrapper">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </StyledTagsWrapper>
  );
};

export default CaseTags;
