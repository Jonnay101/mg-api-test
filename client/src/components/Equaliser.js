import React, { Component } from 'react';

class Equaliser extends Component {
    static defaultProps = {
        preset: {}
    }

    state = {    
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

    componentDidMount() {
        this.state.preset = this.props.props
    }

    // componentDidUpdate() {
    //     console.log(this.state);
    // }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    render() {
        const {hiBand,hiFreq,hiGain,hiShelf,hMidBand,hiMidFreq,hiMidGain,loMidBand,loMidHiQ,loMidFreq,loMidGain, loBand,loFreq,loGain,loShelf,presetName} = this.state
        
        return (
            <div className="equaliser">
                <div className="eq-control hiBand">
                    <input name="hiBand" className="eqKnob hiBand" type="checkbox" value={hiBand} onChange={this.handleChange.bind(this)}/>
                    <label ><span className="unit">On</span> hiBand</label>
                </div>
                <div className="eq-control hiFreq">
                    <input name="hiFreq" className="eqKnob hiFreq" type="number" value={hiFreq} onChange={this.handleChange.bind(this)}/>
                    <label ><span className="unit">(kHz)</span> hiFreq</label>
                </div>
                <div className="eq-control hiGain">
                    <input name="hiGain" className="eqKnob hiGain" type="number" value={hiGain} onChange={this.handleChange.bind(this)}/>
                    <label ><span className="unit">(dB)</span> hiGain</label>
                </div>
            </div>
        )
    }
}

export default Equaliser;