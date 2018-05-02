const mongoose = require('mongoose');
const { Schema } = mongoose;

// create new compressor schema
const CompPresetSchema = new Schema({
    presetName: {
        type: 'String',
        required: [true, 'you must enter a preset name']
    },
    mode: {
        type: String,
        default: 'creative'
    },
    attack: {
        type: Number,
        default: 20,
        min: [0.2, 'attack time parameter must be set slower than 0.2ms'],
        max: [200, 'attack time parameter must be set faster than 200ms']
    },
    release: {
        type: Number,
        default: 100,
        min: [5, 'attack time parameter must be set slower than 5ms'],
        max: [5000, 'attack time parameter must be set faster than 5000ms'],
        required: true
    },
    threshold: {
        type: Number,
        default: -18,
        min: [-60, 'threshold parameter must be set higher than -60 dB'],
        max: [22, 'threshold parameter must be set lower than 22 dB'],
        required: true
    },
    ratio: {
        type: Number,
        default: 2,
        min: [1, 'ratio parameter must be set higher than 1:1']
    },
    presence: {
        type: Number,
        default: 0,
        min: [-10, 'presence parameter must be set higher than -10 dB'],
        max: [10, 'presence parameter must be set lower than 10 dB']
    },
    makeUp: {
        type: Number,
        default: 0,
        min: [-24, 'makeUp parameter must be set higher than -24 dB'],
        max: [24, 'makeUp parameter must be set lower than 24 dB']
    }
});


const CompPreset = mongoose.model('compPreset', CompPresetSchema);

module.exports = CompPreset;

// Mode = creative
// Attack (ms) = 20
// Release (ms) = 10
// Threshold (dB) = -10
// Ratio = 7:1
// Presence (dB) = -7
// Make up (dB) = 8

// ============== JSON compressor preset model =================
/*

{
    "presetName": "Bouncy Kick Drum",
    "mode": "creative",
    "attack": 27,
    "release": 45,
    "threshold": -18,
    "ratio": 2.2,
    "presence": 3,
    "makeUp": 3
}

{
    "presetName": "Vocal Peak Reduction",
    "mode": "creative",
    "attack": 0.5,
    "release": 26,
    "threshold": -12,
    "ratio": 6,
    "presence": 2,
    "makeUp": 2
}

*/