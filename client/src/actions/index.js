import { 
    PRESET_SELECTED, 
    TOGGLE_AUTO_SAVE, 
    SET_DEFAULT_IN_USE, 
    UNSET_DEFAULT_IN_USE,
    ADD_NEW_PRESET,
    DELETE_PRESET,
    UPDATE_PARAMS,
    GET_PRESETS,
    REPORT_ERROR,
    IS_LOADING
} from './types';

export function getFxPresets(fxURI) {
    return function (dispatch) {
        dispatch(isLoading(true));
        fetch(fxURI)
            .then(res => {
                if(res.ok) {                    
                    dispatch(isLoading(false));
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(presets => {                
                dispatch({
                    type: GET_PRESETS,
                    payload: presets
                });
            })
            .catch(err => dispatch(reportError(err)));
    };
};

export function addNewPreset (fxURI, preset) {
    return function (dispatch) {
        fetch(fxURI, {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(preset)
        })
            .then(res => {
                if(res.ok) {
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(preset => {
                dispatch({
                    type: ADD_NEW_PRESET,
                    payload: preset
                });
                dispatch(selectPreset(preset));
                dispatch(unsetDefaultInUse());
            })
            .catch(err => dispatch(reportError(err)))
    }
}

export function deletePreset (fxURI, preset) {
    return function (dispatch) {
        fetch(`${fxURI}/${preset._id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if(res.ok) {
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(preset => {
                dispatch({
                    type: DELETE_PRESET,
                    payload: preset
                });
            })
            .catch(err => dispatch(reportError(err)));
    };
};

export function updateParams (fxURI, paramTuple) {
    return function (dispatch) {        
        fetch(fxURI, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(paramTuple)
        })
            .then(res => {
                if(res.ok) {
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(preset => {
                dispatch(selectPreset(preset))
                dispatch({
                    type: UPDATE_PARAMS,
                    payload: preset
                })
            })
            .catch(err => dispatch(reportError(err)));
    }
}

export function selectPreset(preset) {
    // return an action from this action creator-- object with type property
    // sets the currPreset
    return {
        type: PRESET_SELECTED,
        payload: preset
    };
};

export function toggleAutoSave(setting) {
    // return an action from this action creator-- object with type property
    return {
        type: TOGGLE_AUTO_SAVE,
        payload: setting
    };
};

export function setDefaultInUse() {
    // return an action from this action creator-- object with type property
    return {
        type: SET_DEFAULT_IN_USE,
        payload: true
    };
};

export function unsetDefaultInUse() {
    // return an action from this action creator-- object with type property
    return {
        type: UNSET_DEFAULT_IN_USE,
        payload: false
    };
};

export function reportError(err) {
    return {
        type: REPORT_ERROR,
        hasErrored: err
    };
};

export function isLoading(bool) {
    return {
        type: IS_LOADING,
        isLoading: bool
    };
};