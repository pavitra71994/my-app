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
      radio: "",
      showResultPageFlag: false,
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
          <h1>{QuestionAnsObj.ques}</h1>
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
        {!this.props.data.isLastQues ? (
          <button
            onClick={() =>
              this.createResultJsonData(
                this.state.radio,
                this.props.data.quesNo
              )
            }
          >
            Submit
          </button>
        ) : (
          <button onClick={() => this.showResultPage()}>Submit</button>
        )}
      </div>
    );
  }

  onRadioChange = (e) => {
    this.setState({
      radio: e.target.value,
    });
  };

  showResultPage() {
    this.setState({
      showResultPageFlag: true,
    });
  }

  createResultJsonData(ans, quesNo) {
    const ansObj = {
      quesNo: quesNo,
      ans: ans,
    };
    this.state.resultData.push(ansObj);
    console.log(this.state.resultData);
  }
}

export default QuestionCard;
