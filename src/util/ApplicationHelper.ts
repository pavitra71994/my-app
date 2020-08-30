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
        answeredQuesData.map((answrdObj: any) => {
          if (answrdObj.quesNo === ques && answrdObj.ans === ans) {
            counter = counter + 1;
          }
        });
      });
    }
    resultDataObj = {
      correctAns: counter,
      wrongAns: answeredQuesData.length - counter,
      unAnsweredQues:
        QuestionAnsObj.questionAns.length -
        (counter + (answeredQuesData.length - counter)),
    };
    return resultDataObj;
  }

  getSelectedAnswer(resultData: any, quesNo: any) {
    let selectedAns = "";
    resultData.map((value: any) => {
      if (value.quesNo === quesNo) {
        selectedAns = value.ans;
      }
    });
    return selectedAns;
  }

  getSelectedAnswerDivId(resultData: any, quesNo: any) {
    let selectedAnsDivId = "";
    resultData.map((value: any) => {
      if (value.quesNo === quesNo) {
        selectedAnsDivId = value.ansDiv;
      }
    });
    return selectedAnsDivId;
  }
}

export default SidePanel;
