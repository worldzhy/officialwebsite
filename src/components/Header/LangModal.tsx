import { FC, useRef } from "react";
import styled from "@emotion/styled";
import { useOnClickOutside } from "usehooks-ts";
import { LangType, LanguageEnum } from "../../constants/Data";
import { useDataContext } from "../../contexts/DataContext";

type IProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const StyledContainer = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  width: 100px;
  height: auto;
  top: 72px;
  right: 20px;
  padding: 4px;
  border-radius: 4px;
  background-color: white;
  color: black;
  z-index: 999;
  .nav-item {
    position: relative;
    margin: 2px 0 2px 1px;
    line-height: 32px;
    font-size: 20px;
    font-family: Prompt;
    cursor: pointer;
  }
`;

const LangModal: FC<IProps> = ({ open, setOpen }) => {
  const ref = useRef(null);
  const { setLanguage } = useDataContext();

  const hanldeClick = (key: LangType) => {
    setLanguage(LanguageEnum[key]);
    setOpen(false);
  };

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <StyledContainer ref={ref} open={open}>
      {(Object.keys(LanguageEnum) as Array<LangType>).map((key: LangType) => (
        <div key={key} className="nav-item" onClick={() => hanldeClick(key)}>
          {LanguageEnum[key]}
        </div>
      ))}
    </StyledContainer>
  );
};

export default LangModal;
