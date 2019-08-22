import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';

import Home from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { ConnectedSignup } from '../pages/Signup';
import { ConnectedSignin } from '../pages/Signin';

import favicon from '../images/quill.png';
import { Layout } from './Layout';

export class App extends Component {
  public render(): JSX.Element {
    return (
      <>
        <Helmet htmlAttributes={{ lang: 'en-US' }}>
          <meta
            name="description"
            content="save your hopes, dreams, and any other journal like content"
          />
          <link rel="shortcut icon" href={favicon} type="image/png" />
          <title>Journal App</title>
        </Helmet>

        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" component={ConnectedSignup} />
            <Route path="/signin" component={ConnectedSignin} />
            <Route
              path="/journal/new"
              component={() => <Layout>Test</Layout>}
            />
            <Route status={404} component={NotFound} />
          </Switch>
        </main>
      </>
    );
  }
}
