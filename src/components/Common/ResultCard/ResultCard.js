import React, { Component } from "react";
import "./ResultCard.css";

import ReactPie from "../ReactPie/ReactPie";

class ResultCard extends Component {
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
        </div>
      </div>
    );
  }
}

export default ResultCard;
