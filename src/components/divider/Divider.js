import React from "react";
import "@components/divider/Divider.scss";

function Divider() {
  return (
    <div className="divider">
      <div className="divider__left">
        <span></span>
      </div>
      <div className="divider__center">
        <span></span>
      </div>
      <div className="divider__right">
        <span></span>
      </div>
    </div>
  );
}

export default Divider;
