const mongoose = require('mongoose');
const {Schema} = mongoose;

const EQPresetSchema = new Schema({
    presetName: {
        type: String,
        required: [true, 'you must enter a preset name']
    },
    params: [Schema.Types.Mixed]
    
});

const EQPreset = mongoose.model('eqPreset', EQPresetSchema);

module.exports = EQPreset;

// Low band = On
// Low /shelf = 
// Low freq (Hz) = 108
// Low gain = +4
// Low/Mid band = On
// Low/Mid Hi/Low Q = Hi
// Low/Mid freq (Hz) = 290
// Low/mid gain = -4
// Hi/Mid band = On
// Hi/Mid freq (kHz) = 2.4
// Hi/Mid gain = +2
// Hi band = On
// Hi /shelf = 
// Hi freq (kHz) = 6.0
// Hi gain = +4

/*
=================== JSON eq preset model =======================

{
    "presetName": "Male Rock Vocal",
    params: [        
        {"hiBand": true},
        {"hiShelf": true},
        {"hiFreq": 7.2},
        {"hiGain": 4},
        {"hiMidBand": true},
        {"hiMidFreq": 2.4},
        {"hiMidGain": -2,}
        {"loMidBand": true},
        {"loMidHiQ": true},
        {"loMidFreq": 290},
        {"loMidGain": -6},
        {"loBand": true},
        {"loShelf": true},
        {"loFreq": 163},
        {"loGain": 2},
    ]
}
*/