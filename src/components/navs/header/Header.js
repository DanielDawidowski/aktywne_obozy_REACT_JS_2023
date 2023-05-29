import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "@assets/Images/Logo.jpg";
import "@components/navs/header/Header.scss";
import Menu from "@components/navs/menu/Menu";
import Hamburger from "@components/navs/hamburger/Hamburger";

const Header = ({ toggleMenu, setToggleMenu }) => {
  return (
    <header className="header">
      <nav className="header__nav container">
        <div className="header__nav--logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="header__nav--menu">
          <Menu />
        </div>

        <Hamburger setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
      </nav>
    </header>
  );
};

Header.propTypes = {
  toggleMenu: PropTypes.bool,
  setToggleMenu: PropTypes.func
};

export default Header;
