import React, { Component } from "react";
import SidePanel from "../../Panel/SidePanel/SidePanel";
import PersonCard from "../../Common/PersonCard/PersonCard";
import LeftMenuBar from "../../Common/LeftMenuBar/LeftMenuBar";
import "./ExamPanel.css";

class ExamPanel extends Component {
  render() {
    const QuestionAnsObj = require("../../../apis/stub/QuestionAnswer.json");
    return (
      <div className="profilePageContainer">
        <div className="examCardContainer">
          <LeftMenuBar />
          <div className="innerContainer">
            <PersonCard></PersonCard>
            <SidePanel data={{ QuestionAnsObj }} />
          </div>
        </div>
      </div>
    );
  }
}

export default ExamPanel;
