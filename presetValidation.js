module.exports = {
    comp1 : {
        presetName:'dave',
        params: [
            {mode: 'creative'},
            {attack: 41},
            {release: 358},
            {threshold: -38},
            {ratio: 4},
            {presence: 4},
            {makeUp: 3.4}
        ]
    },
    comp2 : {
        presetName:'dave',
        params: [
    
        ]
    },
    comp3 : {
        presetName:'dave'
    },
    defaultCompParams : [
        {mode: 'creative'},
        {attack: 10},
        {release: 100},
        {threshold: -18},
        {ratio: 4},
        {presence: 0},
        {makeUp: 0}
    ],
    eq1 : {
        presetName:'bright vox',
        params: [
            {hiBand: false},
            {hiShelf: false},
            {hiFreq: 4},
            {hiGain: 6},
            {hiMidBand: true},
            {hiMidFreq: 2.1},
            {hiMidGain: 2},
            {loMidBand: true},
            {loMidHiQ: false},
            {loMidFreq: 350},
            {loMidGain: -2},
            {loBand: true},
            {loShelf: true},
            {loFreq: 130},
            {loGain: -4},
        ]
    },
    eq2 : {
        presetName:'dave',
        params: [
    
        ]
    },
    eq3 : {
        presetName:'dave'
    },
    defaultEqParams : [
        {hiBand: true},
        {hiShelf: true},
        {hiFreq: 8},
        {hiGain: 0},
        {hiMidBand: true},
        {hiMidFreq: 2},
        {hiMidGain: 0},
        {loMidBand: true},
        {loMidHiQ: true},
        {loMidFreq: 290},
        {loMidGain: 0},
        {loBand: true},
        {loShelf: true},
        {loFreq: 80},
        {loGain: 0},
    ],
    getKeysFromObjInArr : function (arr) {
        // takes an array, gets the keys form each object in the  returns an array
        return arr.map((param, ind, arr) => {
            return Object.keys(param).pop();
        });
    },
    validatePreset : function (preset, defParamArray ) {
        // takes a preset, checks preset has all the required params, fills in any blanks, returns a new preset
        if (typeof preset === 'object') {
            if (arguments.length == 2 && Array.isArray(defParamArray)) {
                const presetParam = preset.params || [];
                const newPreset = {};
                newPreset.presetName = preset.presetName || 'default';
                newPreset.params = defParamArray.map((param, ind) => {
                    // if the index exists on presetParams return that param else return the default param
                    if (presetParam[ind]) {
                        return presetParam[ind]
                    }
                    return param;
                })
                return newPreset;
            } else {
                throw new Error('validatePreset requires an array as the second argument');
            }      
        } else {
            throw new Error('validatePreset: first arg should be an object');
        }
        
    }

}