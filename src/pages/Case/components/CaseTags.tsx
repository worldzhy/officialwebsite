import styled from "@emotion/styled";
import { FC } from "react";
import { TagType } from "../../../types";
import { mobileMedia } from "../../../constants";

interface CaseTagsProps {
  tags: TagType[] | undefined;
}

const StyledTagsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16rem;
  padding: 2rem 4rem;
  ${mobileMedia} {
    margin-bottom: 16px;
  }
  & > div {
    &:not(:last-of-type) {
      margin-right: 20rem;
      ${mobileMedia} {
        margin-right: 20px;
      }
    }
    display: inline-block;
    line-height: 26rem;
    padding: 6rem 12rem;
    border-radius: 1rem;
    font-size: 14rem;
    text-align: center;
    mix-blend-mode: normal;
    font-family: Prompt-Regular;
    background: rgba(245, 245, 245, 0.2);
    ${mobileMedia} {
      line-height: 26px;
      padding: 6px 12px;
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
        <div key={tag}>{tag}</div>
      ))}
    </StyledTagsWrapper>
  );
};

export default CaseTags;
