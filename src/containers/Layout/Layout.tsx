import React, { FunctionComponent } from "react";
import Header from "../../components/Header/Header";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <main>
      <Header />
      <section>{children}</section>
    </main>
  );
};

export default Layout;
