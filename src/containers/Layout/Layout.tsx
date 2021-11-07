import React, { FunctionComponent, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Layout: FunctionComponent = ({ children }) => {
  const { pathname } = useLocation();
  const enableFooter = useMemo(() => {
    return pathname !== "/contact";
  }, [pathname]);
  return (
    <main>
      <Header />
      <AnimatePresence exitBeforeEnter initial={false}>
        <section>{children}</section>
      </AnimatePresence>
      {enableFooter && <Footer />}
    </main>
  );
};

export default Layout;
