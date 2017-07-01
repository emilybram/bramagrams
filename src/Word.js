import React, { Component } from 'react';
import Letter from './Letter';

class Word extends Component {
    render() {

        var wordHTML = [];
        for (var i = 0; i < this.props.word.length; i++) {
            wordHTML.push(
                <Letter letter={this.props.word[i]} key={i} />
                );
        }

        return (
            <div className="Word">
                {wordHTML}
            </div>
        );
    }
}

export default Word;