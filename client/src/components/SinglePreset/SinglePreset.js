import React, { Component } from 'react';
import FXParam from '../FXParam/FXParam';
import PropTypes from 'prop-types';

require('./SinglePreset.css');

class SinglePreset extends Component {
    constructor (props) {
        super(props)
        this.handleParamChange = this.handleParamChange.bind(this);
    }

    static defaultProps = {
        onParamChange: ()=>{},
        preset: {},
        info: {}
    }

    handleParamChange (paramObj) {
        this.props.onParamChange(paramObj);
    }

    render () {
        const { preset } = this.props;
        const { params } = preset;
        const presetId = preset._id || '0';

        //console.log(preset)

        if (params) {
            return (
                <div className="single-preset-body">
                    {params.map((param, index) => {                        
                        return <FXParam key={index + presetId} presetId={presetId} param={ param } onParamChange={this.handleParamChange}/>
                    })}
                </div>
            )
        } else {
            return (
                <div>Loading...(params not reloading with page)</div>
            )
        }
        
    }
}

SinglePreset.PropTypes = {
    onParamChange: PropTypes.func.isRequired,
    preset: PropTypes.object.isRequired,
    info: PropTypes.object.isRequired
}

export default SinglePreset;