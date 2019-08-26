import React, { Component } from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';

import Home from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { ConnectedSignup } from '../pages/Signup';
import { ConnectedSignin } from '../pages/Signin';

import JournalForm from '../pages/JournalForm';
import requireAuth from '../hoc/RequireAuth';
import ViewEntry from '../pages/ViewEntry';

export class App extends Component {
  public render(): JSX.Element {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={ConnectedSignup} />
        <Route path="/signin" component={ConnectedSignin} />
        <Route path="/journal/new" component={requireAuth('/')(JournalForm)} />
        <Route exact path="/journal/:id" component={ViewEntry} />
        <Route
          path="/journal/:id/edit"
          component={requireAuth('/')(JournalForm)}
        />
        <Route status={404} component={NotFound} />
      </Switch>
    );
  }
}
