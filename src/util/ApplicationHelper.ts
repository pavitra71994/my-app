import React, { Component } from "react";
// const QuestionAnsObj = require("../apis/stub/QuestionAnswer.json");

class SidePanel extends Component {
  getQuestionFromList(quesNo: any, QuestionAnsObj: any) {
    let QuestionAnsData;

    QuestionAnsObj.map((value: any) => {
      if (value.quesNo === quesNo) {
        QuestionAnsData = value;
      }
    });

    return QuestionAnsData;
  }

  async getResult(answeredQuesData: any) {
    let counter = 0;
    let resultDataObj = {
      correctAns: 0,
      wrongAns: 0,
      unAnsweredQues: 0,
      percentage: 0,
    };

    // const uri = "http://localhost:8080/quiz/v1/question";
    const uri = `https://secureroute-genericms.apps.ca-central-1.starter.openshift-online.com/quiz/v1/question`;

    // fetch(uri, {
    //   method: "get",
    //   headers: new Headers({
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     serviceType: "checkResult",
    //   }),
    // });
    const response = await fetch(uri, {
      method: "get",
      headers: new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        serviceType: "checkResult",
      }),
    });
    const res = await response.json();
    console.log("QUESTION>>>" + res.questionAns);
    res.questionAns.map((value: any) => {
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

    resultDataObj = {
      correctAns: counter,
      wrongAns: answeredQuesData.size - counter,
      unAnsweredQues:
        res.questionAns.length - (counter + (answeredQuesData.size - counter)),
      percentage: (counter / res.questionAns.length) * 100,
    };
    console.log("resultDataObj>>>" + JSON.stringify(resultDataObj));
    return resultDataObj;
  }

  getSelectedAnswer(resultData: any, quesNo: any) {
    let selectedAns;
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
