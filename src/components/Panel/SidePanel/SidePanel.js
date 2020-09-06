import React, { Component } from "react";
import QuestionCard from "../../Common/QuestionCard/QuestionCard";
import "./SidePanel.css";
import ApplicationHelper from "../../../util/ApplicationHelper";
import ResultCard from "../../Common/ResultCard/ResultCard";

class SidePanel extends Component {
  constructor(props) {
    super();
    this.ApplicationHelper = new ApplicationHelper();
    this.state = {
      openQuesCardFlag: false,
      quesNumber: 1,
      selectedDivIndex: "",
      resultData: new Map(),
      showResultPageFlag: false,
    };
    this.openQuestionCard = this.openQuestionCard.bind(this);
    this.deleteResultData = this.deleteResultData.bind(this);
    this.setResultData = this.setResultData.bind(this);
    this.showResultPage = this.showResultPage.bind(this);
    this.child = React.createRef();
  }

  setResultData(quesNo, ansObj) {
    this.state.resultData.set(quesNo, ansObj);
  }
  deleteResultData(quesNo) {
    this.state.resultData.delete(quesNo);
  }

  showResultPage(radioValue, quesNo) {
    this.setState({
      showResultPageFlag: true,
    });
  }
  render() {
    const QuestionAnsObj = this.props.data.QuestionAnsObj;
    console.log("ani" + QuestionAnsObj.questionAns.length);
    console.log("render" + this.state.quesNumber);
    let quesNoLook;

    return this.state.showResultPageFlag ? (
      <ResultCard
        data={{
          result: this.ApplicationHelper.getResult(this.state.resultData),
        }}
      />
    ) : (
      <div className="sidePanelContainer">
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
            resultData: this.state.resultData,
            showResultPage: this.state.showResultPage,
          }}
          changeQuesHandler={this.openQuestionCard}
          deleteResultData={this.deleteResultData}
          setResultData={this.setResultData}
          showResultPage={this.showResultPage}
          ref={this.child}
        />
        <div className="sidePanel">
          {QuestionAnsObj.questionAns.map((item) => (
            <div
              key={item.quesNo}
              id={item.quesNo}
              class="quesNo"
              className={this.toggleQuesClr(item.quesNo)}
              onClick={(e) => this.openQuestionCard(item.quesNo)}
            >
              {item.quesNo}
            </div>
          ))}
        </div>
      </div>
    );
  }

  toggleQuesClr(quesNo) {
    const sel = this.ApplicationHelper.getSelectedAnswer(
      this.state.resultData,
      quesNo
    );
    if (sel && sel !== null && sel !== "") {
      return "ansQuesNoLook";
    } else {
      return "unAnsQuesNoLook";
    }
  }

  openQuestionCard(quesNo) {
    if (this.state.selectedDivIndex) {
      // document.getElementById(
      //   this.state.selectedDivIndex
      // ).style.backgroundColor = "#3094c0";

      document.getElementById(this.state.selectedDivIndex).style.border = "";
    }

    this.setState({
      openQuesCardFlag: true,
      quesNumber: quesNo,
      selectedDivIndex: quesNo,
    });
    document.getElementById(quesNo).style.border = "2px solid black";
    //document.getElementById(quesNo).style.backgroundColor = "white";
  }
}

export default SidePanel;
