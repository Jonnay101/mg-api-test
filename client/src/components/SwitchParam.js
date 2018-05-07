import React from 'react';
import PropTypes from 'prop-types';

class SwitchParam extends React.Component {
    constructor (props) {
        super(props)     
        this.handleInputChange = this.handleInputChange.bind(this);   
    }

    handleInputChange (e) {
        const target = e.target;
        const {paramName, onParamChange} = this.props
        const paramChangeInfo = {
        presetId: target.name,
        paramValue: target.checked,
        paramName
        }
        onParamChange(paramChangeInfo);
    }    

    render(){
        const { paramName, presetId, param, paramUnit } = this.props;
        
        return (
            <div className="preset-display">    
                <label 
                    className="param-label"
                    htmlFor={presetId}>
                    {paramName}
                </label>    
                <input 
                    type="checkbox"
                    className="param-switch" 
                    onChange={this.handleInputChange} 
                    name={presetId} 
                    checked={param}
                />
                <div className="param-display"><span className="param-unit">({paramUnit})</span></div>
            </div>
        )
    }
}

SwitchParam.PropTypes = {
    onParamChange: PropTypes.func.isRequired,
    paramName: PropTypes.string ,
    param: PropTypes.bool,
    presetId: PropTypes.string ,
    paramUnit: PropTypes.string
}

export default SwitchParam;