import React, { Component } from "react";
import "./ResultCard.css";
import ReactPie from "../ReactPie/ReactPie";
const sendResultMailstub = require("../../../apis/stub/sendResultMailstub.json");

class ResultCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMailSent: false,
      displayMsg: "Sending Mail...",
    };
  }
  componentDidMount() {
    const data = {
      correctAns: this.props.data.result.correctAns,
      incorrectAns: this.props.data.result.wrongAns,
      unattemptedQues: this.props.data.result.unAnsweredQues,
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
          isLoaded: true,
          displayMsg: "Email not Sent",
        });
      });
  }

  render() {
    const resultObj = [
      { name: "Correct", value: this.props.data.result.correctAns },
      { name: "Wrong", value: this.props.data.result.wrongAns },
      { name: "UnAnswered", value: this.props.data.result.unAnsweredQues },
    ];

    return (
      <div className="resultCard">
        <div className="resultBoxLook">
          <ReactPie data={{ resultObj }} />
        </div>
        <div className="passFailContainer">
          <div className="passFailLabel">Pass</div>
          <div className="emailLabel">{this.state.displayMsg}</div>
        </div>
      </div>
    );
  }
}

export default ResultCard;
