import React from 'react';
import PropTypes from 'prop-types';

// import SingleParam from './SingleParam';
// import SwitchParam from './SwitchParam';
import FXParam from './FXParam';

class SinglePreset extends React.Component {
    constructor (props) {
        super(props)
        this.handleParamChange = this.handleParamChange.bind(this)
    }

    handleParamChange (obj) {
        this.props.onParamChange(obj)
    }

    render(){
        const {preset, fxType} = this.props;

        if (fxType.toLowerCase() === 'eq') {
            return (
                <div className="single-preset">        
                    <h4>preset: <span className="chosen-preset">{this.props.preset.presetName}</span></h4>
    
                    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="hiBand" 
                        param={preset.hiBand} 
                        presetId={preset._id}
                        paramUnit = "On"
                        fxType = {fxType}
                    />
    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="hiShelf"
                        param={preset.hiShelf} 
                        presetId={preset._id}
                    />
    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="hiFreq" 
                        param={preset.hiFreq} 
                        presetId={preset._id}
                    />
                    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="hiGain" 
                        param={preset.hiGain} 
                        presetId={preset._id}
                    />
    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="hiMidBand" 
                        param={preset.hiMidBand} 
                        presetId={preset._id}
                    />
    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="hiMidFreq" 
                        param={preset.hiMidFreq} 
                        presetId={preset._id}
                    />
                    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="hiMidGain" 
                        param={preset.hiMidGain} 
                        presetId={preset._id}
                    />
    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="loMidBand" 
                        param={preset.loMidBand} 
                        presetId={preset._id}
                    />
    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="loMidHiQ" 
                        param={preset.loMidHiQ} 
                        presetId={preset._id}
                    />
    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="loMidFreq" 
                        param={preset.loMidFreq} 
                        presetId={preset._id}
                    />
    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="loMidGain" 
                        param={preset.loMidGain} 
                        presetId={preset._id}
                    />
                    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="loBand" 
                        param={preset.loBand} 
                        presetId={preset._id}
                    />
    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="loShelf" 
                        param={preset.loShelf} 
                        presetId={preset._id}
                    />
    
                    <FXParam 
                        onParamChange={this.handleParamChange.bind(this)} 
                        paramName="loFreq" 
                        param={preset.loFreq} 
                        presetId={preset._id}
                    />
    
                    <FXParam 
                        onParamChange={this.handleParamChange.bind(this)} 
                        paramName="loGain" 
                        param={preset.loGain} 
                        presetId={preset._id}
                    />
                </div>
            )
        } else if (fxType.toLowerCase() === 'comp') {
            return (
                <div className="single-preset">        
                    <h4>preset: <span className="chosen-preset">{this.props.preset.presetName}</span></h4>
    
                    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="mode" 
                        param={preset.mode}
                        presetId={preset._id}
                        paramUnit = "On"
                        fxType = {fxType}
                    />
    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="attack"
                        param={preset.attack} 
                        presetId={preset._id}
                    />
    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="release" 
                        param={preset.release} 
                        presetId={preset._id}
                    />
                    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="threshold" 
                        param={preset.threshold} 
                        presetId={preset._id}
                    />
    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="ratio" 
                        param={preset.ratio} 
                        presetId={preset._id}
                    />
    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="presence" 
                        param={preset.presence} 
                        presetId={preset._id}
                    />
                    
                    <FXParam 
                        onParamChange={this.handleParamChange} 
                        paramName="makeUp" 
                        param={preset.makeUp} 
                        presetId={preset._id}
                    />
                </div>
            )
        }
        
    }
        

        
        
}

SinglePreset.PropTypes = {
    onParamChange:PropTypes.func.isRequired,
    preset: PropTypes.shape({
        // EQ propTypes
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
        // comp propTypes...
    })
}

export default SinglePreset;
  