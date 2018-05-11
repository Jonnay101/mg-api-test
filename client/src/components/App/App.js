import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from '../Header/Header';
import FX from '../FX/FX';
import UserHome from '../UserHome/UserHome';

const compInfo = {
    fxType: 'comp',
    requestURI: '/api/user1234/comp',
    defaultPreset: {
        presetName: 'default comp',
        params: [
            {mode:"creative"},
            {attack:10},
            {release:100},
            {threshold:-18},
            {ratio:4},
            {presence:0},
            {makeUp:0},
        ]
    }
}

const eqInfo = {
    fxType: 'eq',
    requestURI: '/api/user1234/eq',
    defaultPreset: {
        presetName: 'default eq',
        params: [
            {hiBand: true},
            {hiShelf: true},
            {hiFreq: 7},
            {hiGain: 0},
            {hiMidBand: true},
            {hiMidFreq: 2.4},
            {hiMidGain: 0},
            {loMidBand: true},
            {loMidHiQ: true},
            {loMidFreq: 290},
            {loMidGain: 0},
            {loBand: true},
            {loShelf: true},
            {loFreq: 80},
            {loGain: 0}
        ]
    }
}

require('./App.css');

class App extends Component { 

    render () {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route path='/' exact component={UserHome}/>
                        <Route path='/eq' render={() => <FX info={eqInfo}/>} />
                        <Route path='/comp' render={() => <FX info={compInfo}/>} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }    
}

export default App;