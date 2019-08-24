import React, { Component, FormEvent, ChangeEvent } from 'react';
import { Redirect } from 'react-router-dom';

import { StateProps, DispatchProps } from './index';
import { StatusCode } from '../../components/StatusCode';
import { ActionTypes } from '../../actions';
import { Layout } from '../../components/Layout';
import SEO from '../../components/SEO';
import { Container, Form, Button, Alert } from 'react-bootstrap';

interface SigninState {
  email: string;
  password: string;
  error: string | null;
  success: boolean;
}

type SigninProps = StateProps & DispatchProps;

export class Signin extends Component<SigninProps, SigninState, null> {
  public state = {
    email: '',
    password: '',
    error: null,
    success: false
  };

  public renderError() {
    const { error } = this.state;

    if (!error) {
      return null;
    }

    return <Alert variant="danger">{error}</Alert>;
  }

  public render() {
    const { email, password, error, success } = this.state;
    const { user } = this.props;

    if (success || user) {
      return (
        <StatusCode code={301}>
          <Redirect to="/" />
        </StatusCode>
      );
    }

    return (
      <Layout>
        <SEO title="Signin" description="Signin to Digital Journal" />
        <Container>
          <Form method="post" action="/api/signin" onSubmit={this.submitForm}>
            <header>
              <h1>Signin</h1>
            </header>

            {this.renderError()}

            <div>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  name="email"
                  onChange={this.updateValue}
                  value={email}
                  type="email"
                  placeholder="someone@somewhere.com"
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.updateValue}
                />
              </Form.Group>
            </div>

            <footer>
              <Button color="primary" type="submit">
                Signin
              </Button>
            </footer>
          </Form>
        </Container>
      </Layout>
    );
  }

  private submitForm = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { email, password } = this.state;

    if (!password.length) {
      return this.setState({ error: 'Password is required' });
    } else if (!email.length) {
      return this.setState({ error: 'Email is Required' });
    }

    this.props.signinUser({ email, password }).then(response => {
      if (response.type === ActionTypes.Signin_Success) {
        return this.setState({ success: true });
      }

      return this.setState({ error: "Username or Password Don't match" });
    });
  };

  private updateValue = (event: ChangeEvent<any>): void => {
    const { name, value } = event.target;
    this.setState(prevState => {
      if (prevState.hasOwnProperty(name)) {
        return {
          ...prevState,
          [name]: value
        };
      }
    });
  };
}
