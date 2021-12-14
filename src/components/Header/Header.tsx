import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Link, useHistory, useLocation } from "react-router-dom";
import DataContext from "../../contexts/DataContext";
import CompanyLogo from "../Icons/CompanyLogo";

const StyledHeader = styled.header`
  font-size: 15rem;
  padding: 20rem 72rem;
  & > nav {
    padding-top: 4rem;
  }
  & > div,
  & > nav {
    z-index: 10;
  }
  .header-left {
    cursor: pointer;
    .company-name {
      margin-top: 12rem;
      margin-left: 6rem;
      display: block;
      line-height: 21rem;
      font-size: 16rem;
      font-family: Arial;
    }
  }
  .nav-item {
    margin-right: 20rem;
    position: relative;
    margin-top: -1rem;
    line-height: 37rem;
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

const Header = () => {
  const {
    headers: { name, items },
  } = useContext(DataContext);

  const { pathname } = useLocation();
  const history = useHistory();

  const handleLogoClicked = () => {
    history.push("/home");
  };
  return (
    <StyledHeader
      className={"flex text-white space-between w-full text-lg"}
    >
      <div
        className={"flex flex-1 aligns-center header-left"}
        onClick={handleLogoClicked}
      >
        <CompanyLogo width={"44rem"} height={"37rem"} />
        <span className={"uppercase  company-name"}>{name}</span>
      </div>
      <nav className={""}>
        {items.map(({ label, path }) => {
          return (
            <Link
              key={path}
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
