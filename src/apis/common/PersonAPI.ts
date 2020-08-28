import React, { Component } from "react";
const PersonResponse = require("../stub/profiledata.json");

class PersonAPI extends Component {
  getResults() {
    try {
      fetch("http://jsonplaceholder.typicode.com/users")
        .then((res) => {
          // return res.json();
          return PersonResponse;
        })
        .then((data) => {
          this.setState({ contacts: data });
        })
        .catch(console.log);
    } catch (e) {}
  }
}

export default PersonAPI;
