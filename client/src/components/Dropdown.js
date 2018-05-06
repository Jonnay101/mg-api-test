import React from 'react';

class Dropdown extends React.Component {

    state = {
        presets: this.presets || 'poo',

    }

    componentDidMount() {
        
    }

    render() {
        console.log()
        return (
            <div className="dropdown">
                {this.props.presets}
            </div>
        );
    }
}

export default Dropdown;