import React from 'react';
import { Link } from 'react-router-dom'

const MainPage = () => {
        return (
            <div className="MainPage">
                Welcome!
                <Link to={'/new'}>Click here to start new game</Link>
            </div>
        );
};

export default MainPage;