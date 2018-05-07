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
        
        return (
            <div className="preset-display">        
                <input 
                    type="number"
                    className="param-input" 
                    onChange={this.handleInputChange} 
                    name={presetId} 
                    value={param}
                />
                <label 
                    className="param-label"
                    htmlFor={presetId}>
                    <span className="param-unit">({paramUnit})</span>{paramName}
                </label>
            </div>
        )
    }
}

SingleParam.PropTypes = {
    onParamChange: PropTypes.func.isRequired,
    paramName: PropTypes.string ,
    param: PropTypes.number,
    presetId: PropTypes.string ,
    paramUnit: PropTypes.string
}

export default SingleParam;