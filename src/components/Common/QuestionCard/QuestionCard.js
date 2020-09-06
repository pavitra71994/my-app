import React, { Component } from "react";
import "./QuestionCard.scss";
import Modal from "../Modal/ModalBox";
import ApplicationHelper from "../../../util/ApplicationHelper";
import { Button } from "react-bootstrap";
import TimerCard from "../../Common/TimerCard/TimerCard";

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.onRadioChange = this.onRadioChange.bind(this);
    this.createResultJsonData = this.createResultJsonData.bind(this);
    this.ApplicationHelper = new ApplicationHelper();
    this.showResultPage = this.showResultPage.bind(this);
    //this.countdownHandler = this.countdownHandler.bind(this);
    this.state = {
      radio: null,

      answerCounter: 0,
      questionNumber: null,
      selectedAnswer: null,
      show: false,
      //countdown: 60,
    };
  }

  componentDidMount() {
    this.setState({
      selectedAnswer: this.ApplicationHelper.getSelectedAnswer(
        this.props.data.resultData,
        this.props.data.quesNo
      ),
    });
  }

  render() {
    const QuestionAnsObj = this.props.data.QuestionAnsObj;
    const sel = this.ApplicationHelper.getSelectedAnswer(
      this.props.data.resultData,
      this.props.data.quesNo
    );

    return (
      <div className="quesCardContainer">
        <div className="quesCard">
          <div className="quesAnsCard">
            <div className="quesLabel">{QuestionAnsObj.ques}</div>
            <div className="ansBox">
              {QuestionAnsObj.ansList.map((ans) => (
                <button
                  className={
                    sel !== "" && sel === ans.ans
                      ? "skewBtn blue BtnBorder"
                      : "skewBtn blue"
                  }
                  key={ans.ans}
                  id={"ans" + ans.ans + this.props.data.quesNo}
                  onClick={this.onRadioChange}
                >
                  {/* <input
                  type="radio"
                  value={ans.ans}
                  checked={this.state.radio === ans.ans}
                ></input> */}
                  {ans.ans}
                </button>
              ))}
            </div>
          </div>
          <TimerCard timerHandler={this.showResultPage} />
        </div>
        <div className="buttonContainer">
          {!this.props.data.isFirstQues ? (
            <Button
              variant="secondary"
              size="lg"
              className="buttonLookL"
              onClick={() => {
                this.props.changeQuesHandler(this.props.data.quesNo - 1);
                this.setState({
                  radio: null,
                  selectedAnswer: this.ApplicationHelper.getSelectedAnswer(
                    this.props.data.resultData,
                    this.props.data.quesNo + 1
                  ),
                  questionNumber: this.props.data.quesNo,
                });
              }}
            >
              Back
            </Button>
          ) : (
            ""
          )}
          {!this.props.data.isLastQues ? (
            <Button
              variant="secondary"
              size="lg"
              className="buttonLookR"
              onClick={() =>
                this.createResultJsonData(
                  this.state.radio,
                  this.props.data.quesNo
                )
              }
            >
              Next
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="lg"
              className="buttonLookR"
              id="submit"
              onClick={() => this.showModal()}
            >
              Submit
            </Button>
          )}
        </div>
        {this.state.show ? (
          <Modal
            show={this.state.show}
            handleClose={this.hideModal}
            showPage={() =>
              this.showResultPage(this.state.radio, this.props.data.quesNo)
            }
          ></Modal>
        ) : (
          ""
        )}
      </div>
    );
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  onRadioChange = (e) => {
    console.log(e);

    if (
      this.state.radio !== e.target.innerHTML &&
      this.state.radio === null &&
      e.target.style.border === ""
    ) {
      const divId = this.ApplicationHelper.getSelectedAnswerDivId(
        this.props.data.resultData,
        this.props.data.quesNo
      );
      if (divId !== "" && divId) {
        document.getElementById(divId).style.border = "0px solid #1976d2";
      }
      document.getElementById(e.target.id).style.border = "2px solid #1976d2";
      this.setState({
        radio: e.target.innerHTML,
        answerCounter: e.target.id,
      });
    } else if (
      this.state.radio !== e.target.innerHTML &&
      e.target.style.border === ""
    ) {
      document.getElementById(this.state.answerCounter).style.border = "";
      document.getElementById(e.target.id).style.border = "2px solid #1976d2";
      this.setState({
        radio: e.target.innerHTML,
        answerCounter: e.target.id,
      });
    } else {
      document.getElementById(e.target.id).style.border = "";
      this.setState({
        radio: null,
      });
    }
  };

  showResultPage(radioValue, quesNo) {
    this.props.showResultPage();
    this.createResultJsonData(radioValue, quesNo);
  }

  createResultJsonData(ans, quesNo) {
    let ansObj = null;
    if (ans) {
      ansObj = {
        quesNo: quesNo,
        ans: ans,
        ansDiv: this.state.answerCounter,
      };
    }

    if (this.props.data.resultData) {
      if (this.props.data.resultData.has(quesNo) && ansObj) {
        this.props.deleteResultData(quesNo);
      }
      if (ansObj) {
        this.props.setResultData(quesNo, ansObj);
      }
    }

    console.log(this.props.data.resultData);
    if (!this.props.data.isLastQues) {
      this.props.changeQuesHandler(this.props.data.quesNo + 1);
    }

    this.setState({
      radio: null,
      selectedAnswer: this.ApplicationHelper.getSelectedAnswer(
        this.props.data.resultData,
        this.props.data.quesNo + 1
      ),
      questionNumber: this.props.data.quesNo,
    });
  }
}

export default QuestionCard;
