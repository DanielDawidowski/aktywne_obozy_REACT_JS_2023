import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import Hamburger from "@components/navs/hamburger/Hamburger";
import { Link } from "react-router-dom";
import Logo from "@assets/Images/Logo.jpg";
import "@components/navs/navigation/Navigation.scss";
import Menu from "../menu/Menu";

const Navigation = ({ toggleMenu, setToggleMenu }) => {
  return (
    <AnimatePresence>
      {toggleMenu && (
        <>
          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: toggleMenu ? 0 : "-100%" }}
            transition={{
              duration: 0.5,
              ease: [0.6, 0.05, -0.01, 0.9]
            }}
            exit={{ x: "-100%" }}
            className="navigation"
          >
            <div className="navigation__header">
              <Link to="/">
                <img src={Logo} alt="logo" />
              </Link>
              <Hamburger setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
            </div>
            <div className="navigation__content">
              <div className="navigation__content--inner">
                <Menu />
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

Navigation.propTypes = {
  toggleMenu: PropTypes.bool,
  setToggleMenu: PropTypes.func
};

export default Navigation;
