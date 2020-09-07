import React, { Component } from "react";
import "./UberReactVisComp.css";

import { XYPlot, ArcSeries } from "react-vis";

export const EXTENDED_DISCRETE_COLOR_RANGE = [
  "#19CDD7",
  "#DDB27C",
  "#88572C",
  "#FF991F",
  "#F15C17",
  "#223F9A",
  "#DA70BF",
  "#125C77",
  "#4DC19C",
  "#776E57",
  "#12939A",
  "#17B8BE",
  "#F6D18A",
  "#B7885E",
  "#FFCB99",
  "#F89570",
  "#829AE3",
  "#E79FD5",
  "#1E96BE",
  "#89DAC1",
  "#B3AD9E",
];

const PI = Math.PI;

function getDate() {
  return new Date();
}

class UberReactVisComp extends Component {
  state = {
    seconds: 0,
    minutes: 0,
    hrs: 0,
  };

  componentDidMount() {
    this._timerId = setInterval(
      () =>
        this.setState({
          seconds: getDate().getSeconds(),
          minutes: getDate().getMinutes(),
          hrs: getDate().getHours(),
        }),
      100
    );
  }

  componentWillUnmount() {
    clearInterval(this._timerId);
    this.setState({ timerId: false });
  }

  render() {
    const seconds = this.state.seconds;
    const minutes = this.state.minutes;
    const hours = this.state.hrs > 12 ? this.state.hrs - 12 : this.state.hrs;

    console.log(hours + ":" + minutes + ":" + seconds);
    return (
      <div className="uberReactComp">
        <XYPlot
          xDomain={[-3, 3]}
          yDomain={[-3, 3]}
          width={200}
          getAngle={(d) => d.time}
          getAngle0={(d) => 0}
          height={200}
        >
          <ArcSeries
            animation={{
              damping: 9,
              stiffness: 300,
            }}
            radiusDomain={[0, 3]}
            data={[
              {
                time: (seconds / 60) * 2 * PI,
                radius0: 1,
                radius: 1.5,
                color: 0,
              },
              {
                time: (minutes / 60) * 2 * PI,
                radius0: 1.6,
                radius: 2.1,
                color: 1,
              },
              {
                time: (hours / 12) * 2 * PI,
                radius0: 2.2,
                radius: 2.7,
                color: 2,
              },
            ]}
            colorRange={EXTENDED_DISCRETE_COLOR_RANGE}
          />
        </XYPlot>
      </div>
    );
  }
}

export default UberReactVisComp;
