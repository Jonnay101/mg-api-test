import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import FXParam from './FXParam';

require('./SinglePreset.css');

class SinglePreset extends React.Component {
    constructor (props) {
        super(props)
        this.handleParamChange = this.handleParamChange.bind(this)
    }

    static defaultProps = {
        onParamChange: () => {},
        preset: {
            params: [],
            presetName: ''
        },
        info: {
            defaultPreset: {},
            fxType: ''
        },
    }

    handleParamChange (obj) {
        const { onParamChange } = this.props;
        this.props.onParamChange(obj)
    }

    render(){
        // render vars
        const { preset, info } = this.props;
        const { fxType } = info;
        const { params } = preset;
        let paramArr;

        // console.log(preset.params);
        // if (params) {
        //     paramArr = params.map((param, index) => {
        //         <li key={index}>{param}</li>
        //     });
        // } else {
        //     info.defaultPreset.params.map((param, index) => {
        //         <li key={index}>{param[0]}</li>
        //     });
        // }     

        // main output
        return (
            <div className="single-preset">        
                <h4>preset: <span className="chosen-preset">{preset.presetName}</span></h4>                   
                {/* <FXParam 
                    onParamChange={this.handleParamChange} 
                    paramName="hiBand" 
                    param={preset.hiBand} 
                    presetId={preset._id}
                    paramUnit = "On"
                    fxType = {fxType}
                />                     */}
                <ul>{paramArr}</ul>
            </div>
        )              
    }
}

SinglePreset.PropTypes = {
    onParamChange:PropTypes.func.isRequired,
    preset: PropTypes.object.isRequired
}

export default SinglePreset;
  