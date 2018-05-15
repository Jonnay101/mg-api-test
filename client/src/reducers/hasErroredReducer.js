import { REPORT_ERROR } from '../actions/types';

const initState = false;

export default function (state = initState, action) {
    switch(action.type) {
        case REPORT_ERROR: 
            return action.hasErrored;
        default: 
            return state;
    }
}