import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

const Routes = (props) => (
  <BrowserRouter {...props}>
     <div>
        <Route path="/" component={App} />
    </div>
  </BrowserRouter>
);

export default Routes;