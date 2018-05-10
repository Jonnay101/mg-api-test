import React from 'react';
import Helpers from '../functions/helpers';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('that stringArrayToList renders something', () => {
    const names = ['dave', 'colin', 'pete'];
    const component = shallow(<ul>{Helpers.stringArrayToList(names)}</ul>);
    console.log(component);
});

// describe('test stringArrayToList function', () => {

//     // it('should return an array when given an array', () => {
//     //     const arr = ['dave', 'colin', 'pete'];

//     //     const arrLi = Helpers.stringArrayToList(arr);

//     //     expect(arrLi).toEqual([<li className="list-item">dave</li>,<li className="list-item">colin</li>,<li className="list-item">pete</li>,]);
//     // });  
    
//     it('should throw an error when not given an array', () => {

//         const arrLi = Helpers.stringArrayToList('not array');
//         expect(arrLi).toThrow();
//     }); 
// });

// describe('test getNamesFromPresets function', () => {

//     it('should return an array of names when given an array of presets', () => {
//         const names = ['dave', 'colin', 'pete'];
//         const presetsArr = [
//             {presetName: 'dave'},
//             {presetName: 'colin'},
//             {presetName: 'pete'}
//         ];

//         const namesArr = Helpers.getNamesFromPresets(presetsArr);
//         expect(namesArr).toEqual(names);
//     });    
// });