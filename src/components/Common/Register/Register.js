import React, { Component } from "react";
import "./Register.css";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";

class Register extends Component {
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
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </div>

              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email Id</Form.Label>
                <Form.Control type="email" placeholder="emailid" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Enter Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <div className="registerButtonContainer">
                <Button className="registerButtonCss">Register</Button>
              </div>

              {/* <Button
                className="registerCloseButtonCss"
                onClick={this.props.onHide}
              >
                Close
              </Button> */}
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Register;
