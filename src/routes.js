import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter, withRouter } from 'react-router-dom';

import App from './components/App';
import MainPage from './components/MainPage';

const Routes = (props) => (
  <BrowserRouter {...props}>
     <div>
        <Route exact path="/" component={MainPage} />
        <Route path="/:gameId" component={GameApp} />
    </div>
  </BrowserRouter>
);

const GameApp = ({ match }) => {
  return <App gameId={match.params.gameId} />
}

export default Routes;