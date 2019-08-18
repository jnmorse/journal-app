import React, { Component, FormEvent, ChangeEvent } from 'react';
import { Redirect } from 'react-router-dom';

import { container } from '../../styles/container.css';
import { form } from './signup.css';
import { StateProps, DispatchProps } from './index';
import { StatusCode } from '../../components/StatusCode';
import { ActionTypes } from '../../actions';

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

  public render() {
    const { email, password, error, success } = this.state;
    const { user } = this.props;

    if (success) {
      return (
        <StatusCode code={301}>
          <Redirect to="/" />
        </StatusCode>
      );
    }

    return (
      <form
        method="post"
        action="/api/signin"
        className={[container, form].join(' ')}
        onSubmit={this.submitForm}
      >
        <header>
          <h1>Signin</h1>
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
        </div>

        <footer>
          <button type="submit">Signin</button>
        </footer>
      </form>
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
