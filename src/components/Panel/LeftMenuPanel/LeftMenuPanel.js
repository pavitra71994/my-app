import React, { Component } from "react";
import { Modal, Container, Button } from "react-bootstrap";
import "./LeftMenuPanel.css";

class LeftMenuPanel extends Component {
  render() {
    return (
      <div>
        <Modal
          {...this.props}
          aria-labelledby="contained-modal-title-vcenter"
          className="modalContainer"
        >
          <Modal.Body className="show-grid" className="modalBodyLook">
            <Container className="modalContainerLook">
              {this.props.children}
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default LeftMenuPanel;
