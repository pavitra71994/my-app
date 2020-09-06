import React, { Component } from "react";
const QuestionAnsObj = require("../apis/stub/QuestionAnswer.json");

class SidePanel extends Component {
  getQuestionFromList(quesNo: any, QuestionAnsObj: any) {
    let QuestionAnsData;
    {
      QuestionAnsObj.map((value: any) => {
        if (value.quesNo === quesNo) {
          QuestionAnsData = value;
        }
      });
    }
    return QuestionAnsData;
  }

  getResult(answeredQuesData: any) {
    let correctAnserSet: any = [];
    let counter = 0;
    let resultDataObj = {
      correctAns: 0,
      wrongAns: 0,
      unAnsweredQues: 0,
    };
    {
      QuestionAnsObj.questionAns.map((value: any) => {
        const ques = value.quesNo;
        let ans = "";
        value.ansList.map((ansObj: any) => {
          if (ansObj.isAnsTrue) {
            ans = ansObj.ans;
          }
        });
        if (answeredQuesData) {
          for (let [key, value] of answeredQuesData) {
            if (key === ques && value.ans === ans) {
              counter = counter + 1;
            }
          }
        }
      });
    }
    resultDataObj = {
      correctAns: counter,
      wrongAns: answeredQuesData.size - counter,
      unAnsweredQues:
        QuestionAnsObj.questionAns.length -
        (counter + (answeredQuesData.size - counter)),
    };
    return resultDataObj;
  }

  getSelectedAnswer(resultData: any, quesNo: any) {
    let selectedAns;
    console.log("ram" + resultData);
    if (resultData) {
      if (resultData.has(quesNo)) {
        selectedAns = resultData.get(quesNo);
        selectedAns = selectedAns.ans;
      }
    }

    return selectedAns;
  }

  getSelectedAnswerDivId(resultData: any, quesNo: any) {
    let selectedAnsDivId;
    if (resultData) {
      if (resultData.has(quesNo)) {
        selectedAnsDivId = resultData.get(quesNo);
        selectedAnsDivId = selectedAnsDivId.ansDiv;
      }
    }
    return selectedAnsDivId;
  }
}

export default SidePanel;
