import React, { Component } from "react";
import "./Register.css";
import { Spinner } from "react-bootstrap";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistrationSuccess: false,
      displayMsg: "",
      isRegStarted: false,
      isRegEnded: false,
      validationCheckPassed: false,
      nameValidationPassed: false,
      emailValidationPassed: false,
      passwordValidationPassed: false,
    };
    this.registerHandler = this.registerHandler.bind(this);
    this.fnameHandler = this.fnameHandler.bind(this);
    this.lnameHandler = this.lnameHandler.bind(this);
    this.emailIdHandler = this.emailIdHandler.bind(this);
    this.passwordHandler = this.passwordHandler.bind(this);
    this.reEnterPasswordHandler = this.reEnterPasswordHandler.bind(this);
  }

  fnameHandler = (e) => {
    this.setState({ fname: e.target.value });
  };
  lnameHandler = (e) => {
    this.setState({ lname: e.target.value });
  };
  emailIdHandler = (e) => {
    this.setState({ emailId: e.target.value });
  };
  passwordHandler = (e) => {
    this.setState({ password: e.target.value });
  };
  reEnterPasswordHandler = (e) => {
    this.setState({ rpassword: e.target.value });
  };

  nameValidation() {
    if (
      this.state.fname &&
      this.state.lname &&
      this.state.fname.trim().length !== 0 &&
      this.state.lname.trim().length !== 0
    ) {
      this.setState({ nameValidationPassed: true });
    } else {
      this.setState({ nameValidationPassed: false });
    }
  }
  emailValidation() {
    if (this.state.emailId && this.state.emailId.trim().length !== 0) {
      this.setState({ emailValidationPassed: true });
    } else {
      this.setState({ emailValidationPassed: false });
    }
  }
  passwordValidation() {
    if (this.state.password === this.state.rpassword) {
      this.setState({ passwordValidationPassed: true });
    } else {
      this.setState({ passwordValidationPassed: false });
    }
  }

  async registerHandler() {
    this.setState({
      isRegStarted: true,
    });
    this.nameValidation();
    if (this.state.nameValidationPassed) {
      this.emailValidation();
    }
    if (this.state.emailValidationPassed) {
      this.passwordValidation();
    }

    if (
      this.state.nameValidationPassed &&
      this.state.emailValidationPassed &&
      this.state.passwordValidationPassed
    ) {
      this.setState({ validationCheckPassed: true });
    }
    if (this.state.validationCheckPassed) {
      const data = {
        firstName: this.state.fname,
        lastName: this.state.lname,
        emailId: this.state.emailId,
        password: this.state.password,
      };

      const uri = `https://secureroute-genericms.apps.ca-central-1.starter.openshift-online.com/common/v1/user`;
      try {
        const response = await fetch(uri, {
          method: "post",
          headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            rootuser: "ragnar",
          }),
          body: JSON.stringify(data),
        });
        const res = await response.json();
        if (res.objErrorDTO.errorCode === "201") {
          this.setState({
            isRegistrationSuccess: true,
            displayMsg: "Registration Success",
            isRegEnded: true,
          });
        } else {
          this.setState({
            isRegistrationSuccess: true,
            displayMsg: res.objErrorDTO.errorMsg,
            isRegEnded: true,
          });
        }
      } catch (e) {
        this.setState({
          isRegistrationSuccess: true,
          displayMsg: e,
          isRegEnded: true,
        });
      }
    }
  }
  render() {
    return (
      <div>
        <Modal
          {...this.props}
          aria-labelledby="contained-modal-title-vcenter"
          className="modalRegisterLook"
          backdropClassName="backdropClassName"
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid" className="modalBodyRegisterLook">
            <Form>
              <div className="registerNameLableLook">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.fname}
                    onChange={this.fnameHandler}
                  />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.lname}
                    onChange={this.lnameHandler}
                  />
                </Form.Group>
              </div>
              {!this.state.nameValidationPassed && this.state.isRegStarted ? (
                <div className="validationErrorLook">
                  Please Provide Proper Name
                </div>
              ) : (
                ""
              )}

              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email Id</Form.Label>
                <Form.Control
                  type="email"
                  value={this.state.emailId}
                  onChange={this.emailIdHandler}
                />
              </Form.Group>
              {!this.state.emailValidationPassed &&
              this.state.nameValidationPassed &&
              this.state.isRegStarted ? (
                <div className="validationErrorLook">
                  Please Provide EmailId
                </div>
              ) : (
                ""
              )}
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Enter Password</Form.Label>
                <Form.Control
                  type="password"
                  value={this.state.password}
                  onChange={this.passwordHandler}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={this.state.rpassword}
                  onChange={this.reEnterPasswordHandler}
                />
              </Form.Group>
              {!this.state.passwordValidationPassed &&
              this.state.emailValidationPassed &&
              this.state.isRegStarted ? (
                <div className="validationErrorLook">Password not matching</div>
              ) : (
                ""
              )}
              <div className="registerButtonContainer">
                <Button
                  className="registerButtonCss"
                  onClick={this.registerHandler}
                >
                  Register
                </Button>
                {this.state.validationCheckPassed &&
                this.state.isRegStarted &&
                !this.state.isRegEnded ? (
                  <Spinner
                    className="spinnerLook"
                    animation="border"
                    variant="success"
                  />
                ) : (
                  ""
                )}
                {this.state.isRegistrationSuccess ? (
                  <div>{this.state.displayMsg}</div>
                ) : (
                  ""
                )}
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Register;
