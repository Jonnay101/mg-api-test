import React, { Component } from 'react';

class PresetItem extends Component {
    static defaultProps = {
        presetName: '',
        presetId: 0
    }

    handleClick (e) {
        this.props.presetClicked(e.target.id)
    }

    render() {
        const { presetName, presetId } = this.props;

        return (
            <li onClick={this.handleClick.bind(this)} id={ presetId } >{ presetName }</li>
        )
    }
}

export default PresetItem;