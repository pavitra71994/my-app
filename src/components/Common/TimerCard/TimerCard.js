import React, { Component } from "react";
import "./TimerCard.css";

class TimerCard extends Component {
  constructor(props) {
    super(props);
    this.countdownHandler = this.countdownHandler.bind(this);
    this.state = {
      countdown: 6000,
    };
  }
  componentDidMount() {
    this.setInterval = setInterval(this.countdownHandler, 1000);
  }

  countdownHandler() {
    this.setState((prevState) => ({
      countdown: prevState.countdown - 1,
    }));
    if (this.state.countdown === 0) {
      this.props.timerHandler(this.state.countdown);
      clearInterval(this.setInterval);
    }
  }
  render() {
    return <div className="TimerContainer">{this.state.countdown}</div>;
  }
}

export default TimerCard;
