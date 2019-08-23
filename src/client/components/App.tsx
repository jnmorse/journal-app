import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { ConnectedSignup } from '../pages/Signup';
import { ConnectedSignin } from '../pages/Signin';

import JournalForm from './JournalForm';

export class App extends Component {
  public render(): JSX.Element {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={ConnectedSignup} />
        <Route path="/signin" component={ConnectedSignin} />
        <Route path="/journal/new" component={JournalForm} />
        <Route status={404} component={NotFound} />
      </Switch>
    );
  }
}
