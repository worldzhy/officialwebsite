import styled from "@emotion/styled";
import { FC, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import NavModal from "./NavModal";
import NavIcon from "../Icons/NavIcon";
import { mobileMedia } from "../../constants";
import CompanyLogo from "../Icons/CompanyLogo";
import { useDataContext } from "../../contexts/DataContext";
import Language from "../Icons/Language";
import LangModal from "./LangModal";

const StyledHeader = styled.header`
  display: flex;
  font-size: 18px;
  padding: 32rem 72rem;
  ${mobileMedia} {
    flex-direction: column;
  }
  & > nav {
    padding-top: 4rem;
  }
  & > div {
    justify-content: space-between;
  }
  & > div,
  & > nav {
    align-items: center;
    min-height: 40px;
    z-index: 10;
  }
  .header-left {
    .title-container {
      align-items: center;
    }
    .company-name {
      margin-top: 4px;
      margin-left: 10px;
      display: block;
      line-height: 21rem;
      font-size: 18px;
      font-family: Arial;
      ${mobileMedia} {
        font-size: 24px;
      }
    }
    .category {
      display: none;
      ${mobileMedia} {
        display: block;
        margin-right: 36px;
        cursor: pointer;
      }
    }
  }
  .nav-item {
    margin-right: 20rem;
    position: relative;
    margin-top: -1rem;
    line-height: 37rem;
    font-size: 18px;
    font-family: Prompt;
    &:not(last-of-type) {
      margin-right: 70px;
    }
    &::after {
      content: "";
      transition: all ease-out 0.3s;
      position: absolute;
      background: white;
      width: 4rem;
      left: 50%;
      height: 4rem;
      border-radius: 50%;
    }
    &.inactive::after {
      bottom: -20rem;
      visibility: hidden;
      opacity: 0;
    }
    &.active::after {
      bottom: -8rem;
      opacity: 1;
      visibility: visible;
    }
  }
`;
const StyleNavs = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16px;
  ${mobileMedia} {
    display: none;
  }
`;
const StyleLang = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  top: 0;
  right: 0;
  margin: 32rem 20px 0 0;
  cursor: pointer;
  ${mobileMedia} {
    width: 26px;
    height: 26px;
    margin-top: 14px;
    margin-right: 8px;
  }
`;

const Header: FC = () => {
  const {
    headers: { name, items },
  } = useDataContext();
  const { pathname } = useLocation();
  const history = useHistory();
  const [showNav, setShowNav] = useState(false);
  const [showLang, setShowLang] = useState(false);

  const handleLogoClicked = () => history.push("/home");
  const triggerCategory = () => setShowNav(!showNav);

  return (
    <>
      <StyledHeader className={" flex text-white space-between w-full text-lg"}>
        <div className={"flex-1 flex header-left space-between"}>
          <div
            className={
              "flex flex-initial aligns-center cursor-pointer title-container"
            }
            onClick={handleLogoClicked}
          >
            <CompanyLogo width="36px" height="36px" />
            <span className="company-name">{name}</span>
          </div>
          <NavIcon
            width={"18px"}
            height={"18px"}
            className="category"
            onClick={triggerCategory}
          />
        </div>
        <StyleNavs>
          <nav>
            {items.map(({ label, path }) => (
              <Link
                key={path}
                className={`nav-item ${
                  pathname === path ? "active" : "inactive"
                }`}
                to={path}
              >
                {label}
              </Link>
            ))}
          </nav>
        </StyleNavs>
        <StyleLang>
          <Language
            width="100%"
            height="auto"
            onClick={() => setShowLang(true)}
          />
        </StyleLang>
      </StyledHeader>
      <NavModal open={showNav} setOpen={setShowNav} items={items} />
      <LangModal open={showLang} setOpen={setShowLang} />
    </>
  );
};

export default Header;
