import React from "react";
import PropTypes from "prop-types";
import Bag1 from "@assets/SVG/Icons/Bag1";
import Kayak1 from "@assets/SVG/Icons/Kayak1";
import Kayak2 from "@assets/SVG/Icons/Kayak2";
import Mountain1 from "@assets/SVG/Icons/Mountain1";
import Mountain2 from "@assets/SVG/Icons/Mountain2";
import Skies1 from "@assets/SVG/Icons/Skies1";
import Skies2 from "@assets/SVG/Icons/Skies2";
import Snowboard1 from "@assets/SVG/Icons/Snowboard1";
import Snowboard2 from "@assets/SVG/Icons/Snowboard2";
import LifeJacket from "@assets/SVG/Icons/LifeJacket";
import "@components/randomIcons/RandomIcons.scss";

const icons = [
  {
    id: 0,
    icon: <Bag1 />
  },
  {
    id: 1,
    icon: <Kayak1 />
  },
  {
    id: 2,
    icon: <Kayak2 />
  },
  {
    id: 3,
    icon: <Mountain1 />
  },
  {
    id: 4,
    icon: <Mountain2 />
  },
  {
    id: 5,
    icon: <Skies1 />
  },
  {
    id: 6,
    icon: <Skies2 />
  },
  {
    id: 7,
    icon: <Snowboard1 />
  },
  {
    id: 8,
    icon: <Snowboard2 />
  },
  {
    id: 9,
    icon: <LifeJacket />
  }
];

const RandomIcons = (props) => {
  const { grid = false, flex = false, wrap = false, size = "small", num = 0 } = props;

  const randomIcons = (arr, num) => {
    const random = arr.sort(() => 0.5 - Math.random());
    return random.slice(0, num).map((item) => (
      <div key={item.id} className="random__icons--item">
        {item.icon}
      </div>
    ));
  };

  const gridIcons = (num) => {
    const numGrid = num / 2;
    return grid ? numGrid : num;
  };

  return (
    <div
      className={`random__icons ${grid && "grid"} ${flex && "flex"}  ${wrap && "wrap"}  ${
        size === "small" && "small"
      } ${size === "big" && "big"}`}
      style={{
        gridTemplateColumns: `repeat(${gridIcons(num)}, 1fr)`,
        gridTemplateRows: `repeat(2, 1fr)`,
        gridRowGap: "3rem"
      }}
    >
      {randomIcons(icons, num)}
    </div>
  );
};

RandomIcons.propTypes = {
  grid: PropTypes.bool,
  flex: PropTypes.bool,
  wrap: PropTypes.bool,
  size: PropTypes.string,
  num: PropTypes.number
};

export default RandomIcons;
