import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { container } from '../../styles/container.css';
import { header, text, footer } from './home.css';
import image from '../../images/quill-svgrepo-com.svg';

export class Home extends Component {
  public render(): JSX.Element {
    return (
      <div className={container}>
        <header className={header}>
          <img src={image} alt="image" width={200} />

          <h2 className={text}>Digital Journal</h2>
          <p>Organize all your content and ideas together in one place.</p>
        </header>

        <footer className={footer}>
          <ul>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </footer>
      </div>
    );
  }
}
