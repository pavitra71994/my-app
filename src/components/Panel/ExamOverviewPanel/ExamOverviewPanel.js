import React, { Component } from "react";
import "./ExamOverviewPanel.css";
import OverviewQuestionCard from "../../Common/OverviewQuestionCard/OverviewQuestionCard";

class ExamOverviewPanel extends Component {
  render() {
    const QuestionAnsObj = require("../../../apis/stub/QuestionAnswer.json");
    return (
      <div className="ExamOverViewPanelContainer">
        {QuestionAnsObj.questionAns.map((item) => (
          <div key={item.quesNo} id={item.quesNo}>
            <OverviewQuestionCard
              data={{ ques: item, resultData: this.props.data.resultData }}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default ExamOverviewPanel;
