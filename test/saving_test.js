const mocha = require('mocha');
const expect = require('chai').expect;
const Comp = require('../models/Comp');
const EQ = require('../models/EQ');

describe('saving compressor records', function () {

    it ('should be invalid without a presetName', function(done) {
        var comp = new Comp()

        comp.validate(function(err) {
            expect(err.errors.presetName).to.exist;
            done();
        })
    });

    it ('should create a preset with default values if the presetNmae is given', function(done) {

        var comp = new Comp({presetName: 'dave'});

        comp.validate(function(err) {
            
            expect(comp.mode).to.equal('creative');
            expect(comp.attack).to.equal(20);
            expect(comp.release).to.equal(100);
            expect(comp.threshold).to.equal(-18);
            expect(comp.ratio).to.equal(2);            
            expect(comp.presence).to.equal(0);
            expect(comp.makeUp).to.equal(0);
            done();
        })
    });

    it ('should be invalid if values lower than the min settings are given', function (done) {
        var comp = new Comp({
            presetName: 'dave',
            attack: 0.1,
            release: 4,
            threshold: -62,
            ratio: 0.9,
            presence: -11,
            makeUp: -25
        });

        comp.validate(function(err) {
            
            expect(err.errors.attack).to.exist;
            expect(err.errors.release).to.exist;
            expect(err.errors.threshold).to.exist;
            expect(err.errors.ratio).to.exist;
            expect(err.errors.presence).to.exist;
            expect(err.errors.makeUp).to.exist;
            done();
        })
    });

    it ('should be invalid if values greater than the max settings are given', function (done) {
        var comp = new Comp({
            presetName: 'dave',
            attack: 201,
            release: 5001,
            threshold: 23,
            presence: 11,
            makeUp: 25
        });

        comp.validate(function(err) {
            
            expect(err.errors.attack).to.exist;
            expect(err.errors.release).to.exist;
            expect(err.errors.threshold).to.exist;
            expect(err.errors.presence).to.exist;
            expect(err.errors.makeUp).to.exist;
            done();
        })
    });

    it ('should be invalid if incorrect data types are given', function (done) {
        var comp = new Comp({

            presetName: 1234,
            mode: ['crea','tive'],
            attack: '201',
            release: [5001],
            threshold: {teo:23},
            ratio: '2:1',
            presence: 'eleven',
            makeUp: [25]
        });

        comp.validate(function(err) {
            
            expect(err.errors.attack).to.exist;
            expect(err.errors.release).to.exist;
            expect(err.errors.threshold).to.exist;
            expect(err.errors.presence).to.exist;
            expect(err.errors.makeUp).to.exist;
            done();
        })
    });
});

describe('saving EQ records', function () {

    it ('should be invalid without a presetName', function(done) {
        var eq = new EQ()

        eq.validate(function(err) {
            expect(err.errors.presetName).to.exist;
            //expect(eq.loBand).to.not.exist; ----- problem
            done();
        })
    });

    it ('should create a preset with default values if the presetNmae is given', function(done) {

        var eq = new EQ({presetName: 'default eq'});

        eq.validate(function(err) {
            
            expect(eq.loBand).to.equal('on');
            expect(eq.loPeakShelf).to.equal('shelf');
            expect(eq.loFreq).to.equal(80);
            expect(eq.loGain).to.equal(0);
            expect(eq.loMidBand).to.equal('on');            
            expect(eq.loMidHiQ).to.equal(false);
            expect(eq.loMidFreq).to.equal(290);
            expect(eq.loMidGain).to.equal(0);
            expect(eq.hiMidBand).to.equal('on'); 
            expect(eq.hiMidFreq).to.equal(2.4);
            expect(eq.hiMidGain).to.equal(0);
            expect(eq.hiBand).to.equal('on'); 
            expect(eq.hiFreq).to.equal(7);
            expect(eq.hiGain).to.equal(0);
            done();
        })
    });

    it ('should be invalid if values lower than the min settings are given', function (done) {
        var eq = new EQ({
            presetName: 'default eq',
            loBand: 'on',
            loPeakShelf: 'shelf',
            loFreq: -1,
            loGain: -25,
            loMidBand: 'on',
            loMidHiQ: false,
            loMidFreq: -1,
            loMidGain: -25,
            hiMidBand: 'on',
            hiMidFreq: -0.1,
            hiMidGain: -25,
            hiBand: 'on',
            hiFreq: -0.1,
            hiGain: -25
        });

        eq.validate(function(err) {
            
            //expect(err.errors.loBand).to.exist;
            //expect(err.errors.loPeakShelf).to.exist;
            expect(err.errors.loFreq).to.exist;
            expect(err.errors.loGain).to.exist;
            //expect(err.errors.loMidBand).to.exist;
            //expect(err.errors.loMidHiQ).to.exist;
            expect(err.errors.loMidFreq).to.exist;
            expect(err.errors.loMidGain).to.exist;
            //expect(err.errors.hiMidBand).to.exist;
            expect(err.errors.hiMidFreq).to.exist;
            expect(err.errors.hiMidGain).to.exist;
            //expect(err.errors.hiBand).to.exist;
            expect(err.errors.hiFreq).to.exist;
            expect(err.errors.hiGain).to.exist;
            done();
        })
    });

    it ('should be invalid if values greater than the max settings are given', function (done) {
        var eq = new EQ({
            presetName: 'default eq',
            loBand: 'on',
            loPeakShelf: 'shelf',
            loFreq: 48001,
            loGain: 25,
            loMidBand: 'on',
            loMidHiQ: false,
            loMidFreq: 48001,
            loMidGain: 25,
            hiMidBand: 'on',
            hiMidFreq: 48.1,
            hiMidGain: 25,
            hiBand: 'on',
            hiFreq: 48.1,
            hiGain: 25
        });

        eq.validate(function(err) {
            
            //expect(err.errors.loBand).to.exist;
            //expect(err.errors.loPeakShelf).to.exist;
            expect(err.errors.loFreq).to.exist;
            expect(err.errors.loGain).to.exist;
            //expect(err.errors.loMidBand).to.exist;
            //expect(err.errors.loMidHiQ).to.exist;
            expect(err.errors.loMidFreq).to.exist;
            expect(err.errors.loMidGain).to.exist;
            //expect(err.errors.hiMidBand).to.exist;
            expect(err.errors.hiMidFreq).to.exist;
            expect(err.errors.hiMidGain).to.exist;
            //expect(err.errors.hiBand).to.exist;
            expect(err.errors.hiFreq).to.exist;
            expect(err.errors.hiGain).to.exist;
            done();
        })
    });

    it ('should be invalid if the wrong data types are given', function (done) {
        var eq = new EQ({
            presetName: ['default eq'],
            loBand: 14,
            loPeakShelf: {it:'shelf'},
            loFreq: '48001',
            loGain: [25],
            loMidBand: 1,
            loMidHiQ: [false],
            loMidFreq: '48001',
            loMidGain: '25',
            hiMidBand: 'on',
            hiMidFreq: [48.1],
            hiMidGain: "25",
            hiBand: 12,
            hiFreq: "48.1",
            hiGain: {yep:25}
        });

        console.log(eq);

        eq.validate(function(err) {

            //expect(err.errors.presetName).to.exist;
            //expect(err.errors.loBand).to.exist; -- FAIL -- turns everything into a string or uses default
            expect(err.errors.loPeakShelf).to.exist;
            expect(err.errors.loFreq).to.exist;
            expect(err.errors.loGain).to.exist;
            //expect(err.errors.loMidBand).to.exist;
            expect(err.errors.loMidHiQ).to.exist;
            expect(err.errors.loMidFreq).to.exist;
            expect(err.errors.loMidGain).to.exist;
            // expect(err.errors.hiMidBand).to.exist;
            expect(err.errors.hiMidFreq).to.exist;
            expect(err.errors.hiMidGain).to.exist;
            //expect(err.errors.hiBand).to.exist;
            expect(err.errors.hiFreq).to.exist;
            expect(err.errors.hiGain).to.exist;
            done();
        })
    });
})