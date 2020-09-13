import React, { Component } from "react";
import axios from "axios";
const QuestionResponse = require("../stub/QuestionAnswer.json");

class QuestionAPI extends Component {
  async getResults() {
    let question;
    console.log("inside QuestionAPI");

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        asjdh: "hagdh",
      },
    };
    try {
      await fetch(
        "http://openjdk-app-exam-genericms.apps.ca-central-1.starter.openshift-online.com/question",
        {
          method: "get",
          headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          }),
        }
      ).then((res) => {
        return res.json();
        // return QuestionResponse;
      });
      //   axios
      //     .get(
      //       "http://openjdk-app-exam-genericms.apps.ca-central-1.starter.openshift-online.com/question",
      //       axiosConfig
      //     )
      //     .then((res) => {
      //       console.log("RESPONSE RECEIVED: ", res);
      //       return res;
      //       //       // return QuestionResponse;
      //     })
      //     .catch((err) => {
      //       console.log("AXIOS ERROR: ", err);
      //     })
      //     .catch(console.log);
    } catch (e) {}
  }
}

export default QuestionAPI;
