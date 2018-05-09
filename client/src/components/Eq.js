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

class Eq extends React.Component {
    constructor (props) {
        super(props);
        this.updatePreset = debounce(this.updatePreset, 250);
        this.state = {
            presets: [],
            currPreset: {},
            currPresetAltered: false,
            activeIndex: null,
            defaultInUse: true,
            defaultPreset: {
                hiBand:true,
                hiShelf:true,
                hiFreq:7.2,
                hiGain:0,
                hiMidBand:true,
                hiMidFreq:2.4,
                hiMidGain:0,
                loMidBand:true,
                loMidHiQ:true,
                loMidFreq:290,
                loMidGain:0,
                loBand:true,
                loShelf:true,
                loFreq:80,
                loGain:0,
                presetName:"default",
                _id:0
            },
            modifyingNewPreset: false,
            apiURI: '/api/user1234/eq'
        };      
        
    }

    getPresets () {
        return fetch(this.state.apiURI)
            .then(res => {
                if (res.ok){
                    return res.json();
                } else {
                    throw new Error('sorry, there was an error while loading the presets... ')
                }
            })
            .then((data) => this.setState({presets: data}))
            .catch((err) => this.setState({error: err.message}))
    }
    
    getSinglePreset (id) {
        return fetch(this.state.apiURI + '/' + id)
            .then((res) => {
                if (res.ok){
                    return res.json();
                } else {
                    throw new Error('sorry, there was an error while loading a single preset... ')
                }
            })
            .then((data) => data)
            .catch((err) => this.setState({error: err.message}))
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

            fetch(this.state.apiURI + '/' + presetId, {
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
            })
            .catch(err => this.setState({error: err.message}));
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

    saveNewPreset () {
        // connected to 'Save As' & 'New Preset' buttons
        const { currPreset } = this.state;
        const newName = prompt('please enter a name for your new preset');

        // making a POST request
        if (newName && newName.length > 0) {

            var newCurrPreset = {};

            // if (currPreset._id === 0 || !currPreset._id) {
            //     newCurrPreset = { 
            //         presetName: newName
            //     };
            // } else {
            //     newCurrPreset = {
            //         ...currPreset,
            //         presetName: newName
            //     };
            // }

            for (var key in currPreset) {
                if (currPreset.hasOwnProperty(key)) {
                    if (key !== '_id' && key !== 'presetName') {
                        newCurrPreset[key] = currPreset[key];
                    } else if (key === 'presetName') {
                        newCurrPreset.presetName = newName;
                    }
                } 
            }

            
            
            // make a POST request -- send newCurrPreset as body

            console.log(newCurrPreset);

            fetch('/api/user1234/eq', {
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
                        throw new Error('something went wrong while saving your new preset... ');
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
                .catch(err => this.setState({error: err.message}));
        }
    }

    createNewPreset () {
        this.setState({currPreset: this.state.defaultPreset}, () => this.saveNewPreset());
    }

    deleteCurrPreset() {
        const { currPreset, defaultPreset } = this.state;
        const currPresetId = currPreset._id;

        if (currPresetId !== '0') {
            // if preset is not default preset
            const deleteURI = this.state.apiURI + '/' + currPresetId;

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
                        throw new Error('There was a problem deleting your preset... ')
                    }
                })
                .then(deletedPreset => {
                    this.getPresets();
                    this.setState({
                        currPreset: defaultPreset,
                        defaultInUse: true
                    })
                })
                .catch(err => this.setState({error: err.message}));    
            
        }
        
    }

    render() {

        const { defaultInUse, error } = this.state;
        
        // setup delete button
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
            //console.log('presetList calles')
            return (
                <li 
                    onClick={this.handlePresetClick.bind(this)} 
                    key={preset._id} id={preset._id} 
                    className="preset-item btn">
                    {preset.presetName}
                </li>
            );
        });
        
        if (error) {
            return <p style={{color: 'red'}}>{error}</p>
        }
        
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
                        id="new-preset-btn"
                        className="btn btn-default save-btn save-btn--new" 
                        onClick={this.createNewPreset.bind(this)}>
                        New Preset
                    </button>
                </div>
            </div>
            <div className="eq-display">
                <ul className="preset-list">
                    <h4>Select Preset...</h4>
                    {presetList}
                </ul>
                <SinglePreset 
                    onParamChange={this.handleParamChange.bind(this).bind(this)} 
                    preset={this.state.currPreset}
                    fxType="eq"
                />
            </div>        
        </div>
        )
    }
}

export default Eq;