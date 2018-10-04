import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import configureStore from './store/ConfigureStore';
import RootContainer from './scaffold/RootContainer';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <RootContainer />
    </Router>
  </Provider>, document.getElementById('react'),
);
