import React, { Component } from "react";
import Cookies from "js-cookie";
import ExamPanel from "../../Panel/ExamPanel/ExamPanel";
import GlobalNav from "../../Common/GlobalNav/GlobalNav";
import LoginForm from "../../Common/LoginForm/LoginForm";
import Register from "../../Common/Register/Register";
import "./Login.css";
const PersonResponse = require("../../../apis/stub/profiledata.json");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      isLoaded: false,
      personAuthData: {},
      showRegistrationPageFlag: false,
      isLoginButtonClicked: false,
      displayMsg: "",
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.registerHandler = this.registerHandler.bind(this);
  }

  handleLogout() {
    const domain = window.location.hostname;
    const path = window.location.pathname;
    console.log(path + " >>>>" + domain);
    Cookies.remove("authCookie", {
      path: path,
      domain: domain,
    });
    console.log("inside handlelogout > login.js");
    console.log("cookie value > >" + Cookies.get("authCookie"));
    if (!Cookies.get("authCookie")) {
      console.log(
        "inside handlelogout > login.js >checking cookie after removing"
      );
      this.setState({ isAuth: false });
    }
  }

  registerHandler() {
    this.setState({
      showRegistrationPageFlag: true,
    });
    console.log("register");
  }

  async componentDidMount() {
    const cookieValue = Cookies.get("authCookie");
    if (cookieValue) {
      console.log("cookieValue" + cookieValue);
    }

    const uri =
      `https://secureroute-genericms.apps.ca-central-1.starter.openshift-online.com/common/v1/user/filter?` +
      "authCookie=" +
      cookieValue;
    try {
      const response = await fetch(uri, {
        method: "get",
        headers: new Headers({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          rootuser: "ragnar",
        }),
      });
      const res = await response.json();
      if (res.objErrorDTO.errorCode === "201") {
        this.setState({
          personAuthData: res,
          isAuth: true,
        });
      } else {
        this.setState({
          personAuthData: res,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <GlobalNav
          handleLogout={this.handleLogout}
          handleLogin={this.handleLogin}
        />
        {this.state.isAuth ? (
          <ExamPanel data={{ personAuthData: this.state.personAuthData }} />
        ) : !this.state.show ? (
          <div className="bkImg">
            <LoginForm
              loginHandler={this.handleLogin}
              registerHandler={this.modalShow}
              data={{
                isLoginButtonClicked: this.state.isLoginButtonClicked,
                displayMsg: this.state.displayMsg,
              }}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  async handleLogin(email, password) {
    this.setState({
      isLoginButtonClicked: true,
    });
    const domain = window.location.hostname;
    const path = window.location.pathname;
    // this.loginApiCallHandler(email, password);
    const uri =
      `https://secureroute-genericms.apps.ca-central-1.starter.openshift-online.com/common/v1/user/filter?` +
      "emailId=" +
      email +
      "&" +
      "password=" +
      password;
    try {
      const response = await fetch(uri, {
        method: "get",
        headers: new Headers({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          rootuser: "ragnar",
        }),
      });

      if (response.status === 200) {
        const res = await response.json();
        this.setState({
          personAuthData: res,
        });
      } else if (response.status === 204) {
        this.setState({
          isLoginButtonClicked: false,
          displayMsg: "Email not Registered",
        });
      }
    } catch (e) {
      console.log(e);
    }
    console.log("inserted");
    if (
      email &&
      password &&
      this.state.personAuthData &&
      this.state.personAuthData.objUser &&
      email === this.state.personAuthData.objUser[0].emailId &&
      password === this.state.personAuthData.objUser[0].password
    ) {
      Cookies.set(
        "authCookie",
        this.state.personAuthData.objUser[0].authToken,
        {
          expires: 3 / 96,
          path: path,
          domain: domain,
        }
      );
      this.setState({ isAuth: true });
    }
  }
}

export default Login;
