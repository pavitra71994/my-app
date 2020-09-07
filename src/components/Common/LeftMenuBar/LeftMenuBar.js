import React, { Component } from "react";
import "./LeftMenuBar.css";
const lmenuOptionData = require("../../../apis/stub/menuOptionData.json");

class LeftMenuBar extends Component {
  render() {
    return (
      <div className="menuPanel">
        {lmenuOptionData.item.map((item) => (
          <div
            key={item.data}
            className="menuLook"
            onClick={() => this.handleClick(item.data)}
          >
            {item.data}
          </div>
        ))}
      </div>
    );
  }
  handleClick(eventType) {
    if (eventType === "Exam Overview") {
      this.props.showExamOverviewHandler();
    }
  }
}

export default LeftMenuBar;
