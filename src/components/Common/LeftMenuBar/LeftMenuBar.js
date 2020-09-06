import React, { Component } from "react";
import "./LeftMenuBar.css";
const lmenuOptionData = require("../../../apis/stub/menuOptionData.json");

class LeftMenuBar extends Component {
  render() {
    return (
      <div className="menuPanel">
        {lmenuOptionData.item.map((item) => (
          <div key={item.data} className="menuLook">
            {item.data}
          </div>
        ))}
      </div>
    );
  }
}

export default LeftMenuBar;
