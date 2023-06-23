import React from "react";
import PropTypes from "prop-types";
import "@components/information/Information.scss";
import Pin from "@assets/SVG/Pin";

const Information = ({ children, location = false }) => {
  return (
    <div className="information">
      {location && (
        <div className="information__icon">
          <Pin />
        </div>
      )}
      <div className="information__body">{children}</div>
    </div>
  );
};

Information.propTypes = {
  children: PropTypes.node,
  location: PropTypes.bool
};

export default Information;
