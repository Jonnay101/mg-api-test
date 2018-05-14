import { FETCH_PRESETS } from '../actions/types';

const initialState = {
    autoSave: false,
    currPreset: {},
    defaultInUse: true,
    error: null,
    presets: [],
    presetModified: false,
    presetNames: [],
    presetNamesId: [],
    userMessage: ''

}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PRESETS:
            //code block
            console.log('reducer');
            return {
                ...state,
                presets: action.payload
            }
        default:
            return state;
    }
}