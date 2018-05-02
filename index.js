const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fxRoutes = require('./routes/fxRoutes');
const { mongoURI } = require('./config/keys');

// create express app
const app = express();

// connect to mongodb
mongoose.connect(mongoURI);
mongoose.Promise = global.Promise;

// parse the incoming data
app.use(bodyParser.json());

// create the routes for comp presets
app.use('/api', fxRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
    console.log('listening on port:' + PORT);
});