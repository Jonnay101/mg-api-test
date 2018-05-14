import { FETCH_PRESETS, SET_PRESET_NAME_ID } from './types';

export const fetchPresets = (unknown, props) => dispatch => {
    console.log('fetching presets', props);
    fetch(props.info.requestURI).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            throw new Error('getPreset action is not working')
        }
    })
    .then(data => {
        console.log(data)
        dispatch({
            type: FETCH_PRESETS, payload: data
        });
    })
    .catch(err => err);
}

export const setPresetNamesId = (arg) => dispatch => {
    console.log(arg)
    dispatch({
        type: SET_PRESET_NAME_ID, payload: arg
    });
}