import { FC } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import CloseIcon from "../Icons/CloseIcon";

type IProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  items: any[];
};

const StyledContainer = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  padding: 40px 0 0 40px;
  z-index: 999;
  background-color: #020202;
  color: white;
  .nav-item {
    position: relative;
    margin: 20px 0 20px 10px;
    line-height: 40px;
    font-size: 36px;
    font-family: Prompt;
    &::before {
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      top: 16px;
      left: -20px;
      border-radius: 50%;
      transition: all ease-out 0.3s;
      background: white;
    }
    &.inactive::before {
      visibility: hidden;
      opacity: 0;
    }
    &.active::before {
      opacity: 1;
      visibility: visible;
    }
  }
  .close-icon {
    position: absolute;
    bottom: 160px;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;

const NavModal: FC<IProps> = ({ open, setOpen, items }) => {
  const { pathname } = useLocation();
  const history = useHistory();

  const hanldeClick = (path: string) => {
    history.push(path);
    setOpen(false);
  };

  return (
    <StyledContainer open={open}>
      {items.map(({ label, path }) => (
        <div
          key={path}
          className={`nav-item ${pathname === path ? "active" : "inactive"}`}
          onClick={() => hanldeClick(path)}
        >
          {label}
        </div>
      ))}
      <CloseIcon
        width="36px"
        height="36px"
        className="close-icon"
        onClick={() => setOpen(false)}
      />
    </StyledContainer>
  );
};

export default NavModal;
