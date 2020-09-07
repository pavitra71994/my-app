import React, { Component } from "react";
import "./OverviewQuestionCard.css";
import tickIcon from "../../../svgIcons/check.svg";
import errorIcon from "../../../svgIcons/error.svg";
import notAnsIcon from "../../../svgIcons/rec.svg";
import ApplicationHelper from "../../../util/ApplicationHelper";

class OverviewQuestionCard extends Component {
  constructor(props) {
    super(props);
    this.ApplicationHelper = new ApplicationHelper();
  }
  render() {
    const selectedAns = this.ApplicationHelper.getSelectedAnswer(
      this.props.data.resultData,
      this.props.data.ques.quesNo
    );
    return (
      <div className="OverQuesCardBox">
        <div className="OverQuesCardQuesLabel">{this.props.data.ques.ques}</div>
        <div className="OverQuesCardAnsBox">
          {this.props.data.ques.ansList.map((item) => (
            <div key={item.ans} id={item.ans} className="OverQuesCardAnsLabel">
              {item.isAnsTrue ? (
                <img className="tickIcon" src={tickIcon}></img>
              ) : selectedAns === item.ans ? (
                <img className="tickIcon" src={errorIcon}></img>
              ) : (
                <img className="tickIcon" src={notAnsIcon}></img>
              )}
              {item.ans}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default OverviewQuestionCard;
