const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compRoutes = require('./routes/compRoutes');
const { mongoURI } = require('./config/keys');


const app = express();

// connect to mongodb
mongoose.connect(mongoURI);
mongoose.Promise = global.Promise;

// parse the incoming data
app.use(bodyParser.json());

// create the routes for comp presets
app.use('/api', compRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
    console.log('listening on port:' + PORT);
});