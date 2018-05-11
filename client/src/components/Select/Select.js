import React from 'react';
import PropTypes from 'prop-types';

class SwitchParam extends React.Component {
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
        const paramValue = target.value;
        const { paramName, onParamChange } = this.props
        const paramObj = {
            paramTuple: {[paramName]: paramValue},
            presetId: target.name
        }
        
        onParamChange(paramObj);           
    }    

    render(){
        const { paramName, paramValue, presetId} = this.props;

        return (
            <div className="preset-display">    
                <label 
                    className="param-label"
                    htmlFor={presetId}>
                    {paramName}
                </label>    
                <select 
                    className="param-select" 
                    onChange={this.handleInputChange} 
                    name={presetId} 
                    value={paramValue}
                >
                    <option value="Creative">Creative</option>
                    <option value="Opto">Opto</option>
                    <option value="FET">FET</option>
                    <option value="Vari-Mu">Vari-Mu</option>
                    <option value="VCA">VCA</option>
                </select>
            </div>
        )
    }
}

SwitchParam.PropTypes = {
    onParamChange: PropTypes.func.isRequired,
    paramName: PropTypes.string ,
    paramValue: PropTypes.bool,
    presetId: PropTypes.string
}

export default SwitchParam;