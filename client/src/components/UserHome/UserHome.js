import React from 'react';
import {Link} from 'react-router-dom';

const UserHome = (props) => {
        
    return (
        <div className="user-home-page">
            <h4>A Rudimentary autosave preset manager for Compressors and EQs.</h4>
            <p className="choose-proc">Choose Processor...</p>
            <div className="page-nav">
                <Link to={'/eq'} className="page-link btn">Eq</Link>
                <Link to={'/comp'} className="page-link btn">Comp</Link>
            </div>
        </div>
    )  
}

export default UserHome;

