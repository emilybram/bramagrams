import React from 'react';
import { Route, Redirect } from 'react-router';
import { BrowserRouter, withRouter } from 'react-router-dom';

import App from './components/App';
import MainPage from './components/MainPage';

const newGameId = () => {
  return Math.random().toString(36).slice(2, 8);
};

const Routes = (props) => (
  <BrowserRouter {...props}>
     <div>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/new" render={() => (<Redirect to={'/game/' + newGameId()}/>)}/>
        <Route path="/game/:gameId" component={GameApp} />
    </div>
  </BrowserRouter>
);

const GameApp = ({ match }) => {
  return <App gameId={match.params.gameId} />
}

export default Routes;