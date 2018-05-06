import React from 'react';

class Switch extends React.Component {
    render() {
        return (
            <div className="switch" id={this.props.switchName}>
                {this.props.switchName}
            </div>
        );
    }
}

export default Switch;