import React from 'react';
import SinglePreset from './SinglePreset';


class Eq extends React.Component {
    constructor (props) {
        super(props)
        
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
                presetName:"default"
            },
            modifyingNewPreset: false
        }// end of state       
    }

    getPresets () {
        return fetch('/api/user1234/eq')
            .then((res) => res.json())
            .then((data) => this.setState({presets: data}))
            .catch((err) => console.log('sorry, there\'s been an error... ' + err))
    }

    

    componentDidMount () {
        const defaultPreset = {
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
            presetName:"default"
        }

        this.setState({
            currPreset: defaultPreset,
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

    handleParamChange (paramObj) {
        const { currPreset } = this.state;
        const { paramName, paramValue } = paramObj;
        const newCurrPreset = {...currPreset };
        
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
            const newCurrPreset = { 
                ...currPreset, 
                presetName: newName, 
                _id: null
            };
            // make a POST request -- send newCurrPreset as body

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
            const deleteURI = '/api/user1234/eq/' + currPresetId;

            
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
                        throw new Error('There was a problem with the deleteCurrPreset fetch... ')
                    }
                })
                .then(deletedPreset => {
                    console.log(deletedPreset)
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

        const { currPresetAltered, defaultInUse } = this.state;
        
        // setup save button
        const showSaveButton = () => {
            if (currPresetAltered && !defaultInUse) {
                // show save buttons 
                return (
                    <button 
                        className="btn btn-default save-btn" 
                        onClick={this.saveCurrPreset.bind(this)}>
                        Save
                    </button> 
                )
            }// if        
        };

        // setup delete button
        const showDeleteButton = () => {
            if (!defaultInUse) {
                // show delete button
                return (
                    <button 
                        className="btn btn-default save-btn" 
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
            <h1>Eq Page</h1>
            <div className="buttons-block">
            <div className="save-buttons">
                {showDeleteButton()}
                {showSaveButton()}
                <button 
                className="btn btn-default save-btn" 
                onClick={this.saveNewPreset.bind(this)}>
                Save As
                </button>
            </div>
            </div>
            <div className="eq-display">
            <ul className="preset-list">
                <h4>Select Preset</h4>
                {presetList}
            </ul>
            <SinglePreset 
                onParamChange={this.handleParamChange.bind(this)} 
                preset={this.state.currPreset}
            />
            </div>        
        </div>
        )
    }
}

export default Eq;