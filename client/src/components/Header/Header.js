import React, { Component } from 'react';
import { Link } from 'react-router-dom';
require('./Header.css');


class Header extends Component {
    render() {
        return (
            <div className="nav-bar">
                <Link to={'/'} className="nav-link">Home</Link>
                <Link to={'/eq'} className="nav-link">Eq</Link>
                <Link to={'/comp'} className="nav-link">Comp</Link>
            </div>
        )
    }
}

export default Header;