const mongoose = require('mongoose');
const { mongoURI } = require('../config/keys');

// connset to mongodb

mongoose.connect(mongoURI);
mongoose.Promise = global.Promise;

mongoose.connection.once('open', () => {
    console.log('connection has been made!');
    
}).on('error', error => console.log('Connection error: ', error));