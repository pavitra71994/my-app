import React, { Component } from "react";
import "./TimerCard.css";
import stopwatchIcon from "../../../svgIcons/stopwatch.svg";

class TimerCard extends Component {
  constructor(props) {
    super(props);
    this.countdownHandler = this.countdownHandler.bind(this);
    this.secondsToTime = this.secondsToTime.bind(this);
    this.state = {
      countdown: 6000,
    };
  }
  componentDidMount() {
    this.setInterval = setInterval(this.countdownHandler, 1000);
  }

  secondsToTime(secs) {
    const d = Number(secs);
    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);
    let s = Math.floor((d % 3600) % 60);

    let hDisplay = h > 0 ? "0" + h + (h === 1 ? ":" : ":") : "";
    let mDisplay = m > 0 ? m + (m === 1 ? ":" : ":") : "";
    let sDisplay = s > 0 ? s + (s === 1 ? "" : "") : "";
    return hDisplay + mDisplay + sDisplay;
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
    return (
      <div className="TimerContainer">
        <img alt="" className="stopwatchIconLook" src={stopwatchIcon}></img>
        <div className="timerLabel">
          {this.secondsToTime(this.state.countdown)}
        </div>
      </div>
    );
  }
}

export default TimerCard;
