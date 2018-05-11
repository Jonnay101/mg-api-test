import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Debounce from '../../functions/debounce';
import SFunc from '../../functions/stateFunctions';
import Helpers from '../../functions/helpers';
import PresetList from '../PresetList/PresetList';
import SinglePreset from '../SinglePreset/SinglePreset';

require('./FX.css');

class FX extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            currPreset: {},
            defaultInUse: true,
            presets: [],
            presetNames: [],
            presetNamesId: []
        }
        this.handlePresetChoice = this.handlePresetChoice.bind(this);
    }

    static defaultProps = {
        info: {}
    }    

    componentDidMount () {
        // load presets and update state as soon as this component mounts
        const { info } = this.props;
        const { presets } = this.state;
        this.setState({currPreset: info.defaultPreset});
        SFunc.getPresetList(info.requestURI, {currPreset: info.defaultPreset}).then(data => {
            this.setState({...data, presetNamesId: Helpers.getNamesAndIdFromPresets(data.presets || presets)});
        })
    }

    handlePresetChoice (presetId) {
        // recieves a preset Id from the presetList component and sets the currPreset according to this id
        const { info } = this.props;
        const { presets } = this.state;
        var currPresetObj = Helpers.setPresetById(presetId, presets) || {currPreset: info.defaultPreset};
        this.setState(currPresetObj);
    }

    handleParamChange (paramObj) {
        const { currPreset } = this.state;
        const currParams = currPreset.params;
        const { paramName, paramValue, presetId } = paramObj;
        const newParams = [...currParams];

        // params now need an id source saving too. they should come back as a tuple with the index and id seperate;
        
    }

    render () {
        // render vars
        const { info } = this.props;
        const { currPreset, error, presetNamesId } = this.state;
        const fxBodyTag = info.fxType + '-fx-body fx-body';

        // error reporting
        if (error) {
            return <h5 className="error-message" style={{color: 'red'}}>{error.message}</h5>
        }

        //main output
        return (
            
            <div className={fxBodyTag}>
                <h1 style={{color: 'white'}}>{info.fxType}</h1>
                <PresetList presetNamesId={presetNamesId} onPresetChoice={this.handlePresetChoice}/>
                <SinglePreset preset={currPreset} info={info} onParamChange={this.handleParamChange} />
            </div>
        )
    }
}

FX.PropTypes = {
    info: PropTypes.object.isRequired
}

export default FX