import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Slider extends Component {
    constructor (props) {
        super(props)
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    static defaultProps = {
        paramName: '',
        paramValue: 0,
        presetId: '0'
    }

    handleInputChange (e) {
        const target = e.target;
        const { paramName, onParamChange } = this.props
        const paramObj = {
            presetId: target.name,
            paramValue: parseFloat(target.value),
            paramName
        }
        onParamChange(paramObj);
    }    

    render(){
        const { paramName, paramValue, presetId } = this.props;
        let paramUnit, min, max;

        if (paramName.indexOf('Gain') >= 0 || paramName.indexOf('presence') >= 0 || paramName.indexOf('thresh') >= 0 || paramName.indexOf('make') >= 0){
            // return db as unit
            paramUnit = 'dB';
            if (paramName.indexOf('thresh') >= 0) {
                min = -60;
                max = 0;
            } else {
                min = -24;
                max = 24;
            }
        } else if (paramName.indexOf('atta') >= 0 || paramName.indexOf('rele') >= 0 ){
            // return db as unit
            paramUnit = 'ms';
            if (paramName.indexOf('atta') >= 0) {
                min = .2;
                max = 150;
            } else {
                min = 5;
                max = 1000;
            }
        } else if (paramName.indexOf('Freq') >= 0 ) {
            if (paramName.indexOf('Hi') >= 0 ) {
                paramUnit = 'kHz';
                min = 1;
                max = 22;
            } else {
                paramUnit = 'Hz';
                min = 20;
                max = 2000;
            }
        }
        
        return (
            <div className="preset-display">
                <label 
                    className="fdsf"
                    htmlFor={presetId}>
                    {paramName}
                </label>     
                <input 
                    type="range"
                    min={min}
                    max={max}
                    step="2"
                    className="param-input slider" 
                    onChange={this.handleInputChange} 
                    name={presetId} 
                    value={paramValue}
                />                
                <div className="param-display">{paramValue}<span className="param-unit">({paramUnit})</span></div>
            </div>
        )
    }
}

Slider.PropTypes = {
    onParamChange: PropTypes.func.isRequired,
    paramName: PropTypes.string,
    presetId: PropTypes.string ,
    paramValue: PropTypes.number
}

export default Slider;