import React from 'react';
import SinglePreset from './SinglePreset';

function debounce (func, wait, immediate) {    
    var timeout;
    return function() {
        var context = this,   
            args = arguments;        
        var later = function() {                   
            timeout = null;   
            if ( !immediate ) {        
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;        
        clearTimeout(timeout);            
        timeout = setTimeout(later, wait || 1000);
        if ( callNow ) { 
    
            func.apply(context, args);
        }
    };
};

class Comp extends React.Component {
    constructor (props) {
        super(props);
        this.updatePreset = debounce(this.updatePreset, 250);
        this.state = {
            presets: [],
            error: null,
            currPreset: {},
            currPresetAltered: false,
            activeIndex: null,
            defaultInUse: true,
            defaultPreset: {
                mode: 'FET',
                attack: 10,
                release: 100,
                threshold: -12,
                ratio: 4,
                presence: 0,
                makeUp: 0,
                _id: 0,
                presetName:"default"
            },
            modifyingNewPreset: false
        };      
        
    }

    getPresets () {
        return fetch('/api/user1234/comp')
            .then((res) => res.json())
            .then((data) => this.setState({presets: data}))
            .catch((err) => console.log('sorry, there\'s been an error... ' + err))
    }
    
    getSinglePreset (id) {
        return fetch('/api/user1234/comp/' + id)
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log('sorry, there\'s been an error... ' + err))
    }

    componentDidMount () {

        this.setState({
            currPreset: this.state.defaultPreset,
            defaultInUse: true
        });

        this.getPresets();
    }

    handlePresetClick(event) {
        const presetId = event.target.id;
        const { presets } = this.state;
        
        const newCurrPreset = presets.find((preset, ind) => {
        return preset._id === presetId;
        })
        
        this.setState({
            currPreset: newCurrPreset,
            defaultInUse: false
        });
    }

    updatePreset(paramObj) {
        if (!this.state.defaultInUse) {
            const { paramValue, paramName, presetId } = paramObj;
            
            fetch('/api/user1234/comp/' + presetId, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({[paramName] : paramValue})
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('something went wrong woth the PUT request');
                }
            })
            .then(data => {
                this.getPresets();
                this.setState({
                    currPreset: data
                });
            });
        }        
    }

    handleParamChange (paramObj) {
        const { currPreset } = this.state;
        const { paramName, paramValue } = paramObj;
        const newCurrPreset = {...currPreset };
        
        this.updatePreset(paramObj);
        
        newCurrPreset[paramName] = paramValue;
        
        this.setState({
            currPreset: newCurrPreset,
            currPresetAltered: true
        });
    }

    saveCurrPreset () {
        const { presets, currPreset } = this.state;     
        
        if (currPreset._id !== '0') {
        // if the current preset is not the default preset
        // save newCurrPreset to the state
            const index = presets.findIndex(preset => {
                return preset._id === currPreset._id;
            });

            const newPresets = [...presets];      
            newPresets[index] = currPreset;
            
            this.setState({
                currPresetAltered: false,
                presets: newPresets
            });
        }    
    }

    createNewPreset () {
        const newPreset = {...this.state.default};
        this.setState({
            currPreset: newPreset,        
            defaultInUse: true
        }, () => this.saveNewPreset());
    }

    saveNewPreset () {
        // connected to 'Save As' & 'New Preset' buttons
        const { currPreset } = this.state;
        const newName = prompt('please enter a name for your new preset');

        // making a POST request
        if (newName && newName.length > 0) {
            const newCurrPreset = { 
                ...currPreset, 
                presetName: newName
            };
            // make a POST request -- send newCurrPreset as body

            fetch('/api/user1234/comp', {
                method: 'POST',
                body: JSON.stringify(newCurrPreset), 
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        throw new Error('something went wrong... ');
                    }                    
                })
                .then(postedPreset => {
                    this.getPresets(); // grab preset list
                    this.setState({
                        currPreset: postedPreset,
                        currPresetAltered: false,
                        defaultInUse: false
                    });                    
                })
                .catch(err => console.log(err.message));
        }
    }

    deleteCurrPreset() {
        const { currPreset, defaultPreset } = this.state;
        const currPresetId = currPreset._id;

        if (currPresetId !== '0') {
            // if preset is not default preset
            const deleteURI = '/api/user1234/comp/' + currPresetId;

            
            fetch(deleteURI, {
                method: 'DELETE',
                headers: {
                    "content-Type": "application/json",
                }
            })
                .then(res => {
                    if (res.ok){
                        return res.json();
                    } else {
                        throw new Error('There was a problem deleting the preset ... ')
                    }
                })
                .then(deletedPreset => {
                    this.getPresets();
                    this.setState({
                        currPreset: defaultPreset,
                        defaultInUse: true
                    })
                })
                .catch(err => console.log(err.message));
            
        }
        
    }

    render() {

        const { defaultInUse } = this.state;
        
        const showAutoSave = () => {
            if (!defaultInUse) {
                // show delete button
                return (                    
                    <div className="auto-save-warning">Auto Save Enabled</div>                         
                )
            }// if        
        };

        // setup delete button
        const showDeleteButton = () => {
            if (!defaultInUse) {
                // show delete button
                return (                    
                    <button 
                        className="btn btn-default delete-btn" 
                        onClick={this.deleteCurrPreset.bind(this)}>
                        Delete
                    </button>                              
                )
            }// if        
        };

        //poulate the preset list
        const presetList = this.state.presets.map((preset, ind) => {
            return (
                <li 
                    onClick={this.handlePresetClick.bind(this)} 
                    key={preset._id} id={preset._id} 
                    className="preset-item btn">
                    {preset.presetName}
                </li>
            );
        });    
        
        //return main component
        return (
        <div className="eq-page">
            <div className="buttons-block">
                {showAutoSave()}  
                <div className="save-buttons">
                    {showDeleteButton()}
                    {/* {showSaveButton()} */}
                    <button 
                        className="btn btn-default save-btn" 
                        onClick={this.saveNewPreset.bind(this)}>
                        Save As
                    </button>
                    <button 
                        className="btn btn-default save-btn save-btn--new" 
                        onClick={this.createNewPreset.bind(this)}>
                        New Preset
                    </button>
                </div>
            </div>
            <div className="eq-display">
                <ul className="preset-list">
                    <h4>Select Preset</h4>
                    {presetList}
                </ul>
                <SinglePreset 
                    onParamChange={this.handleParamChange.bind(this).bind(this)} 
                    preset={this.state.currPreset}
                    fxType="comp"
                />
            </div>        
        </div>
        )
    }
}

export default Comp;