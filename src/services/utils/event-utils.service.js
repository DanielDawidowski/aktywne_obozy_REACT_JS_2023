import BagSVG from "@assets/SVG/bag.svg";
import KayakSVG from "@assets/SVG/kayak.svg";
import MountainSVG from "@assets/SVG/mountains.svg";
import CrabSVG from "@assets/SVG/crab.svg";

export const Icons = [
  {
    id: 0,
    name: "Góry",
    icon: MountainSVG,
    color: "#90be6d"
  },
  {
    id: 1,
    name: "Spływy",
    icon: KayakSVG,
    color: "#50b5ff"
  },
  {
    id: 2,
    name: "Półkolonie",
    icon: BagSVG,
    color: "#f7b124"
  },
  {
    id: 3,
    name: "Morze",
    icon: CrabSVG,
    color: "#277da1"
  }
];

export class EventUtils {
  static showEventIcon(type) {
    const obj = [];
    for (let i = 0; i < Icons.length; i++) {
      if (Icons[i].name === type) {
        obj.push(Icons[i].icon);
      }
    }
    return obj[0];
  }

  static showEventColor(type) {
    const obj = [];
    for (let i = 0; i < Icons.length; i++) {
      if (Icons[i].name === type) {
        obj.push(Icons[i].color);
      }
    }
    return obj[0];
  }

  static showAddress(addresa) {
    let match = "";
    const regex = /:(.*?),/g;
    const matches = [];
    const address = JSON.stringify(addresa);

    const removeBracers = address && address.replace(/['"]+/g, "").replace(/[{}]/g, "").replace(/,/g, ", ") + ",";
    while ((match = regex.exec(removeBracers))) {
      matches.push(match[1].trim());
    }
    return (
      <div>
        <h3>{matches[0]}</h3>
        <h3>{matches[1]}</h3>
        <h3>{matches[2]}</h3>
      </div>
    );
  }

  static readAsBase64(file) {
    const reader = new FileReader();
    const fileValue = new Promise((resolve, reject) => {
      reader.addEventListener("load", () => {
        resolve(reader.result);
      });

      reader.addEventListener("error", (event) => {
        reject(event);
      });

      reader.readAsDataURL(file);
    });
    return fileValue;
  }
}
