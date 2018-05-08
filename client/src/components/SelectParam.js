import React from 'react';
import PropTypes from 'prop-types';

class SwitchParam extends React.Component {
    constructor (props) {
        super(props)     
        this.handleInputChange = this.handleInputChange.bind(this);   
    }

    static defaultProps = {
        param: ''
    }

    handleInputChange (e) {
        const target = e.target;
        const {paramName, onParamChange} = this.props
        const paramChangeInfo = {
            presetId: target.name,
            paramValue: target.value,
            paramName
        }
        onParamChange(paramChangeInfo);
    }    

    render(){
        const { paramName, presetId, param } = this.props;

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
                    value={param}
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
    param: PropTypes.bool,
    presetId: PropTypes.string ,
    paramUnit: PropTypes.string
}

export default SwitchParam;