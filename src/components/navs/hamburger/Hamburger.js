import React from "react";
import PropTypes from "prop-types";
import "@components/navs/hamburger/Hamburger.scss";

const Hamburger = ({ toggleMenu, setToggleMenu }) => {
  return (
    <div className="hamburger">
      <button onClick={() => setToggleMenu(!toggleMenu)}>
        <span></span>
        <span></span>
      </button>
    </div>
  );
};

Hamburger.propTypes = {
  toggleMenu: PropTypes.bool,
  setToggleMenu: PropTypes.func
};

export default Hamburger;
