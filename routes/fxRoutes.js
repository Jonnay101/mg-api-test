const express = require('express');
const router = express.Router();
const Comp = require('../models/Comp');
const EQ =  require('../models/EQ');
const Val = require('../presetValidation');

// get all presets
router.get('/user1234/:fx', function (req, res, next) {
    // get all comp or eq presets depending on fx
    var { fx } = req.params;

    if (fx === 'comp') {

        Comp.find({}).then(compPresets => res.send(compPresets)).catch(next);

    } else if (fx === 'eq') {

        EQ.find({}).then(eqPresets => res.send(eqPresets)).catch(next);

    }
});

// get singular preset
router.get('/user1234/:fx/:id', function (req, res, next) {
    // get single comp or eq preset depending on fx
    var { fx, id } = req.params;

    if (fx === 'comp') {

        Comp.findById({_id: id}).then(compPreset => res.send(compPreset)).catch(next);

    } else if (fx === 'eq') {

        EQ.findById({_id: id}).then(eqPreset => res.send(eqPreset)).catch(next);

    }
});

// add new preset
router.post('/user1234/:fx', (req, res, next) => {
    // insert new fx presets depending on :fx 
    var { fx } = req.params;

    if (fx === 'comp') {

        const postComp = Val.validatePreset(req.body, Val.defaultCompParams);

        Comp.create(postComp).then(comp => res.send(comp)).catch(next);

    } else if (fx === 'eq') {

        const postEq = Val.validatePreset(req.body, Val.defaultEqParams);

        EQ.create(postEq).then(eq => res.send(eq)).catch(next);

    }
});

//update existing preset
router.put('/user1234/:fx/:id', (req, res, next) => {
    // update fx presets depending on :fx and :id
    var { fx, id } = req.params;

    if (fx === 'comp') {

        Comp.findByIdAndUpdate({_id: id}, req.body, {new: true, setDefaultsOnInsert: true} ).then((compPreset) => {

            res.send(compPreset);

        }).catch(next);


    } else if (fx === 'eq') {

        EQ.findByIdAndUpdate({_id: id}, req.body, {new: true, setDefaultsOnInsert: true}).then((eqPreset) => {

            res.send(eqPreset);

        }).catch(next);
    }
});

// remove a preset
router.delete('/user1234/:fx/:id', (req, res, next) => {
    // update fx presets depending on :fx and :id
    var { fx, id } = req.params;

    if (fx === 'comp') {

        Comp.findByIdAndRemove({_id: id}).then((compPreset) => {

            res.send(compPreset);

        }).catch(next);


    } else if (fx === 'eq') {

        EQ.findByIdAndRemove({_id: id}).then((eqPreset) => {

            res.send(eqPreset);
            
        }).catch(next);
    }
});





module.exports = router;
