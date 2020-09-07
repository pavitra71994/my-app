import React, { Component } from "react";
import SidePanel from "../../Panel/SidePanel/SidePanel";
import ExamOverviewPanel from "../../Panel/ExamOverviewPanel/ExamOverviewPanel";
import PersonCard from "../../Common/PersonCard/PersonCard";
import LeftMenuBar from "../../Common/LeftMenuBar/LeftMenuBar";
import "./ExamPanel.css";

class ExamPanel extends Component {
  constructor(props) {
    super(props);
    this.showExamOverview = this.showExamOverview.bind(this);
    this.deleteResultData = this.deleteResultData.bind(this);
    this.setResultData = this.setResultData.bind(this);
    this.state = {
      showOverviewPage: false,
      resultData: new Map(),
    };
  }

  setResultData(quesNo, ansObj) {
    this.state.resultData.set(quesNo, ansObj);
  }
  deleteResultData(quesNo) {
    this.state.resultData.delete(quesNo);
  }

  showExamOverview() {
    this.setState({
      showOverviewPage: true,
    });
  }
  render() {
    const QuestionAnsObj = require("../../../apis/stub/QuestionAnswer.json");
    return (
      <div className="profilePageContainer">
        <div className="examCardContainer">
          <LeftMenuBar showExamOverviewHandler={this.showExamOverview} />

          {!this.state.showOverviewPage ? (
            <div className="innerContainer">
              <PersonCard></PersonCard>
              <SidePanel
                data={{ QuestionAnsObj, resultData: this.state.resultData }}
                deleteResultData={this.deleteResultData}
                setResultData={this.setResultData}
              />
            </div>
          ) : (
            <div className="innerContainer">
              <ExamOverviewPanel data={{ resultData: this.state.resultData }} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ExamPanel;
