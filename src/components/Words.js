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

class Words extends Component {
    render() {
        var wordsHTML = [];
        var word;
        for (var i = 0; i < this.props.words.length; i++) {
            word = this.props.words[i];
            wordsHTML.push(
                <Word word={word} key={i} />
            );
        }

        return (
            <div className={"Words " + this.props.className}>
                {wordsHTML}
            </div>
        );
    }
}

export default Words;