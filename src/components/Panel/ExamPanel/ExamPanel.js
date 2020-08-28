import React, { Component } from "react";
import SidePanel from "../../Panel/SidePanel/SidePanel";
import "./ExamPanel.css";

class ExamPanel extends Component {
  render() {
    const QuestionAnsObj = require("../../../apis/stub/QuestionAnswer.json");
    return (
      <div className="examCardContainer">
        <SidePanel data={{ QuestionAnsObj }} />
      </div>
    );
  }
}

export default ExamPanel;
