const mongoose = require('mongoose');
const {Schema} = mongoose;

const EQPresetSchema = new Schema({
    presetName: {
        type: String,
        required: [true, 'you must enter a preset name']
    },
    loBand: {
        type: Boolean,
        default: true
    },
    loShelf: {
        type: Boolean,
        default: true
    },
    loFreq: {
        type: Number,
        default: 80,
        min: [0, 'lo frequency too low (below 0 Hz)'],
        max: [48000, 'lo frequency too high (above 48000 Hz)']
    },
    loGain: {
        type: Number,
        default: 0,
        min: [-24,'can\'t cut lo more than 24 dB'],
        max: [24,'can\'t boost lo more than 24 dB']
    },
    loMidBand: {
        type: Boolean,
        default: true
    },
    loMidHiQ: {
        type: Boolean,
        default: false
    },
    loMidFreq: {
        type: Number,
        default: 290,
        min: [0, 'lo mid frequency too low (below 0 Hz)'],
        max: [48000, 'lo mid frequency too high (above 48000 Hz)']
    },
    loMidGain: {
        type: Number,
        default: 0,
        min: [-24,'can\'t cut low mids more than 24 dB'],
        max: [24,'can\'t boost low mids more than 24 dB']
    },
    hiMidBand: {
        type: Boolean,
        default: true
    },
    hiMidFreq: {
        type: Number,
        default: 2.4,
        min: [0, 'hi mid frequency too low (below 0 kHz)'],
        max: [48, 'hi mid frequency too high (above 48 kHz)']
    },
    hiMidGain: {
        type: Number,
        default: 0,
        min: [-24,'can\'t cut hi mids more than 24 dB'],
        max: [24,'can\'t boost hi mids more than 24 dB']
    },
    hiBand: {
        type: Boolean,
        default: true
    },
    hiShelf: {
        type: Boolean,
        default: true
    },
    hiFreq: {
        type: Number,
        default: 7,
        min: [0, 'hi frequency too low (below 0 kHz)'],
        max: [48, 'hi frequency too high (above 48 kHz)']
    },
    hiGain: {
        type: Number,
        default: 0,
        min: [-24,'can\'t cut hi more than 24 dB'],
        max: [24,'can\'t boost hi more than 24 dB']
    }
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
    "loBand": true,
    "loShelf": true,
    "loFreq": 163,
    "loGain": 2,
    "loMidBand": true,
    "loMidHiQ": true,
    "loMidFreq": 290,
    "loMidGain": -6,
    "hiMidBand": true,
    "hiMidFreq": 2.4,
    "hiMidGain": -2,
    "hiBand": true,
    "hiShelf": true,
    "hiFreq": 7.2,
    "hiGain": 4
}

{
    "presetName": "Warm DI Bass",
    "loBand": true,
    "loShelf": true,
    "loFreq": 110,
    "loGain": 4,
    "loMidBand": true,
    "loMidHiQ": false,
    "loMidFreq": 700,
    "loMidGain": 2,
    "hiMidBand": true,
    "hiMidFreq": 1.6,
    "hiMidGain": 3,
    "hiBand": true,
    "hiShelf": true,
    "hiFreq": 12,
    "hiGain": -3
}

{
    "presetName": "Big Snare",
    "loBand": true,
    "loShelf": false,
    "loFreq": 160,
    "loGain": 5,
    "loMidBand": true,
    "loMidHiQ": false,
    "loMidFreq": 1500,
    "loMidGain": 2,
    "hiMidBand": true,
    "hiMidFreq": 3,
    "hiMidGain": 2.5,
    "hiBand": true,
    "hiShelf": true,
    "hiFreq": 8,
    "hiGain": 10
}
*/ 