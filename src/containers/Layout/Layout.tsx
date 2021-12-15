import React, { FunctionComponent, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const StyledMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Layout: FunctionComponent = ({ children }) => {
  const { pathname } = useLocation();
  const enableFooter = useMemo(() => {
    return pathname !== "/contact";
  }, [pathname]);
  return (
    <StyledMainContainer>
      <Header />
      <AnimatePresence exitBeforeEnter initial={false}>
        <section>{children}</section>
      </AnimatePresence>
      {enableFooter && <Footer />}
    </StyledMainContainer>
  );
};

export default Layout;
