import React from 'react';
import PropTypes from 'prop-types';

import SingleParam from './SingleParam';
import SwitchParam from './SwitchParam';

class SinglePreset extends React.Component {
    constructor (props) {
        super(props)
        this.handleParamChange = this.handleParamChange.bind(this)
    }

    handleParamChange (obj) {
        this.props.onParamChange(obj)
    }

    render(){
        const {preset} = this.props;
        
        return (
            <div className="single-preset">        
                <h4>preset: <span className="chosen-preset">{this.props.preset.presetName}</span></h4>
                
                <SwitchParam 
                    onParamChange={this.handleParamChange} 
                    paramName="hiBand" 
                    param={preset.hiBand} 
                    presetId={preset._id}
                    paramUnit = "On"
                />

                <SwitchParam 
                    onParamChange={this.handleParamChange} 
                    paramName="hiShelf"
                    param={preset.hiShelf} 
                    presetId={preset._id}
                    paramUnit = "Shelf"
                />

                <SingleParam 
                    onParamChange={this.handleParamChange} 
                    paramName="hiFreq" 
                    param={preset.hiFreq} 
                    presetId={preset._id}
                    paramUnit = "kHz"
                />
                
                <SingleParam 
                    onParamChange={this.handleParamChange} 
                    paramName="hiGain" 
                    param={preset.hiGain} 
                    presetId={preset._id}
                    paramUnit = "dB"
                />

                <SwitchParam 
                    onParamChange={this.handleParamChange} 
                    paramName="hiMidBand" 
                    param={preset.hiMidBand} 
                    presetId={preset._id}
                    paramUnit = "On"
                />

                <SingleParam 
                    onParamChange={this.handleParamChange} 
                    paramName="hiMidFreq" 
                    param={preset.hiMidFreq} 
                    presetId={preset._id}
                    paramUnit = "kHz"
                />
                
                <SingleParam 
                    onParamChange={this.handleParamChange} 
                    paramName="hiMidGain" 
                    param={preset.hiMidGain} 
                    presetId={preset._id}
                    paramUnit = "dB"
                />

                <SwitchParam 
                    onParamChange={this.handleParamChange} 
                    paramName="loMidBand" 
                    param={preset.loMidBand} 
                    presetId={preset._id}
                    paramUnit = "On"
                />

                <SwitchParam 
                    onParamChange={this.handleParamChange} 
                    paramName="loMidHiQ" 
                    param={preset.loMidHiQ} 
                    presetId={preset._id}
                    paramUnit = "Hi Q"
                />

                <SingleParam 
                    onParamChange={this.handleParamChange} 
                    paramName="loMidFreq" 
                    param={preset.loMidFreq} 
                    presetId={preset._id}
                    paramUnit = "kHz"
                />

                <SingleParam 
                    onParamChange={this.handleParamChange} 
                    paramName="loMidGain" 
                    param={preset.loMidGain} 
                    presetId={preset._id}
                    paramUnit = "dB"
                />
                
                <SwitchParam 
                    onParamChange={this.handleParamChange} 
                    paramName="loBand" 
                    param={preset.loBand} 
                    presetId={preset._id}
                    paramUnit = "On"
                />

                <SwitchParam 
                    onParamChange={this.handleParamChange} 
                    paramName="loShelf" 
                    param={preset.loShelf} 
                    presetId={preset._id}
                    paramUnit = "Shelf"
                />

                <SingleParam 
                    onParamChange={this.handleParamChange.bind(this)} 
                    paramName="loFreq" 
                    param={preset.loFreq} 
                    presetId={preset._id}
                    paramUnit = "kHz"
                />

                <SingleParam 
                    onParamChange={this.handleParamChange.bind(this)} 
                    paramName="loGain" 
                    param={preset.loGain} 
                    presetId={preset._id}
                    paramUnit = "dB"
                />
            </div>
        )
    }
}

SinglePreset.PropTypes = {
    onParamChange:PropTypes.func.isRequired,
    preset: PropTypes.shape({
        hiBand:PropTypes.bool,
        hiShelf:PropTypes.bool,
        hiFreq:PropTypes.number,
        hiGain:PropTypes.number,
        hiMidBand:PropTypes.bool,
        hiMidFreq:PropTypes.number,
        hiMidGain:PropTypes.number,
        loMidBand:PropTypes.bool,
        loMidHiQ:PropTypes.bool,
        loMidFreq:PropTypes.number,
        loMidGain:PropTypes.number,
        loBand:PropTypes.bool,
        loShelf:PropTypes.bool,
        loFreq:PropTypes.number,
        loGain:PropTypes.number,
        presetName:PropTypes.string
    })
}

export default SinglePreset;
  