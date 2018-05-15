import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    addNewPreset, 
    deletePreset, 
    selectPreset, 
    setDefaultInUse, 
    toggleAutoSave, 
    unsetDefaultInUse 
} from '../../actions/index';

class ButtonBar extends Component {

    static defaultProps = {
        defaultInUse: true,
        info: {}
    };

    handleAutoSave(e) {
        // toggles autosave in state
        const bool = e.target.checked;
        this.props.toggleAutoSave(bool);
    };

    handleNewPreset(){
        // creates a new preset from the default settings
        const { info, selectPreset, setDefaultInUse } = this.props;
        // set default preset as currPreset
        selectPreset(info.defaultPreset);
        setDefaultInUse();
        this.handleSaveAs(info.defaultPreset);
    };

    handleSaveAs() {
        // saves a copy of the current preset
        const newName = prompt('please enter a new preset name');
        if (newName && newName.length > 0) {
            let { addNewPreset, currPreset, info } = this.props;
            const params = currPreset.params;
            const newCurrPreset = {
                presetName: newName,
                params
            }

            addNewPreset(info.requestURI, newCurrPreset); 

        } else {
            alert('you must enter a preset name');
        }
    };
    
    handleDelete() {
        // deletes the current preset
        const { deletePreset, currPreset, info, selectPreset, setDefaultInUse } = this.props;
        // delete preset
        deletePreset(info.requestURI, currPreset);
        // set currPreset to default
        selectPreset(info.defaultPreset);
        setDefaultInUse();
    };

    whenDeleteButton = () => {
        // conditional delete button -- only delete non default presets
        const { defaultInUse } = this.props;
        return !defaultInUse ? <button 
            onClick={this.handleDelete.bind(this)} 
            className="delete-btn btn">
            Delete
        </button> : null;
    };

    render () {

        // main output 
        return (
            <div className="button-bar">
                <div className="button-container">
                    <button className="new-preset-btn btn" onClick={this.handleNewPreset.bind(this)}>New Preset</button>
                    <button className="save-as-btn btn" onClick={this.handleSaveAs.bind(this)}>Save As</button>
                    {this.whenDeleteButton()}
                </div>
                <div className="auto-save-container">
                    <label 
                        className="auto-save-label" 
                        htmlFor="auto-save-input">
                        Auto Save?                        
                    </label>
                    <input 
                        className="auto-save-input" 
                        type='checkbox' 
                        name="auto-save-input" 
                        onChange={this.handleAutoSave.bind(this)} />
                </div>
            </div>
        );
    };
};

ButtonBar.PropTypes = {
    info: PropTypes.object.isRequired,
    autoSave: PropTypes.bool,
    currPreset: PropTypes.object,
    defaultInUse: PropTypes.bool
}

//================================ PROPS ==================================

const mapStateToProps = state => {
    // maps redux state to props
    return {
        autoSave: state.autoSave,
        currPreset: state.currPreset,
        defaultInUse: state.defaultInUse
    }
}

const mapDispatchToProps = dispatch => {
    // maps redux action creators to props
    return bindActionCreators({
        addNewPreset: addNewPreset,
        deletePreset: deletePreset,
        selectPreset: selectPreset,
        setDefaultInUse: setDefaultInUse,
        toggleAutoSave: toggleAutoSave,
        unsetDefaultInUse: unsetDefaultInUse,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonBar);