import React, { Component } from "react";
import SidePanel from "../../Panel/SidePanel/SidePanel";
import ExamOverviewPanel from "../../Panel/ExamOverviewPanel/ExamOverviewPanel";
import PersonCard from "../../Common/PersonCard/PersonCard";
import LeftMenuBar from "../../Common/LeftMenuBar/LeftMenuBar";
import { ProgressBar } from "react-bootstrap";
import "./ExamPanel.css";

class ExamPanel extends Component {
  constructor(props) {
    super(props);
    this.showExamOverview = this.showExamOverview.bind(this);
    this.deleteResultData = this.deleteResultData.bind(this);
    this.setResultData = this.setResultData.bind(this);
    this.showResultPage = this.showResultPage.bind(this);
    this.progressBarHandler = this.progressBarHandler.bind(this);
    this.state = {
      showOverviewPage: false,
      resultData: new Map(),
      showResultPageFlag: false,
      progressBar: 0,
      loaded: false,
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
      showOverviewPage: this.state.showResultPageFlag ? true : false,
    });
  }

  showResultPage() {
    this.setState({
      showResultPageFlag: true,
    });
  }
  componentDidMount() {
    this.setInterval = setInterval(this.progressBarHandler, 100);
  }

  progressBarHandler() {
    this.setState((prevState) => ({
      progressBar: prevState.progressBar + 1,
    }));
    if (this.state.progressBar === 100) {
      clearInterval(this.setInterval);
      this.setState({
        loaded: true,
      });
    }
  }
  render() {
    const QuestionAnsObj = require("../../../apis/stub/QuestionAnswer.json");

    return !this.state.loaded ? (
      <ProgressBar
        className="progressBar"
        animated
        now={this.state.progressBar}
        label={`${this.state.progressBar}%`}
      />
    ) : (
      <div className="profilePageContainer">
        <div className="examCardContainer">
          <LeftMenuBar showExamOverviewHandler={this.showExamOverview} />

          {this.state.showOverviewPage && this.state.showResultPageFlag ? (
            <div className="innerContainer">
              <ExamOverviewPanel
                data={{
                  resultData: this.state.resultData,
                }}
              />
            </div>
          ) : (
            <div className="innerContainer">
              <PersonCard></PersonCard>
              <SidePanel
                data={{
                  QuestionAnsObj,
                  resultData: this.state.resultData,
                  showResultPageFlag: this.state.showResultPageFlag,
                }}
                deleteResultData={this.deleteResultData}
                setResultData={this.setResultData}
                showResultPage={this.showResultPage}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ExamPanel;
