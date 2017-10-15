import React from 'react';
import { Link } from 'react-router-dom'
import './index.css';

const Welcome = () => 
    <div className="Welcome">
        <h1> Bramagrams </h1>
        <br/>
        <Link to={'/new'}>
            <button>
                New Game
            </button>
        </Link>
        <br/>
    </div>

export default Welcome;