import { IS_LOADING } from '../actions/types';

const initState = false;

export default function (state = initState, action) {
    switch(action.type) {
        case IS_LOADING:  
            return action.isLoading;
        default: 
            return state;
    }
}