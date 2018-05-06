import React from 'react';

class Display extends React.Component {
  render() {
    return (
      <div className="displayBox">{this.props.displayValue}</div>
    );
  }
}

export default Display;