import React from 'react';
import PropTypes from 'prop-types';
import Helpers from '../../functions/helpers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateParams, selectPreset } from '../../actions/index';
import { debounce } from '../../functions/debounce';

import Slider from '../Slider/Slider';
import Switch from '../Switch/Switch';
import Select from '../Select/Select';

require('./FXParam.css');

class FXParam extends React.Component {
    constructor (props) {
        super(props)
        this.handleParamChange = this.handleParamChange.bind(this);
        this.handleDbUpdate = debounce(this.handleDbUpdate).bind(this);
    }

    static defaultProps = {
        param: {},
        presetId: '',
        currPreset: {},
        info: {}
    }

    handleParamChange (paramObj) {
        // get vars
        const { currPreset, selectPreset } = this.props;
        const newPreset = {...currPreset};
        const currParams = currPreset.params;
        const { paramTuple, presetId } = paramObj;
        const newParams = [...currParams];
        
        // find the index where paramTuple equivalent lives
        const index = currParams.findIndex(param => Helpers.matchObjKeys(param, paramTuple));

        // add paramTuple to newParams
        newParams[index] = paramTuple;
        newPreset.params = newParams;

        // send to db
        this.handleDbUpdate(paramTuple, presetId, index);

        // upddate current preset
        selectPreset(newPreset);
    }

    handleDbUpdate (paramTuple, presetId) {
        const { autoSave, defaultInUse, updateParams } = this.props;
        
        if (!defaultInUse && autoSave) {
            // if default not in use and autosave turned on...
            const{ requestURI } = this.props.info;
            updateParams(`${requestURI}/${presetId}`, paramTuple);
        }        
    }

    render(){
        const { param, presetId } = this.props;
        const paramName = Helpers.getKeyFromTuple(param)
        const paramValue = param[paramName];
        const fxParamBodyTag = `${paramName}-param-body fx-param-body`;

        if (typeof paramValue === 'number') {
            // return a slider 
            return <Slider onParamChange={this.handleParamChange} paramName={paramName} paramValue={paramValue} presetId={presetId} className={fxParamBodyTag}/>
        } else if (typeof paramValue === 'boolean') {
            // return a switch
            return <Switch onParamChange={this.handleParamChange} paramName={paramName} paramValue={paramValue} presetId={presetId} className={fxParamBodyTag}/>
        } else if (typeof paramValue === 'string') {
            // return a select 
            return <Select onParamChange={this.handleParamChange} paramName={paramName} paramValue={paramValue} presetId={presetId} className={fxParamBodyTag}/>           
        } else {
            return <p>Sorry, parameter not loading!</p>
        }
    };
};

FXParam.PropTypes = {
    param: PropTypes.object.isRequired,
    presetId: PropTypes.string,
    info: PropTypes.object,
    autoSave: PropTypes.bool,
    currPreset: PropTypes.object,
    defaultInUse: PropTypes.bool,
    presets: PropTypes.object
};

//================================ PROPS ==================================

const mapStateToProps = state => {
    // maps redux state to props
    return {
        autoSave: state.autoSave,
        currPreset: state.currPreset,
        defaultInUse: state.defaultInUse,
        presets: state.presets
    };
};

const mapDispatchToProps = dispatch => {
    // maps redux action creators to props
    return bindActionCreators({
        selectPreset: selectPreset,
        updateParams: updateParams
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FXParam);