import { SET_DEFAULT_IN_USE, UNSET_DEFAULT_IN_USE } from '../actions/types';

const intitialState = {
    defaultInUse: true
}

export default function (state = intitialState, action) {
    switch(action.type) {
        case SET_DEFAULT_IN_USE:         
            return action.payload;
        case UNSET_DEFAULT_IN_USE:        
            return action.payload;
        default: 
            return state;
    }
}