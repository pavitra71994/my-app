import React, { Component } from "react";
import LeftMenuPanel from "../../Panel/LeftMenuPanel";
import "./LeftMenuBar.css";
import menuIcon from "../../../svgIcons/list.svg";
const lmenuOptionData = require("../../../apis/stub/menuOptionData.json");

class LeftMenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.modalShow = this.modalShow.bind(this);
    this.onHide = this.onHide.bind(this);
  }
  modalShow() {
    //$(".fade modal-backdrop show").css("opacity", "0.1");
    this.setState({
      show: true,
    });
  }

  onHide() {
    console.log("clicked");
    this.setState({
      show: false,
    });
  }
  render() {
    return (
      <div className="dekstopContainer">
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
        {this.state.show ? (
          <LeftMenuPanel show={this.modalShow} onHide={this.onHide}>
            <div className="menuPanelMobile">
              {lmenuOptionData.item.map((item) => (
                <div
                  key={item.data}
                  className="menuLookMobile"
                  onClick={() => this.handleClick(item.data)}
                >
                  {item.data}
                </div>
              ))}
            </div>
          </LeftMenuPanel>
        ) : (
          <div className="menuIconContainer">
            <img
              src={menuIcon}
              onClick={this.modalShow}
              className="menuIconLook"
            />
          </div>
        )}
      </div>
    );
  }
  handleClick(eventType) {
    if (eventType === "Exam Overview") {
      this.props.showExamOverviewHandler();
      if (this.props.data.showOverviewPageFlag) {
        this.onHide();
      }
    }
  }
}

export default LeftMenuBar;
