const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fxRoutes = require('./routes/fxRoutes');
const { mongoURI } = require('./config/keys');

// create express app
const app = express();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/client/build'));
}

// connect to mongodb
mongoose.connect(mongoURI);
mongoose.Promise = global.Promise;

// parse the incoming data
app.use(bodyParser.json());




// create the routes for comp presets
app.use('/api', fxRoutes);

// error handling for routes
app.use(function (err, req, res, next) {
    console.log(err)
    res.status(422).send({error: err.message});
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
    console.log('listening on port:' + PORT);
});