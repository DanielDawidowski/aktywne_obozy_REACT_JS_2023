import React, { useState } from "react";
import PropTypes from "prop-types";
import Header from "@components/navs/header/Header";
import Navigation from "@components/navs/navigation/Navigation";

const Layout = ({ children }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <>
      <Header toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      <Navigation toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      <main>{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
