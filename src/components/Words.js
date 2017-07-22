import React, { Component } from 'react';
import Word from './Word';

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