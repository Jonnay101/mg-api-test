const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({  
    userName:{type:String}, 
    compPresets: [{ type: Schema.Types.ObjectId, ref:'Comp' }],
    eqPresets: [{ type: Schema.Types.ObjectId, ref:'EQ' }]
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;
