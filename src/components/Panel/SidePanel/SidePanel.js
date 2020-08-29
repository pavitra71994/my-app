import React, { Component } from "react";
import QuestionCard from "../../Common/QuestionCard/QuestionCard";
import "./SidePanel.css";
import ApplicationHelper from "../../../util/ApplicationHelper";
class SidePanel extends Component {
  constructor(props) {
    super();
    this.ApplicationHelper = new ApplicationHelper();
    this.state = {
      openQuesCardFlag: false,
      quesNumber: 1,
      selectedDivIndex: "",
    };
    this.openQuestionCard = this.openQuestionCard.bind(this);
  }
  render() {
    const QuestionAnsObj = this.props.data.QuestionAnsObj;
    console.log("ani" + QuestionAnsObj.questionAns.length);
    console.log("render" + this.state.quesNumber);
    return (
      <div className="sidePanelContainer">
        <div className="sidePanel">
          {QuestionAnsObj.questionAns.map((item) => (
            <div
              key={item.quesNo}
              id={item.quesNo}
              class="quesNoLook"
              className="quesNoLook"
              onClick={(e) => this.openQuestionCard(item.quesNo)}
            >
              {item.quesNo}
            </div>
          ))}
        </div>
        <QuestionCard
          data={{
            QuestionAnsObj: this.ApplicationHelper.getQuestionFromList(
              this.state.quesNumber,
              QuestionAnsObj.questionAns
            ),
            quesNo: this.state.quesNumber,
            isLastQues:
              QuestionAnsObj.questionAns.length === this.state.quesNumber
                ? true
                : false,
            isFirstQues: this.state.quesNumber === 1 ? true : false,
          }}
          changeQuesHandler={this.openQuestionCard}
        />
      </div>
    );
  }

  openQuestionCard(quesNo) {
    if (this.state.selectedDivIndex) {
      document.getElementById(
        this.state.selectedDivIndex
      ).style.backgroundColor = "#3094c0";
    }

    this.setState({
      openQuesCardFlag: true,
      quesNumber: quesNo,
      selectedDivIndex: quesNo,
    });
    document.getElementById(quesNo).style.backgroundColor = "white";
  }
}

export default SidePanel;
