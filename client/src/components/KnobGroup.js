import React from 'react';
import Input from './Input';

class KnobGroup extends React.Component {

    handleInputChange(obj) {
        this.props.onKnobChange(obj)
    }

    render() {
        const { knobType, freq, gain } = this.props;

        const freqOrGain = () => {
            if (knobType === 'Freq') {
                return( <Input 
                    bandType={this.props.bandType}
                    inputType={this.props.knobType} 
                    onInputChange={this.handleInputChange.bind(this)} 
                    displayValue={freq}
                    />
                )
            } else if (knobType === 'Gain') {
                return( <Input 
                    bandType={this.props.bandType}
                    inputType={this.props.knobType} 
                    onInputChange={this.handleInputChange.bind(this)} 
                    displayValue={gain}/>
                )
            }
        };

        return (
            <div>
                <h5>{this.props.knobUnit}</h5>
                {freqOrGain()}
            </div>
        );
    }
}

export default KnobGroup;