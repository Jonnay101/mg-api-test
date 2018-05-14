import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debounce from '../../functions/debounce';
import SFunc from '../../functions/stateFunctions';
import Helpers from '../../functions/helpers';
import PresetList from '../PresetList/PresetList';
import SinglePreset from '../SinglePreset/SinglePreset';
import { log } from 'util';
import { fetchPresets, setPresetNamesId } from '../../actions/index';

require('./FX.css');

class FX extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autoSave: false,
            error: null,
            currPreset: {},
            defaultInUse: true,
            presets: [],
            presetModified: false,
            presetNames: [],
            presetNamesId: [],
            userMessage: ''
        }
        this.handlePresetChoice = this.handlePresetChoice.bind(this);
        this.handleParamChange = this.handleParamChange.bind(this);
        this.handleSaveAs = this.handleSaveAs.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDbUpdate = Debounce.debounce(this.handleDbUpdate, 250).bind(this);
        this.handleAutoSave = this.handleAutoSave.bind(this);
        this.handleNewPreset = this.handleNewPreset.bind(this);
    }

    static defaultProps = {
        info: {}
    } 
    
    componentDidMount () {
        fetchPresets(null, this.props);
        setPresetNamesId('yo');
    }

    // componentDidMount () {
    //     // load presets and update state as soon as this component mounts
    //     const { info } = this.props;
    //     const { presets } = this.state;
    //     SFunc.getPresetList(info.requestURI, {currPreset: info.defaultPreset}).then(data => {
    //         this.setState({
    //             ...data, 
    //             presetNamesId: Helpers.getNamesAndIdFromPresets(data.presets || presets)
    //         });
    //     });
    // }

    handlePresetChoice (presetId) {
        // recieves a preset Id from the presetList component and sets the currPreset according to this id
        const { info } = this.props;
        const { presets } = this.props;
        var currPresetObj = Helpers.setPresetById(presetId, presets) || {currPreset: info.defaultPreset};
        this.setState({
            ...currPresetObj,
            defaultInUse: false
        });
    }

    handleParamChange (paramObj) {
        // get vars
        const { currPreset } = this.state;
        const newPreset = {...currPreset};
        const currParams = currPreset.params;
        const { paramTuple, presetId } = paramObj;
        const newParams = [...currParams];

        
        // find the index where paramTuple equivalent lives
        const index = currParams.findIndex(param => Helpers.matchObjKeys(param, paramTuple));

        // add paramTuple to newParams
        newParams[index] = paramTuple;
        newPreset.params = newParams;

        const paramsTuple = {params: newParams};

        // update the db via debounce
        this.handleDbUpdate(paramsTuple, presetId);


        // set the currPreset state
        this.setState({
            currPreset: newPreset,
            presetModified: true
        })       
    }

    handleDbUpdate (paramsTuple, presetId) {
        if (!this.state.defaultInUse && this.state.autoSave) {
            const{ requestURI } = this.props.info;
            SFunc.updatePreset(requestURI, presetId, paramsTuple).then(data => {
                SFunc.getPresetList(requestURI, data).then(data => this.setState({
                    ...data,
                    presetModified: false
                }));
            });
        }        
    }

    handleSaveAs () {
        const newName = prompt('Please enter a preset name...');

        if(newName && newName.length > 0) {
            // if name is valid caryy on
            const { requestURI } = this.props.info;
            const { params } = this.state.currPreset;
            const newCurrPreset = {
                presetName: newName,
                params
            };

            //post newCurrPreset to the db
            SFunc.postPreset(requestURI, newCurrPreset).then(newCurrPresetTuple => {
                // get db preset list
                SFunc.getPresetList(requestURI, newCurrPresetTuple).then(data => {
                    this.setState({
                        ...data,
                        presetNamesId: Helpers.getNamesAndIdFromPresets(data.presets),
                        defaultInUse: false,
                        presetModified: false
                    });
                });
            });
            
        } else {
            alert('you must enter a name for your new preset');
        }
    }

    handleDelete () {
        const id = this.state.currPreset._id;
        if (id) {
            const { requestURI, defaultPreset } = this.props.info;
            SFunc.deletePreset(requestURI, id).then(message => {
                SFunc.getPresetList(requestURI,{
                    message,
                    currPreset: defaultPreset,
                    defaultInUse: true,
                    presetModified: false
                }).then(data => this.setState({...data, presetNamesId: Helpers.getNamesAndIdFromPresets(data.presets)}));
            });
        };  
    };

    handleAutoSave (e) {
        const val = e.target.checked;
        if (val) {
            this.setState({autoSave: true});
        } else {
            this.setState({autoSave: false});
        }
    }

    handleNewPreset () {
        this.setState({currPreset: this.props.defaultPreset});
        this.handleSaveAs ();
    }

    render () {
        // render vars
        const { info } = this.props;
        const { currPreset, defaultInUse, error, presetNamesId, userMessage } = this.state;
        const fxBodyTag = info.fxType + '-fx-body fx-body';

        // error reporting
        if (error) {
            return <h5 className="error-message" style={{color: 'red'}}>{error.message}</h5>
        }

        // user message
        const whenUserMessage = () => userMessage ? <p>{userMessage}</p> : null;

        //  conditional delete button
        const whenDeleteButton = () => {
            return !defaultInUse ? <button onClick={this.handleDelete} className="delete-btn btn">Delete</button> : null;
        }

        //main output
        return (
            
            <div className={fxBodyTag}>
                <div className="button-bar">
                    <div className="button-container">
                        <button className="new-preset-btn btn" onClick={this.handleNewPreset}>New Preset</button>
                        <button className="save-as-btn btn" onClick={this.handleSaveAs}>Save As</button>
                        {/* <button className="new-preset-btn btn" onClick={this.handleNewPreset}>Save As</button> */}
                        {whenDeleteButton()}
                    </div>
                    {whenUserMessage()}
                    <div className="auto-save-container">
                        <label className="auto-save-label" htmlFor="auto-save-input">
                            Auto Save?                        
                        </label>
                        <input className="auto-save-input"type='checkbox' name="auto-save-input" onChange={this.handleAutoSave} />
                    </div>
                </div>
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

const mapStateToProps = state => ({
    presets: state.requests.presets
})

export default connect(mapStateToProps, fetchPresets)(FX);