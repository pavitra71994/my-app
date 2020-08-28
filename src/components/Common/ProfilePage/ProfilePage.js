import React, { Component } from "react";
import ContactUs from "../ContactUs/ContactUs";
import "../ProfilePage/ProfilePage.css";
import ExamPanel from "../../Panel/ExamPanel/ExamPanel";

class ProfilePage extends Component {
  constructor(props) {
    super();
    this.state = {
      openAllUserFlag: false,
      viewSingleUserFalg: false,
    };
    this.openSingleUsers = this.openSingleUsers.bind(this);
    this.openAllUsers = this.openAllUsers.bind(this);
  }
  render() {
    return (
      <div className="profilePageContainer">
        <button onClick={this.openAllUsers}>View All Users</button>
        <button onClick={this.openSingleUsers}>Search Users</button>
        {this.state.openAllUserFlag ? <ExamPanel /> : ""}
        {this.state.viewSingleUserFalg ? <ContactUs /> : ""}
      </div>
    );
  }

  openAllUsers() {
    console.log("write");
    this.setState({
      openAllUserFlag: true,
      viewSingleUserFalg: false,
    });
  }

  openSingleUsers() {
    this.setState({
      openAllUserFlag: false,
      viewSingleUserFalg: true,
    });
  }
}

export default ProfilePage;
