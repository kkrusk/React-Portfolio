import React, { Component } from "react";
import Clock from "react-live-clock";

class Clocks extends React.Component {
  render() {
    return (
      <Clock
        className="text-white"
        format={"HH:mm:ss"}
        ticking={true}
        timezone={"US/Central"}
      />
    );
  }
}

export default Clocks;
