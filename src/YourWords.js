import React, { Component } from 'react';

class YourWords extends Component {
    render() {
        var wordsHTML = [];
        var word;
        for (var i = 0; i < this.props.words.length; i++) {
            word = this.props.words[i];
            wordsHTML.push(
                <li key={i}>
                    {word}
                </li>
            );
        }

        return (
            <div className="YourWords">
                {wordsHTML}
            </div>
        );
    }
}

export default YourWords;