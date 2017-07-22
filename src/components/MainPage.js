import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class MainPage extends Component {
    constructor() {
        super();
        this.generateGameId = this.generateGameId.bind(this);
    }

    generateGameId() {
        return Math.random().toString(36).slice(2, 8);
    }

    render() {
        return (
            <div className="MainPage">
                Welcome!
                <Link to={'/' + this.generateGameId()}>Click here to start new game</Link>
            </div>
        );
    }
}

export default MainPage;