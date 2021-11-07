import React from "react";
import styled from "@emotion/styled";
import { TagType } from "../../../types";

interface CaseTagsProps {
  tags: TagType[] | undefined;
}

const StyledTagsWrapper = styled.p`
  height: 26rem;
  margin-bottom: 16rem;
  & > span {
    &:not(:last-of-type) {
      margin-right: 12rem;
    }
    display: inline-block;
    padding-left: 15rem;
    padding-right: 15rem;
    height: 26rem;
    line-height: 26rem;
    text-align: center;
    background: rgba(245, 245, 245, 0.2);
    mix-blend-mode: normal;
    border-radius: 1rem;
    font-size: 14rem;
  }
`;
const CaseTags: React.FC<CaseTagsProps> = ({ tags }) => {
  if (!tags) return null;
  return (
    <StyledTagsWrapper className={"tags-wrapper"}>
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </StyledTagsWrapper>
  );
};

export default CaseTags;
