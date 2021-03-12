import React, { Component } from "react";

class iFrame extends Component {
  render() {
    return (
      <Component as="iframe" width={this.props.width} height={this.props.height} />
    );
  }
}

export default iFrame;
