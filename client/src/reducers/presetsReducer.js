import { ADD_NEW_PRESET, DELETE_PRESET, GET_PRESETS, UPDATE_PARAMS } from '../actions/types.js';

const initState = [];

export default function (state = initState, action) {
    switch(action.type) {
        case GET_PRESETS:
            return [
                ...action.payload
            ]
        case ADD_NEW_PRESET:
            return [
                ...state,
                action.payload
            ]
        case DELETE_PRESET:
            const delPreset = action.payload;
            return state.filter(preset => {
                return delPreset._id !== preset._id;
            })
        case UPDATE_PARAMS:
            const updatePreset = action.payload;
            const index = state.findIndex(preset => {
                return updatePreset._id === preset._id;
            })
            const newState = [...state];
            newState[index] = action.payload;
        default: 
            return state;
    };
}