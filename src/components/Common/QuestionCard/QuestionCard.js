import React, { Component } from "react";
import "./QuestionCard.css";
import ResultCard from "../../Common/ResultCard/ResultCard";
import ApplicationHelper from "../../../util/ApplicationHelper";

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.onRadioChange = this.onRadioChange.bind(this);
    this.createResultJsonData = this.createResultJsonData.bind(this);
    this.ApplicationHelper = new ApplicationHelper();
    this.state = {
      resultData: [],
      radio: null,
      showResultPageFlag: false,
      changeToPrevQflag: false,
      changeToNextQflag: false,
    };
  }

  render() {
    const QuestionAnsObj = this.props.data.QuestionAnsObj;
    return this.state.showResultPageFlag ? (
      <ResultCard
        data={{
          result: this.ApplicationHelper.getResult(this.state.resultData),
        }}
      />
    ) : (
      <div className="quesCardContainer">
        <div className="quesCard">
          <div className="quesLabel">{QuestionAnsObj.ques}</div>
          {QuestionAnsObj.ansList.map((ans) => (
            <div className="ansBoxLook" key={ans.ans}>
              <input
                type="radio"
                value={ans.ans}
                checked={this.state.radio === ans.ans}
                onClick={this.onRadioChange}
              ></input>
              {ans.ans}
            </div>
          ))}
        </div>
        {!this.props.data.isFirstQues ? (
          <button
            className="buttonLookL"
            onClick={() => {
              this.props.changeQuesHandler(this.props.data.quesNo - 1);
            }}
          >
            Back
          </button>
        ) : (
          ""
        )}
        {!this.props.data.isLastQues ? (
          <button
            className="buttonLookR"
            onClick={() =>
              this.createResultJsonData(
                this.state.radio,
                this.props.data.quesNo
              )
            }
          >
            Next
          </button>
        ) : (
          <button
            onClick={() =>
              this.showResultPage(this.state.radio, this.props.data.quesNo)
            }
          >
            Submit
          </button>
        )}
      </div>
    );
  }

  onRadioChange = (e) => {
    this.setState({
      radio: e.target.value,
    });
  };

  showResultPage(radioValue, quesNo) {
    this.setState({
      showResultPageFlag: true,
    });
    this.createResultJsonData(radioValue, quesNo);
  }

  createResultJsonData(ans, quesNo) {
    let ansObj = null;
    if (ans) {
      ansObj = {
        quesNo: quesNo,
        ans: ans,
      };
    }

    if (this.state.resultData) {
      this.state.resultData.map((value) => {
        if (value.quesNo === quesNo) {
          this.state.resultData.pop(ansObj);
        }
      });
      if (ansObj) {
        this.state.resultData.push(ansObj);
      }
    }

    console.log(this.state.resultData);
    if (!this.props.data.isLastQues) {
      this.props.changeQuesHandler(this.props.data.quesNo + 1);
    }
  }
}

export default QuestionCard;
