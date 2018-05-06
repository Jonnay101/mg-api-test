import React from 'react';
import KnobGroup from './KnobGroup';
import Switch from './Switch';

// each eq band will contain...
// - frequency input
// - gain input
// - on/off switch
// - optional operational switch (eg Shelf/Peak, hiQ)

class EQBand extends React.Component {

    handleKnobChange(obj) {
        if (obj) {
            this.props.onBandChange(obj);
        }
    }

    render() {

        const { shelf, hiQ, EQBandName } = this.props;

        function extraSwitches () {
            if (shelf) {
                return <Switch switchName="shelf" />
            } else if (hiQ) {
                return <Switch switchName="hi-q" />
            }
        }

        return (
        <div className="eq-band" id={EQBandName}>
            <h3>{EQBandName}</h3>
            <Switch switchName="onOff"/>
            <KnobGroup 
                knobUnit="(kHz)"
                bandType="hi" 
                knobType="Freq" 
                freq={this.props.freq} 
                onKnobChange={this.handleKnobChange.bind(this)}
            />
            <KnobGroup />
            {extraSwitches()}
        </div>
        );
    }
}

export default EQBand;