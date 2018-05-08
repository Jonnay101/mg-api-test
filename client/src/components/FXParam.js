import React from 'react';
import PropTypes from 'prop-types';

import SingleParam from './SingleParam';
import SwitchParam from './SwitchParam';
import SelectParam from './SelectParam';

class FXParam extends React.Component {
    constructor (props) {
        super(props)
        this.handleParamChange = this.handleParamChange.bind(this);
    }


    handleParamChange (paramObj) {        
        this.props.onParamChange(paramObj);
    }

    render(){
        const { paramName, presetId, param } = this.props;
        let paramUnit = '';

        // set correct param type
        if (typeof param === 'number') {
            if(paramName.indexOf('Freq') !== -1) {
                paramUnit = (paramName.indexOf('hi') !== -1 ? 'khz': 'hz');
            } else if (paramName.indexOf('Gain') !== -1 || paramName.indexOf('make') !== -1 || paramName.indexOf('thresh') !== -1 || paramName.indexOf('pres') !== -1){
                paramUnit = 'db';
            } else if (paramName.indexOf('ratio') !== -1 ){
                paramUnit = ':1';
            } else if (paramName.indexOf('atta') !== -1 || paramName.indexOf('rele') !== -1 ) {
                paramUnit = 'ms';
            }

            return (
                <SingleParam 
                    paramName = {paramName}
                    param = {param}
                    presetId = {presetId}
                    paramUnit = {paramUnit}
                    onParamChange = {this.handleParamChange}
                />
            )
        }  else if (typeof param === 'boolean') {
            return (
                <SwitchParam 
                    paramName = {paramName}
                    param = {param}
                    presetId = {presetId}
                    paramUnit = 'On/Off'
                    onParamChange = {this.handleParamChange}
                />
            )
        } else {
            return (
                <SelectParam 
                    paramName = {paramName}
                    param = {param}
                    presetId = {presetId}
                    paramUnit = ''
                    onParamChange = {this.handleParamChange}
                />
            )
                
            
        }
    }
}

SingleParam.PropTypes = {
    onParamChange: PropTypes.func.isRequired,
    paramName: PropTypes.string ,
    param: PropTypes.number,
    presetId: PropTypes.string ,
    paramUnit: PropTypes.string.isRequired
}

export default FXParam;