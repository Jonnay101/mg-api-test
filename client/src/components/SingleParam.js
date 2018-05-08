import React from 'react';
import PropTypes from 'prop-types';

class SingleParam extends React.Component {
    constructor (props) {
        super(props)
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange (e) {
        const target = e.target;
        const {paramName, onParamChange} = this.props
        const paramChangeInfo = {
        presetId: target.name,
        paramValue: parseFloat(target.value),
        paramName
        }
        onParamChange(paramChangeInfo);
    }    

    render(){
        const { paramName, presetId, param, paramUnit } = this.props;
        const unit = paramUnit.toLowerCase();

        const minRange = () => {            

            if(unit === 'khz') {
                return "1";
            } else if (unit === 'hz') {
                return  "20";
            } else if (unit === 'db') {
                return  (paramName.toLowerCase() === 'threshold' ? "-60": "-24");
            } else if (unit === 'ms') {
                return  (paramName.toLowerCase() === 'attack' ? 0.2 : 5);
            } else if (unit === ':1') {
                return  1;
            } else {
                // default
                return "0";
            }
        }

        const maxRange = () => {

            if(unit === 'khz') {
                return "22";
            } else if (unit === 'hz') {
                return  "2000";
            } else if (unit === 'db') {
                return  (paramName.toLowerCase() === 'threshold' ? "0": "24");
            }  else if (unit === 'ms') {
                return  (paramName.toLowerCase() === 'attack' ? 200 : 2000);
            } else if (unit === ':1') {
                return  100;
            } else {
                // default
                return "48000";
            }
        }

        const paramClass = 'param-input ' + paramName;
        
        return (
            <div className="preset-display">   
                <label 
                    className={paramClass}
                    htmlFor={presetId}>
                    {paramName}
                </label>     
                <input 
                    type="range"
                    min={minRange()}
                    max={maxRange()}
                    step="0.1"
                    className="param-input slider" 
                    onChange={this.handleInputChange} 
                    name={presetId} 
                    value={param}
                />                
                <div className="param-display">{param}<span className="param-unit">({paramUnit})</span></div>
            </div>
        )
    }
}

SingleParam.PropTypes = {
    onParamChange: PropTypes.func.isRequired,
    paramName: PropTypes.string ,
    param: PropTypes.number,
    presetId: PropTypes.string ,
    paramUnit: PropTypes.string.isRequired
}

export default SingleParam;