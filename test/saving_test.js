const expect = require('chai').expect;
const Comp = require('../models/Comp');
const Eq = require('../models/EQ');
const Val = require('../presetValidation');

console.log(Val.defaultCompParams, Val.defaultEqParams);


describe('saving compressor records', function () {

    it ('should be invalid without a presetName', function(done) {
        var comp = new Comp();

        comp.validate(function(err) {
            expect(err.errors.presetName).to.exist;
            done();
        })
    });

    it ('should create a preset with with the given values', function(done) {

        var comp = new Comp(Val.validatePreset(Val.comp1, Val.defaultCompParams));

        comp.validate(function(err) {   
            
            expect(comp.params).to.be.an.instanceof(Array);
            expect(comp.params[0].mode).to.equal('creative');
            expect(comp.params[1].attack).to.equal(41);
            expect(comp.params[2].release).to.equal(358);
            expect(comp.params[3].threshold).to.equal(-38);
            expect(comp.params[4].ratio).to.equal(4);            
            expect(comp.params[5].presence).to.equal(4);
            expect(comp.params[6].makeUp).to.equal(3.4);
            done();
        });
            
    });

    it ('should create a preset (populate default values) when only the presetName is given', function(done) {

        var comp = new Comp(Val.validatePreset(Val.comp3, Val.defaultCompParams));

        comp.validate(function(err) {            
            
            expect(comp.params).to.be.an.instanceof(Array);
            expect(comp.params[0].mode).to.equal('creative');
            expect(comp.params[1].attack).to.equal(10);
            expect(comp.params[2].release).to.equal(100);
            expect(comp.params[3].threshold).to.equal(-18);
            expect(comp.params[4].ratio).to.equal(4);            
            expect(comp.params[5].presence).to.equal(0);
            expect(comp.params[6].makeUp).to.equal(0);
            done();
        });
            
    });

    it ('should create a preset when the presetName and an empty array are given ', function(done) {

        var comp = new Comp(Val.validatePreset(Val.comp2, Val.defaultCompParams));

        comp.validate(function(err) {            
            
            expect(comp.params).to.be.an.instanceof(Array);
            expect(comp.params[0].mode).to.equal('creative');
            expect(comp.params[1].attack).to.equal(10);
            expect(comp.params[2].release).to.equal(100);
            expect(comp.params[3].threshold).to.equal(-18);
            expect(comp.params[4].ratio).to.equal(4);            
            expect(comp.params[5].presence).to.equal(0);
            expect(comp.params[6].makeUp).to.equal(0);
            done();
        });
            
    });
});

describe('saving eq records', function () {

    it ('should be invalid without a presetName', function(done) {
        var eq = new Eq();

        eq.validate(function(err) {
            expect(err.errors.presetName).to.exist;
            done();
        })
    });

    it ('should create a preset with with the given values', function(done) {

        var eq = new Eq(Val.validatePreset(Val.eq1, Val.defaultEqParams));

        eq.validate(function(err) {   
            
            expect(eq.params).to.be.an.instanceof(Array);
            expect(eq.params[0].hiBand).to.equal(false);
            expect(eq.params[1].hiShelf).to.equal(false);
            expect(eq.params[2].hiFreq).to.equal(4);
            expect(eq.params[3].hiGain).to.equal(6);
            expect(eq.params[4].hiMidBand).to.equal(true);
            expect(eq.params[5].hiMidFreq).to.equal(2.1);
            expect(eq.params[6].hiMidGain).to.equal(2);
            expect(eq.params[7].loMidBand).to.equal(true);
            expect(eq.params[8].loMidHiQ).to.equal(false);
            expect(eq.params[9].loMidFreq).to.equal(350);
            expect(eq.params[10].loMidGain).to.equal(-2);
            expect(eq.params[11].loBand).to.equal(true);
            expect(eq.params[12].loShelf).to.equal(true);
            expect(eq.params[13].loFreq).to.equal(130);
            expect(eq.params[14].loGain).to.equal(-4);
            done();
        });            
    });

    it ('should create a preset (populate default values) when only the presetName is given', function(done) {

        var eq = new Eq(Val.validatePreset(Val.eq3, Val.defaultEqParams));

        eq.validate(function(err) {   

            expect(eq.params).to.be.an.instanceof(Array);
            expect(eq.params[0].hiBand).to.equal(true);
            expect(eq.params[1].hiShelf).to.equal(true);
            expect(eq.params[2].hiFreq).to.equal(7);
            expect(eq.params[3].hiGain).to.equal(0);
            expect(eq.params[4].hiMidBand).to.equal(true);
            expect(eq.params[5].hiMidFreq).to.equal(2.4);
            expect(eq.params[6].hiMidGain).to.equal(0);
            expect(eq.params[7].loMidBand).to.equal(true);
            expect(eq.params[8].loMidHiQ).to.equal(true);
            expect(eq.params[9].loMidFreq).to.equal(290);
            expect(eq.params[10].loMidGain).to.equal(0);
            expect(eq.params[11].loBand).to.equal(true);
            expect(eq.params[12].loShelf).to.equal(true);
            expect(eq.params[13].loFreq).to.equal(80);
            expect(eq.params[14].loGain).to.equal(0);
            done();
        });
            
    });

    it ('should create a preset when the presetName and an empty array are given ', function(done) {

        var eq = new Eq(Val.validatePreset(Val.eq2, Val.defaultEqParams));

        eq.validate(function(err) {   

            expect(eq.params).to.be.an.instanceof(Array);
            expect(eq.params[0].hiBand).to.equal(true);
            expect(eq.params[1].hiShelf).to.equal(true);
            expect(eq.params[2].hiFreq).to.equal(7);
            expect(eq.params[3].hiGain).to.equal(0);
            expect(eq.params[4].hiMidBand).to.equal(true);
            expect(eq.params[5].hiMidFreq).to.equal(2.4);
            expect(eq.params[6].hiMidGain).to.equal(0);
            expect(eq.params[7].loMidBand).to.equal(true);
            expect(eq.params[8].loMidHiQ).to.equal(true);
            expect(eq.params[9].loMidFreq).to.equal(290);
            expect(eq.params[10].loMidGain).to.equal(0);
            expect(eq.params[11].loBand).to.equal(true);
            expect(eq.params[12].loShelf).to.equal(true);
            expect(eq.params[13].loFreq).to.equal(80);
            expect(eq.params[14].loGain).to.equal(0);
            done();
        });
            
    });
});
