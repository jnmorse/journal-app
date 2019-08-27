import React, { Component, FormEvent, ChangeEvent } from 'react';
import { Form, Container, Button, Alert } from 'react-bootstrap';

import { StateProps, DispatchProps } from './index';
import { StatusCode } from '../../components/StatusCode';
import { Redirect } from 'react-router';
import { Layout } from '../../components/Layout';
import SEO from '../../components/SEO';
import { ActionTypes } from '../../actions';

interface SignupState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  success: boolean;
  error: string | null;
}

export class Signup extends Component<
  StateProps & DispatchProps,
  SignupState,
  null
> {
  public state: SignupState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    success: false,
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
    if (this.state.success) {
      return (
        <StatusCode code={302}>
          <Redirect to="/signin" />
        </StatusCode>
      );
    }

    const { email, password, confirmPassword, username } = this.state;

    return (
      <Layout>
        <SEO title="Signup" description="Signup for Digital Journal" />
        <Container>
          <Form action="/api/signup" method="post" onSubmit={this.submitForm}>
            <header>
              <h1>Signup</h1>
              <p>All Fields Required</p>
              {this.renderError()}
            </header>

            <Form.Group controlId="email">
              <Form.Label>Email*</Form.Label>
              <Form.Control
                as="input"
                type="email"
                autoComplete="username email"
                value={email}
                required
                name="email"
                onChange={this.updateValue}
              />
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Label>Username*</Form.Label>
              <Form.Control
                as="input"
                type="text"
                value={username}
                autoComplete="nickname"
                required
                name="username"
                onChange={this.updateValue}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password*</Form.Label>
              <Form.Control
                as="input"
                type="password"
                name="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={this.updateValue}
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password*</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                onChange={this.updateValue}
                autoComplete="new-password"
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

  private submitForm = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const { email, password, confirmPassword, username } = this.state;

    if (!password.length || !confirmPassword.length) {
      return this.setState({ error: 'password fields are required' });
    } else if (password !== confirmPassword) {
      return this.setState({ error: 'Passwords do not match' });
    }

    const action = await this.props.signupUser({ username, email, password });

    if (action.type === ActionTypes.Signup_Success) {
      this.setState({
        success: true
      });
    }
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
