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
        <a href='https://github.com/emilybram/bramagrams'>
            <button>
                Source Code
            </button>
        </a>
    </div>

export default Welcome;