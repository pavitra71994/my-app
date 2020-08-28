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
    return counter;
  }
}

export default SidePanel;
