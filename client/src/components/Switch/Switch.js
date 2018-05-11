import React from 'react';
import PropTypes from 'prop-types';

class SwitchParam extends React.Component {
    constructor (props) {
        super(props)     
        this.handleInputChange = this.handleInputChange.bind(this);   
    }

    handleInputChange (e) {
        const target = e.target;
        const paramValue = target.checked
        const {paramName, onParamChange} = this.props
        const paramObj = {
            presetId: target.name,
            paramTuple: {[paramName]: paramValue}
        }
        onParamChange(paramObj);
    }    

    render(){
        // render vars
        const { paramName, paramValue, presetId } = this.props;
        const paramBodyTag = paramName + '-param-body param-body';
        
        //main output
        return (
            <div className={paramBodyTag}>    
                <label 
                    className="param-label"
                    htmlFor={presetId}>
                    {paramName}
                </label>    
                <input 
                    type="checkbox"
                    className="param-input switch" 
                    onChange={this.handleInputChange} 
                    name={presetId} 
                    checked={paramValue}
                />
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