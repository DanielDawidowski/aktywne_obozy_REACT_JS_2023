import React, { useState } from "react";
import PropTypes from "prop-types";
import Header from "@components/navs/header/Header";
import Navigation from "@components/navs/navigation/Navigation";
import "@components/layout/Layout.scss";
import Chat from "@components/chat/Chat";

const Layout = ({ children }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="layout">
      <Chat />
      <Header toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      <Navigation toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      <main>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
