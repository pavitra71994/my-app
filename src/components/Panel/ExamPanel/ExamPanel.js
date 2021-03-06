import React, { Component } from "react";
import SidePanel from "../../Panel/SidePanel/SidePanel";
import ExamOverviewPanel from "../../Panel/ExamOverviewPanel/ExamOverviewPanel";
import PersonCard from "../../Common/PersonCard/PersonCard";
import LeftMenuBar from "../../Common/LeftMenuBar/LeftMenuBar";
import { Spinner } from "react-bootstrap";
import QuestionAPI from "../../../apis/common/QuestionAPI";
import "./ExamPanel.css";

class ExamPanel extends Component {
  constructor(props) {
    super(props);
    this.showExamOverview = this.showExamOverview.bind(this);
    this.deleteResultData = this.deleteResultData.bind(this);
    this.setResultData = this.setResultData.bind(this);
    this.showResultPage = this.showResultPage.bind(this);
    // this.progressBarHandler = this.progressBarHandler.bind(this);
    this.objQuestionAPI = new QuestionAPI();
    this.state = {
      showOverviewPage: false,
      resultData: new Map(),
      showResultPageFlag: false,
      progressBar: 0,
      loaded: false,
      questionData: [],
    };
  }

  setResultData(quesNo, ansObj) {
    console.log(this.state.resultData);
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
    // this.setInterval = setInterval(this.progressBarHandler, 100);
    // this.setState({
    //   questionData: this.objQuestionAPI.getResults(),
    // });
    // const uri = "http://localhost:8080/quiz/v1/question";
    const uri = `https://secureroute-genericms.apps.ca-central-1.starter.openshift-online.com/quiz/v1/question`;

    fetch(uri, {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        serviceType: "showQuestion",
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            questionData: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  // progressBarHandler() {
  //   this.setState((prevState) => ({
  //     progressBar: prevState.progressBar + 1,
  //   }));
  //   if (this.state.progressBar === 100) {
  //     clearInterval(this.setInterval);
  //     this.setState({
  //       loaded: true,
  //     });
  //   }
  // }
  render() {
    let QuestionAnsObj;
    if (this.state.questionData) {
      QuestionAnsObj = this.state.questionData;
    }
    // const QuestionAnsObj = require("../../../apis/stub/QuestionAnswer.json");

    return !this.state.isLoaded ? (
      <div className="spinnerPostion">
        <Spinner animation="grow" variant="danger" />
      </div>
    ) : (
      <div className="profilePageContainer">
        <div className="examCardContainer">
          <LeftMenuBar
            showExamOverviewHandler={this.showExamOverview}
            data={{ showOverviewPageFlag: this.state.showOverviewPage }}
          />

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
              <PersonCard
                data={{ personAuthData: this.props.data.personAuthData }}
              />
              <SidePanel
                data={{
                  QuestionAnsObj,
                  resultData: this.state.resultData,
                  showResultPageFlag: this.state.showResultPageFlag,
                  personAuthData: this.props.data.personAuthData,
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
