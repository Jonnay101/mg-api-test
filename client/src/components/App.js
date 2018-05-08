import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Eq from './Eq';
import Comp from './Comp';

require('./App.css');

const User = () => <h2>User Page</h2>;

class App extends Component { 

    render () {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route path='/' exact component={User}/>
                        <Route path='/eq' component={Eq} />
                        <Route path='/comp' component={Comp} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }    
}

export default App;