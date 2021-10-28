import React from "react";
import styled from "@emotion/styled";
import { TagType } from "../../../types";

interface CaseTagsProps {
  tags: TagType[] | undefined;
}

const StyledTagsWrapper = styled.p`
  height: 26px;
  margin-top: 10px;
  margin-bottom: 14px;
  & > span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-width: 80px;
    background: rgba(245, 245, 245, 0.2);
    mix-blend-mode: normal;
    border-radius: 1px;
    font-size: 14px;
    margin-right: 10px;
  }
`;
const CaseTags: React.FC<CaseTagsProps> = ({ tags }) => {
  if (!tags) return null;
  return (
    <StyledTagsWrapper className={"tags-wrapper"}>
      {tags.map((tag) => (
        <span>{tag}</span>
      ))}
    </StyledTagsWrapper>
  );
};

export default CaseTags;
