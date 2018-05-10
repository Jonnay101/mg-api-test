import React from 'react';

export default {
    stringArrayToList : function (arr, className = 'list-item', onClickFunc = null) {
        //takes an array of strings, iterates over it and produces an array of <li> tags
        if (Array.isArray(arr)) {
            return arr.map((item, index, arr )=> {
                const keyNum = item.length * 1198301 * Math.random();
                return <li key={keyNum} className={className} onClick={onClickFunc} >{item}</li>;
            });
        } else {
            //console.log('this function requires an array as the first arg')
            throw new Error('this function requires an array as the first arg');            
        }        
    },
    nameIdArrayToList : function (arr, className = 'list-item', onClickFunc = null) {
        //takes an array of strings, iterates over it and produces an array of <li> tags
        if (Array.isArray(arr)) {
            return arr.map((item, index, arr )=> {
                const name = item[0];
                const id = item[1];
                return <li key={id} className={className} onClick={onClickFunc} id={id} >{name}</li>;
            });
        } else {
            //console.log('this function requires an array as the first arg')
            throw new Error('this function requires an array as the first arg');
        }        
    },
    getNamesFromPresets : function (presetsArr) {
        //takes an array of presets and returns an array of preset names
        if (Array.isArray(presetsArr)) {
            return presetsArr.map((preset) => {
                return preset.presetName;
            });
        } else {
            throw new Error('this function requires an array as the first arg');
        }
    },
    getNamesAndIdFromPresets : function (presetsArr) {
        //takes an array of presets and returns an array of preset names
        if (Array.isArray(presetsArr)) {
            return presetsArr.map((preset) => {
                return [preset.presetName, preset._id || 0];
            });
        } else {
            throw new Error('this function requires an array as the first arg');
        }
    },
    setPresetById : function (presetId, presetsArr) {
        //takes a preset id and an array of presets returns either the preset with the matching id or the default
        if (Array.isArray(presetsArr)) {
            const foundPreset = presetsArr.find((preset) => preset._id === presetId);
            return foundPreset ? {currPreset: foundPreset} : null;
        } else {
            throw new Error('this function requires an array as the first arg');
        }
    }
}