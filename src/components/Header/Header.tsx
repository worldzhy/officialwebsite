import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import DataContext from "../../contexts/DataContext";

const StyledHeader = styled.header`
  padding: 30px 72px;
  & > div,
  & > nav {
    z-index: 10;
  }
  .header-left {
    & > img {
      width: 44px;
    }
  }
  .nav-item {
    margin-right: 20px;
    position: relative;
    line-height: 20px;
    &:not(last-of-type) {
      margin-right: 70px;
    }
    &::after {
      content: "";
      transition: all ease-out 0.3s;
      position: absolute;
      background: white;
      width: 4px;
      left: 50%;
      height: 4px;
      border-radius: 50%;
    }
    &.inactive::after {
      bottom: -20px;
      visibility: hidden;
      opacity: 0;
    }
    &.active::after {
      bottom: -8px;
      opacity: 1;
      visibility: visible;
    }
  }
`;

const Header = () => {
  const {
    headers: { logo, name, items },
  } = useContext(DataContext);

  const { pathname } = useLocation();

  return (
    <StyledHeader
      className={"flex text-white space-between w-full text-lg font-bold"}
    >
      <div className={"flex flex-1 aligns-center header-left"}>
        <img className={""} src={logo} alt="company_logo" />
        <span className={"uppercase self-center"}>{name}</span>
      </div>
      <nav className={""}>
        {items.map(({ label, path }) => {
          return (
            <Link
              className={`nav-item ${
                pathname === path ? "active" : "inactive"
              }`}
              to={path}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </StyledHeader>
  );
};

export default Header;
