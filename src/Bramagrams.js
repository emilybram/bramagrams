import React, { Component } from 'react';
import Utils from './Utils';
        
const letterDict = {
    'a' : 13,
    'b' : 3,
    'c' : 3,
    'd' : 6,
    'e' : 18,
    'f' : 3,
    'g' : 4,
    'h' : 3,
    'i' : 12,
    'j' : 2,
    'k' : 2,
    'l' : 5,
    'm' : 3,
    'n' : 8,
    'o' : 11,
    'p' : 3,
    'q' : 2,
    'r' : 9,
    's' : 6,
    't' : 9,
    'u' : 6,
    'v' : 3,
    'w' : 3,
    'x' : 2,
    'y' : 3,
    'z' : 2
};

class Letter extends Component {
    render() {
        return (
            <div className="Letter">
                {this.props.letter}
            </div>
        );
    }
}

class Bramagrams extends Component {
    constructor() {
        super();
        var letters = this.allLetters();
        Utils.shuffle(letters);
        this.state = {
            unflipped: letters,
            flipped: []
        };
        this.flipLetter = this.flipLetter.bind(this);
        this.allLetters = this.allLetters.bind(this);
    }

    allLetters() {
        var letters = [];
        for (var letter in letterDict) {
            for (var i = 0; i < letterDict[letter]; i++) {
                letters.push(letter);
            }
        }
        return letters;
    }

    flipLetter() {
        var newUnflipped = this.state.unflipped.slice();
        var newFlipped = this.state.flipped.slice();
        var newLetter = newUnflipped.pop();
        var letterHTML = (
            <Letter letter={newLetter} />
        );
        newFlipped.push(letterHTML);
        this.setState({
            unflipped: newUnflipped,
            flipped: newFlipped
        });
    }

    render() {
        return (
            <div className="Bramagrams">
                <div className="Letters">
                    {this.state.flipped}
                </div>
                <div className="Button" onClick={this.flipLetter}>
                    Flip
                </div>
            </div>
        );
    }
}

export default Bramagrams;