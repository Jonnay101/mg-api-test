const mongoose = require('mongoose');
const {Schema} = mongoose;

const EQPresetSchema = new Schema({
    presetName: {
        type: String,
        required: [true, 'you must enter a preset name']
    },
    loBand: {
        type: String,
        default: 'on'
    },
    loPeakShelf: {
        type: String,
        default: 'shelf'
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
        type: String,
        default: 'on'
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
        type: String,
        default: 'on'
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
        type: String,
        default: 'on'
    },
    hiPeakShelf: {
        type: String,
        default: 'shelf'
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
// Low peak/shelf = peak
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
// Hi peak/shelf = peak
// Hi freq (kHz) = 6.0
// Hi gain = +4

/*
=================== JSON eq preset model =======================

{
    "presetName": "Male Rock Vocal",
    "loBand": "on",
    "loPeakShelf": "shelf",
    "loFreq": 163,
    "loGain": 2,
    "loMidBand": "on",
    "loMidHiQ": true,
    "loMidFreq": 290,
    "loMidGain": -6,
    "hiMidBand": "on",
    "hiMidFreq": 2.4,
    "hiMidGain": -2,
    "hiBand": "on",
    "hiPeakShelf": "shelf",
    "hiFreq": 7.2,
    "hiGain": 4
}
*/ 