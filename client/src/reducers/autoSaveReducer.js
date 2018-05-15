import { TOGGLE_AUTO_SAVE } from '../actions/types';

const initState = false;

export default function (state = initState, action) {
    switch(action.type) {
        case TOGGLE_AUTO_SAVE:  
            return action.payload;
        default: 
            return state
    }   
}