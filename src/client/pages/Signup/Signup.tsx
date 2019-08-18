import React, { Component, FormEvent, ChangeEvent } from 'react';

import { container } from '../../styles/container.css';
import { form } from './signup.css';
import { StateProps, DispatchProps } from './index';
import { StatusCode } from '../../components/StatusCode';
import { Redirect } from 'react-router';

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
      <form
        action="/api/signup"
        method="post"
        className={[container, form].join(' ')}
        onSubmit={this.submitForm}
      >
        <header>
          <h1>Signup</h1>
          {typeof error === 'string' ? <p>{error}</p> : null}
        </header>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            name="email"
            onChange={this.updateValue}
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={this.updateValue}
          />
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            id="confirm"
            type="password"
            name="confirmPassword"
            onChange={this.updateValue}
            value={confirmPassword}
          />
        </div>

        <footer>
          <button type="submit">Create User</button>
        </footer>
      </form>
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

  private updateValue = (event: ChangeEvent<HTMLInputElement>): void => {
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
