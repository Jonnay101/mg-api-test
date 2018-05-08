import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Eq from './Eq';
import Comp from './Comp';
import UserHome from './UserHome';

require('./App.css');

class App extends Component { 

    render () {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route path='/' exact component={UserHome}/>
                        <Route path='/eq' component={Eq} />
                        <Route path='/comp' component={Comp} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }    
}

export default App;