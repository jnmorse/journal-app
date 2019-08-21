import React, { Component, FormEvent, ChangeEvent } from 'react';
import { Form, Container, Button, Alert } from 'react-bootstrap';

import { StateProps, DispatchProps } from './index';
import { StatusCode } from '../../components/StatusCode';
import { Redirect } from 'react-router';
import { Layout } from '../../components/Layout';

interface SignupState {
  email: string;
  password: string;
  confirmPassword: string;
  error: string | null;
}

export class Signup extends Component<
  StateProps & DispatchProps,
  SignupState,
  null
> {
  public state = {
    email: '',
    password: '',
    confirmPassword: '',
    error: null
  };

  public renderError() {
    const { error } = this.state;

    if (!error) {
      return null;
    }

    return <Alert variant="danger">{error}</Alert>;
  }

  public render() {
    if (this.props.user.id) {
      return (
        <StatusCode code={301}>
          <Redirect to="/" />
        </StatusCode>
      );
    }

    const { email, password, confirmPassword, error } = this.state;

    return (
      <Layout>
        <Container>
          <Form
            action="/api/signup"
            method="post"
            onSubmit={this.submitForm}
            autoComplete="off"
          >
            <header>
              <h1>Signup</h1>
              {this.renderError()}
            </header>

            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                as="input"
                type="email"
                value={email}
                required
                name="email"
                onChange={this.updateValue}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                as="input"
                type="password"
                name="password"
                required
                value={password}
                onChange={this.updateValue}
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                onChange={this.updateValue}
                required
                value={confirmPassword}
              />
            </Form.Group>

            <footer>
              <Button color="primary" type="submit">
                Create User
              </Button>
            </footer>
          </Form>
        </Container>
      </Layout>
    );
  }

  private submitForm = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { email, password, confirmPassword } = this.state;

    if (!password.length || !confirmPassword.length) {
      return this.setState({ error: 'password fields are required' });
    } else if (password !== confirmPassword) {
      return this.setState({ error: 'Passwords do not match' });
    }

    this.props.signupUser({ email, password });
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
