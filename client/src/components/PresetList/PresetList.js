import React, { Component } from "react";
import Helpers from '../../functions/helpers';
import PropTypes from "prop-types";

require('./PresetList.css');

class PresetList extends Component {
    constructor (props) {
        super(props)
        this.handlePresetClick = this.handlePresetClick.bind(this);
    }

    static defaultProps = {
        presetNamesId: [],
        onPresetChoice: () => {}        
    }

    handlePresetClick (e) {
        const { onPresetChoice } = this.props;
        const presetId = e.target.id;
        onPresetChoice(presetId);
    }

    render () {
        const { presetNamesId } = this.props;
        const presetList = Helpers.nameIdArrayToList(presetNamesId, 'preset-list-item btn', this.handlePresetClick);
        return (
            <ul className="preset-list">
                {presetList}
            </ul>
        )
    }
}

export default PresetList;

PresetList.PropTypes = {
    presetNamesId: PropTypes.array.isRequired,
    onPresetChoice: PropTypes.func.isRequired
}