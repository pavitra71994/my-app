import React, { Component } from "react";
import "./ResultCard.css";
import ReactPie from "../ReactPie/ReactPie";
import ApplicationHelper from "../../../util/ApplicationHelper";
import { Spinner } from "react-bootstrap";
import SendResultMailComp from "../SendResultMailComp";
const sendResultMailstub = require("../../../apis/stub/sendResultMailstub.json");

class ResultCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          <SendResultMailComp
            data={{
              correctAns: this.state.resultData.correctAns,
              wrongAns: this.state.resultData.wrongAns,
              unAnsweredQues: this.state.resultData.unAnsweredQues,
              percentage: this.state.resultData.percentage,
              personAuthData: this.props.data.personAuthData,
            }}
          />
        </div>
      </div>
    ) : (
      <div className="spinnerRsultContainer">
        <Spinner className="spinnerLook" animation="border" variant="success" />
        <div className="spinnerText">Calculating Result... Please Wait</div>
      </div>
    );
  }
}

export default ResultCard;
