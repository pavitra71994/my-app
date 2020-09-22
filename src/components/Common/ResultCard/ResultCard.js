import React, { Component } from "react";
import "./ResultCard.css";
import ReactPie from "../ReactPie/ReactPie";
import ApplicationHelper from "../../../util/ApplicationHelper";
import { Spinner } from "react-bootstrap";
const sendResultMailstub = require("../../../apis/stub/sendResultMailstub.json");

class ResultCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMailSent: false,
      displayMsg: "Sending Mail...",
      isloaded: false,
      resultData: {},
    };
    this.ApplicationHelper = new ApplicationHelper();
    this.initialise();
  }

  async initialise() {
    const resultValue = await this.ApplicationHelper.getResult(
      this.props.data.result
    );
    console.log("resultValue" + JSON.stringify(resultValue));
    this.setState({
      resultData: resultValue,
      isloaded: Object.keys(resultValue).length !== 0 ? true : false,
    });
  }
  componentDidMount() {
    const data = {
      correctAns: this.state.resultData.correctAns,
      incorrectAns: this.state.resultData.wrongAns,
      unattemptedQues: this.state.resultData.unAnsweredQues,
      result: "45%",
      objSendMailRequest: {
        toEmail: "pavitrank1@gmail.com",
        fromMail: "steelshootgaming@gmail.com",
        subjectLine: "Test Result",
      },
    };
    fetch(
      "https://secureroute-genericms.apps.ca-central-1.starter.openshift-online.com/quiz/v1/sendResultMail",
      {
        // mode: "no-cors",
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          rootuser: "ragnar",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => {
        // JSON data parsed by `data.json()` call
        res.json();
        // res = sendResultMailstub
        res.status === 201 || res.status === 200
          ? this.setState({
              isMailSent: true,
              displayMsg: "Email sent Sucessfully to the Registrated email Id",
            })
          : this.setState({
              isMailSent: false,
              displayMsg: "Internal Issue",
            });
      })
      .catch((error) => {
        console.error("Error:", error);
        this.setState({
          isMailSent: true,
          displayMsg: "Email not Sent",
        });
      });
  }

  render() {
    const resultObj = [
      { name: "Correct", value: this.state.resultData.correctAns },
      { name: "Wrong", value: this.state.resultData.wrongAns },
      { name: "UnAnswered", value: this.state.resultData.unAnsweredQues },
    ];

    return this.state.isloaded ? (
      <div className="resultCard">
        <div className="resultBoxLook">
          <ReactPie data={{ resultObj }} />
        </div>
        <div className="passFailContainer">
          <div className="passFailLabel">Pass</div>
          <div className="emailLabel">{this.state.displayMsg}</div>
        </div>
      </div>
    ) : (
      <div className="spinnerLook">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }
}

export default ResultCard;
