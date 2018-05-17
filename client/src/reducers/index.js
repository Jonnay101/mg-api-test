import { combineReducers } from 'redux';
import presetsReducer from './presetsReducer';
import currPresetReducer from './currPresetReducer';
import autoSaveReducer from './autoSaveReducer';
import defaultInUseReducer from './defaultInUseReducer';
import isLoadingReducer from './isLoadingReducer';
import hasErroredReducer from './hasErroredReducer';
import currParamReducer from './currParamReducer';

export default combineReducers({
    autoSave: autoSaveReducer,
    currPreset: currPresetReducer,
    defaultInUse: defaultInUseReducer,
    presets: presetsReducer,
    isLoading: isLoadingReducer,
    hasErrored: hasErroredReducer,
    currParam: currParamReducer
});