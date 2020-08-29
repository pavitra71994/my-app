import React, { Component } from "react";

class ResultCard extends Component {
  render() {
    console.log(this.props.data.result);
    return (
      <div>
        <div>Correct :: {this.props.data.result.correctAns}</div>
        <div>Wrong :: {this.props.data.result.wrongAns}</div>
        <div>UnAnswered :: {this.props.data.result.unAnsweredQues}</div>
      </div>
    );
  }
}

export default ResultCard;
