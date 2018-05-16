import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PresetList from '../PresetList/PresetList';
import SinglePreset from '../SinglePreset/SinglePreset';
import ButtonBar from '../ButtonBar/ButtonBar';

require('./FX.css');

class FX extends Component {

    static defaultProps = {
        info: {}
    };

    render () {
        // render vars
        const { info } = this.props;
        const fxBodyTag = `${info.fxType}-fx-body fx-body`;

        //main output
        return (
            
            <div className={fxBodyTag}>
                <ButtonBar info={info}/>
                <h1 style={{color: 'white'}}>{info.fxType}</h1>
                <div className='fx-controls-body'>
                    <PresetList info={info}/>
                    <SinglePreset info={info} />
                </div>
            </div>
        );
    };
};

FX.PropTypes = {
    info: PropTypes.object.isRequired
}

export default FX;