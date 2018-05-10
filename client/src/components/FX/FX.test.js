import React from 'react';
import Helpers from '../../functions/helpers';
import stateFunctions from '../../functions/stateFunctions';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FX from './FX';
Enzyme.configure({ adapter: new Adapter() });

const compInfo = {
    fxType: 'comp',
    requestURI: '/api/user1234/comp',
    defaultPreset: {
        presetName: 'default comp',
        params: [
            {mode:"creative"},
            {attack:"10"},
            {release:"100"},
            {threshold:"-18"},
            {ratio:"4"},
            {presence:"0"},
            {makeUp:"0"},
        ]
    }
}

// test('that FX component renders something', () => {
//     const component = shallow(<FX info={compInfo}/>);
//     console.log(component);
// });

// test it mounts 

// test handlePresetChoice -- handlePresetChoice (presetId)
// recieves a preset Id from the presetList component and sets the corresponding preset as the current preset

test('that components handlePrestChoice function sets the currPreset with the given preset Id', () => {
    const fx = new FX();

    fx.state = {
        currPreset: {
            presetName: 'tom',
            _id: '3'
        },
        presets: [
        {
            presetName: 'dave',
            _id: '4'
        },
        {
            presetName: 'tom',
            _id: '3'
        },
    ]}

    fx.handlePresetChoice('1');
    console.log(fx.state.currPreset);

})
