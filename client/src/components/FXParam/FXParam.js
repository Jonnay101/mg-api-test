import React from 'react';
import PropTypes from 'prop-types';
import Helpers from '../../functions/helpers';

import Slider from '../Slider/Slider';
// import SwitchParam from './SwitchParam';
// import SelectParam from './SelectParam';

require('./FXParam.css');

class FXParam extends React.Component {
    constructor (props) {
        super(props)
        this.handleParamChange = this.handleParamChange.bind(this);
    }

    static defaultProps = {
        onParamChange: ()=>{},
        param: {},
        presetId: ''
    }

    handleParamChange (paramObj) {     
        this.props.onParamChange(paramObj);
    }

    render(){
        const { param, presetId } = this.props;
        const paramName = Helpers.getKeyFromTuple(param)
        const paramValue = param[paramName];
        const fxParamBodyTag = paramName + '-param-body fx-param-body'

        if (typeof paramValue === 'number') {
            // return a slider 
            return <Slider onParamChange={this.handleParamChange} paramName={paramName} paramValue={paramValue} presetId={presetId}/>
        } else if (typeof paramValue === 'boolean') {
            // return a switch
        } else if (typeof paramValue === 'string') {
            // return a select            
        } else {
            return <p>Sorry, parameter not loading!</p>
        }

        return (<div className={fxParamBodyTag}>{paramName + ' : ' + paramValue}</div>)

    }
}

// SingleParam.PropTypes = {
//     onParamChange: PropTypes.func.isRequired,
//     paramName: PropTypes.string ,
//     param: PropTypes.number,
//     presetId: PropTypes.string ,
//     paramUnit: PropTypes.string.isRequired
// }

export default FXParam;