const mongoose = require('mongoose');
const { Schema } = mongoose;

const CompPresetSchema = new Schema({
    presetName: {
        type: 'String',
        required: [true, 'you must enter a preset name']
    },
    params: []
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
    params: [
        {"mode": "creative"},
        {"attack": 27},
        {"release": 45},
        {"threshold": -18},
        {"ratio": 2.2},
        {"presence": 3},
        {"makeUp": 3}
    ]
}

*/