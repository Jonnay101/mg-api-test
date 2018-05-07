import React from 'react';
import SinglePreset from './SinglePreset';
require('./Eq.css');


class Eq extends React.Component {
    constructor (props) {
        super(props)
        
        this.state = {
            presets: [],
            currPreset: {},
            currPresetAltered: false,
            defaultPreset: true,
            activeIndex: null
        }// end of state       
    }

    getEqPresets = () => {
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

        this.setState({currPreset: defaultPreset});

        fetch('/api/user1234/eq')
            .then((res) => res.json())
            .then((data) => this.setState({presets: data}, () => console.log('get request' ,this.state)))
            .catch((err) => console.log('sorry, there\'s been an error... ' + err))
    }

    handlePresetClick(event) {
        const presetId = event.target.id;
        const { presets } = this.state;
        
        const newCurrPreset = presets.find((preset, ind) => {
        return preset._id === presetId;
        })
        
        this.setState({
        currPreset: newCurrPreset,
        defaultPreset: false
        }, function () {
        //console.log(this.state.currPreset);
        });
    }

    handleParamChange (paramObj) {
        const { currPreset, currPresetAltered } = this.state;
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
        const { presets, currPreset } = this.state;
        const newId = (presets.length + 1).toString(); // not needed for POST request
        const newName = prompt('please enter a name for your new preset');        
        
        // saving to state
        // if (newName && newName.length > 0) {
        //     const newCurrPreset = { ...currPreset, presetName: newName, _id: newId};
        //     const newPresets = [...presets, newCurrPreset]; 
 
        //     this.setState({
        //         currPreset: newCurrPreset,
        //         currPresetAltered: false,
        //         presets: newPresets
        //     }, () => console.log(this.state.presets));
        // } else {
        //     this.setState({error: 'you must give a new preset a name'});
        // }

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
                    const newPresets = this.getEqPresets().bind(this); 
                    console.log(postedPreset);
                    this.setState({
                        currPreset: postedPreset,
                        currPresetAltered: false,
                        defaultPreset: false
                    }, () => console.log('POST request', this.state));
                })
                .catch(err => console.log(err.message));
        }
    }

    render() {

        const { currPresetAltered, defaultPreset } = this.state;
        
        // setup save buttons
        const showSaveButton = () => {
        if (currPresetAltered && !defaultPreset) {
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

        //poulate the preset list
        const presetList = this.state.presets.map((preset, ind) => {
        return (
            <li 
            onClick={this.handlePresetClick.bind(this)} 
            key={preset._id} id={preset._id} 
            className="preset-item btn">{preset.presetName}
            </li>
        );
        });    
        
        //return main component
        return (
        <div className="eq-page">
            <h1>Eq Page</h1>
            <div className="buttons-block">
            <div className="save-buttons">
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