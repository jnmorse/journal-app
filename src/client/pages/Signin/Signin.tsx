import React, { Component, FormEvent, ChangeEvent } from 'react';
import { Redirect } from 'react-router-dom';

import { container } from '../../styles/container.css';
import { form } from './signup.css';
import { StateProps, DispatchProps } from './index';
import { StatusCode } from '../../components/StatusCode';

interface SigninState {
  email: string;
  password: string;
  error: string | null;
}

type SigninProps = StateProps & DispatchProps;

export class Signin extends Component<SigninProps, SigninState, null> {
  public state = {
    email: '',
    password: '',
    error: null
  };

  public render() {
    console.log('signin props', this.props);
    const { email, password, error } = this.state;
    const { user } = this.props;

    if (user && user.id) {
      return (
        <StatusCode code={301}>
          <Redirect to="/" />
        </StatusCode>
      );
    }

    return (
      <form className={[container, form].join(' ')} onSubmit={this.submitForm}>
        <header>
          <h1>Signin</h1>
          {typeof error === 'string' ? <p>{error}</p> : null}
        </header>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
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

    this.props.signinUser({ email, password });
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
