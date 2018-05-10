import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PresetList from './PresetList';

Enzyme.configure({ adapter: new Adapter() });

test('that PresetList component renders something', () => {
    const component = shallow(<PresetList />);
    console.log(component);
});


