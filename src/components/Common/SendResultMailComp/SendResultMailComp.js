import React, { Component } from "react";

class SendResultMailComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMailSent: false,
      displayMsg: "Sending Mail...",
    };
  }

  calculateResultLabel() {
    const resultLabel = this.props.data.percentage > 70 ? "Passed" : "Failed";
    return resultLabel;
  }
  componentDidMount() {
    const data = {
      correctAns: this.props.data.correctAns,
      incorrectAns: this.props.data.wrongAns,
      unattemptedQues: this.props.data.unAnsweredQues,
      result: this.calculateResultLabel(),
      objSendMailRequest: {
        toEmail: this.props.data.personAuthData.objUser[0].emailId,
        fromMail: "steelshootgaming@gmail.com",
        subjectLine: "Test Result",
      },
    };
    try {
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
                displayMsg:
                  "Email sent Sucessfully to the Registrated email Id",
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
    } catch (e) {
      this.setState({
        isMailSent: true,
        displayMsg: "Email not Sent",
      });
    }
  }
  render() {
    return (
      <div>
        <div className="passFailLabel">
          {this.calculateResultLabel()} : {this.props.data.percentage}%
        </div>
        <div className="emailLabel">{this.state.displayMsg}</div>
      </div>
    );
  }
}

export default SendResultMailComp;
