import { PRESET_SELECTED } from '../actions/types';

const intitialState = {
    currPreset: {}
}

export default function (state = intitialState, action) {
    switch(action.type) {
        case PRESET_SELECTED:           
            return action.payload;
        default: 
            return state;
    }
}