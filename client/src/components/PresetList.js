import React from 'react';
import PresetItem from './PresetItem';
import Equaliser from './Equaliser';

class PresetList extends React.Component {    

    state = {
        presets: [],
        isLoading: false,
        error: null,
        activePreset: {
            hiBand:true,
            hiFreq:7,
            hiGain:0,
            hiShelf:true,
            hMidBand:true,
            hiMidFreq:2.4,
            hiMidGain:0,
            loMidBand:true,
            loMidHiQ:false,
            loMidFreq:290,
            loMidGain:0,
            loBand:true,
            loFreq:80,
            loGain:0,
            loShelf:true,
            presetName:"Default"
        }
    }

    componentDidMount () {
        this.setState({isLoading: true});
        
        fetch("/api/user1234/eq")
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Something went webkitConvertPointFromNodeToPage...');
                }               
            })
            .then(data => {
                this.setState({ presets: data, isLoading: false });
            })
            .catch(error => this.setState({ error, isLoading: false}));       
    }

    handleClickedPreset(id) {
        const newActivePreset = this.state.presets.find(function (preset) {
            return preset._id === id;
        });

        this.setState({activePreset: newActivePreset});
    }

    render() {
        const { error, isLoading, presets } = this.state;
        const { activePreset } = this.state;

        const presetNames = presets.map((preset, index) => {
            const { presetName, _id } = preset;
            return <PresetItem key={index} presetId={_id} presetName={presetName} presetClicked={this.handleClickedPreset.bind(this)} />;
        });

        if(error) {
            // error reporting
            return <p>{error.message}</p>
        } 

        if(isLoading) {
            // load warning
            return <h2>Loading...</h2>
        }

        return (
            <div className="presetList">
                <h2>{'waiting'}</h2>
                <ul className="presetList">
                    {[presetNames]}
                </ul>
                <Equaliser preset={activePreset}/>
            </div>
        );
    }
}

export default PresetList;