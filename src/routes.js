import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Auth from './components/Auth';
import Console from './components/Console';

const history = createBrowserHistory();

const RootRoutes = () => (
  <BrowserRouter history={history}>
    <Switch>
      <Route
        path="/auth"
        component={Auth}
      />
      <Route
        path="/console"
        component={Console}
      />
      <Redirect
        from="/"
        to="auth"
      />
    </Switch>
  </BrowserRouter>
);

export default RootRoutes
