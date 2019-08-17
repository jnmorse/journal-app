import React, { Component } from 'react';
import { Link, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';

import { container } from '../../styles/container.css';
import { header, text, footer } from './home.css';
import image from '../../images/quill-svgrepo-com.svg';
import { getCurrentUser, CurrentUserAction, User } from '../../actions';
import { StoreState } from '../../reducers';

interface HomeProps extends RouteProps {
  user: User;
}

interface DispatchProps {
  getCurrentUser: () => Promise<void>;
}

export class Home extends Component<RouteProps & DispatchProps & HomeProps> {
  public componentDidMount() {
    this.props.getCurrentUser();
  }

  public renderLinks(): JSX.Element {
    const {
      user: { id }
    } = this.props;
    if (id) {
      return (
        <ul>
          <li>
            <a href="/api/signout">Sign Out</a>
          </li>
        </ul>
      );
    }

    return (
      <ul>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    );
  }

  public render(): JSX.Element {
    return (
      <div className={container}>
        <header className={header}>
          <img src={image} alt="image" width={200} />

          <h2 className={text}>Digital Journal</h2>
          <p>Organize all your content and ideas together in one place.</p>
        </header>

        <footer className={footer}>{this.renderLinks()}</footer>
      </div>
    );
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StoreState, AxiosInstance, CurrentUserAction>
): DispatchProps => {
  return {
    getCurrentUser: async () => {
      await dispatch(getCurrentUser());
    }
  };
};

function mapStateToProps({ user }: StoreState): HomeProps {
  return { user };
}

export default connect<{}, DispatchProps, RouteProps, StoreState>(
  mapStateToProps,
  mapDispatchToProps
)(Home);
