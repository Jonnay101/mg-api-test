import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from "prop-types";
import { selectPreset, unsetDefaultInUse, getFxPresets } from '../../actions/index'

require('./PresetList.css');

class PresetList extends Component {

    static defaultProps = {
        presets: [],
        info: []  
    }

    componentDidMount() {
        const { getFxPresets, info } = this.props;
        getFxPresets(info.requestURI);
    }

    renderPresets () {
        const { selectPreset, unsetDefaultInUse, getFxPresets, info } = this.props;

        return this.props.presets.map( preset => {
            return <li 
                key={preset._id} 
                id={preset._id} 
                className="preset-list-item btn" 
                onClick={() => {
                    selectPreset(preset)
                    unsetDefaultInUse()
                    getFxPresets( info.requestURI );
                }}>
                {preset.presetName}
            </li>
        });
    }

    render () {

        return (
            <ul className="preset-list">
                {this.renderPresets()}
            </ul>
        );
    }
}

PresetList.PropTypes = {
    presets: PropTypes.array.isRequired,
    info: PropTypes.object.isRequired
}

//================================ PROPS ==================================

const mapStateToProps = state => {
    return {
        presets: state.presets
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        selectPreset: selectPreset,
        unsetDefaultInUse: unsetDefaultInUse,
        getFxPresets: getFxPresets
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PresetList);

