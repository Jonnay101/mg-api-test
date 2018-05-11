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
        const paramValue = parseFloat(target.value);
        const { paramName, onParamChange } = this.props
        const paramObj = {
            paramTuple: {[paramName]: paramValue},
            presetId: target.name
        }

        // throttle onParamChange reporting to integers        
        if (paramValue % 2 === 0 || paramValue === 0) {
            onParamChange(paramObj);
        }                  
    }    

    render(){
        const { paramName, paramValue, presetId } = this.props;
        let paramUnit, min = 0, max = 0, step = 0.25;
        const paramBodyTag = paramName + '-param-body param-body';

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
                min = 1;
                max = 60;
            } else {
                min = 50;
                max = 300;
            }
        } else if (paramName.indexOf('Freq') >= 0 ) {
            if (paramName.indexOf('hi') >= 0 ) {
                paramUnit = 'kHz';
                min = 1;
                max = 22;
            } else {
                paramUnit = 'Hz';
                min = 20;
                max = 2000;
            }
        } else if (paramName.indexOf('ratio') >= 0 ) {
            paramUnit = ':1';
            min = 1;
            max = 20;
        }
        
        return (
            <div className={paramBodyTag}>
                <label 
                    className="param-label"
                    htmlFor={presetId}>
                    {paramName}
                </label>     
                <input 
                    type="range"
                    min={min - 0.25}
                    max={max + 0.25}
                    step={step}
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