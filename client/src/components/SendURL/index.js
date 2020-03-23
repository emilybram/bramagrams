import React from 'react';
import Clipboard from 'clipboard';
import './index.css';

const SendURL = ({ gameId }) => {
        new Clipboard('.btn');
        return (
            <div className="SendURL">
                Send your friend this link: 
                <div className="inputGroup">
                    <input readOnly id="gameUrl" value={"https://bramagrams.herokuapp.com/game/" + gameId}/>
                    <button className="btn" data-clipboard-target="#gameUrl">
                        Copy    
                    </button>
                </div>
            </div>
        );
}

export default SendURL;