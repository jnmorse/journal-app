import React, { Component, FormEvent, ChangeEvent } from 'react';

import { container } from '../../styles/container.css';
import { form } from './signup.css';
import axios from 'axios';

interface SigninState {
  email: string;
  password: string;
  error: string | null;
}

export class Signin extends Component<{}, SigninState, null> {
  public state = {
    email: '',
    password: '',
    confirmPassword: '',
    error: null
  };

  public render() {
    const { email, password, confirmPassword, error } = this.state;

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

    this.testSignin();
  };

  private async testSignin(): Promise<void> {
    const { email, password } = this.state;
    const response = await axios.post('/api/signin', { email, password });

    console.log(response.data);
  }

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
