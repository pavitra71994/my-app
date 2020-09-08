import React, { Component } from "react";
import "./OverviewQuestionCard.css";
import tickIcon from "../../../svgIcons/check.svg";
import errorIcon from "../../../svgIcons/error.svg";
import notAnsIcon from "../../../svgIcons/rec.svg";
import answeredIcon from "../../../svgIcons/answered.svg";
import ApplicationHelper from "../../../util/ApplicationHelper";
import { Spinner } from "react-bootstrap";

class OverviewQuestionCard extends Component {
  constructor(props) {
    super(props);
    this.ApplicationHelper = new ApplicationHelper();
    this.progressBarHandler = this.progressBarHandler.bind(this);
    this.state = {
      loaded: false,
      progressBar: 0,
    };
  }

  componentDidMount() {
    this.setInterval = setInterval(this.progressBarHandler, 100);
  }

  progressBarHandler() {
    this.setState((prevState) => ({
      progressBar: prevState.progressBar + 1,
    }));
    if (this.state.progressBar === 5) {
      clearInterval(this.setInterval);
      this.setState({
        loaded: true,
      });
    }
  }
  render() {
    const selectedAns = this.ApplicationHelper.getSelectedAnswer(
      this.props.data.resultData,
      this.props.data.ques.quesNo
    );
    return !this.state.loaded ? (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    ) : (
      <div className="OverQuesCardBox">
        <div className="OverQuesCardQuesLabel">
          {this.props.data.ques.ques}
          {selectedAns ? (
            <img className="ansUnansBoxLook" src={notAnsIcon}></img>
          ) : (
            <img className="ansUnansBoxLook" src={answeredIcon}></img>
          )}
        </div>
        <div className="OverQuesCardAnsBox">
          {this.props.data.ques.ansList.map((item) => (
            <div key={item.ans} id={item.ans} className="OverQuesCardAnsLabel">
              {item.isAnsTrue ? (
                <img className="tickIcon" src={tickIcon}></img>
              ) : selectedAns === item.ans ? (
                <img className="tickIcon" src={errorIcon}></img>
              ) : (
                <div className="tickIcon"></div>
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
