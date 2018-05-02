const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Comp = require('../models/Comp');
const EQ =  require('../models/EQ');

router.get('/user1234', (req, res, next) => {
    // get all presets (comp and eq) presets = {comp:compObj, eq:eqObj}
    User.find({}).populate('Comp EQ').then(compPresets => res.send(compPresets));
    //res.send({type: 'GET'});
});

router.post('/user1234/:fx', (req, res, next) => {
    var { fx } = req.params;

    if (fx === 'comp') {
        Comp.create(req.body).then(comp => res.send(comp));
    } else if (fx === 'eq') {
        EQ.create(req.body).then(eq => res.send(eq));
    } else if (fx === 'user') {
        User.create(req.body).then(user => res.send(user));
    }  
});

module.exports = router;
