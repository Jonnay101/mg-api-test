import { SET_CURR_PARAM } from '../actions/types';

export default function (state = null, action) {
    switch(action.type) {
        case SET_CURR_PARAM:
            return action.payload;            
        default: 
            return state;
    }
}