const express = require('express');
const router = express.Router();
const Comp = require('../models/Comp');
const EQ =  require('../models/EQ');

router.get('/user1234/:fx', (req, res, next) => {
    // get all comp or eq presets
    var { fx } = req.params;

    if (fx === 'comp') {
        Comp.find({}).then(compPresets => res.send(compPresets[0]._id));
    } else if (fx === 'eq') {
        EQ.find({}).then(eqPresets => res.send(eqPresets));
    }
});

router.post('/user1234/:fx', (req, res, next) => {
    var { fx } = req.params;

    if (fx === 'comp') {
        Comp.create(req.body).then(comp => res.send(comp));
    } else if (fx === 'eq') {
        EQ.create(req.body).then(eq => res.send(eq));
    }
});

router.put('/user1234/:fx/:id', (req, res, next) => {
    var { fx, id } = req.params;

    if (fx === 'comp') {
        Comp.findByIdAndUpdate({_id: id}, req.body ).then(() => {
            Comp.findOne({_id: id}).then(compPreset => res.send(compPreset));
        });


    } else if (fx === 'eq') {
        EQ.find({_id: id}, req.body).then(() => {
            EQ.findOne({_id: id}).then(eqPreset => res.send(eqPreset));
        });
    }
});



module.exports = router;
