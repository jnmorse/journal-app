import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';

import {
  User,
  getCurrentUser,
  Actions,
  CurrentUserAction,
  UserError
} from '../actions';
import { StoreState } from '../reducers';
import { StatusCode } from '../components/StatusCode';

interface StateProps {
  user: User | false;
}

interface DispatchProps {
  currentUser: () => Promise<CurrentUserAction | UserError>;
}

interface AuthComponentProps {
  user: User | false;
  children?: ReactNode;
}

export default function requireAuth<Props = {}>(path: string = '/') {
  return (AuthComponent: React.ComponentType<any>) => {
    class RequireAuth extends Component<DispatchProps & StateProps> {
      public state = {
        userLoaded: false
      };

      public componentDidMount() {
        this.props
          .currentUser()
          .then(() => this.setState({ userLoaded: true }));
      }

      public render() {
        const { user, currentUser, ...props } = this.props;
        const { userLoaded } = this.state;

        if (user) {
          return <AuthComponent user={user} {...props} />;
        }

        if (!user && !userLoaded) {
          return <div>loading...</div>;
        }

        return (
          <StatusCode code={302}>
            <Redirect to={path} />
          </StatusCode>
        );
      }
    }

    function mapStateToProps({ user }: StoreState): StateProps {
      return { user };
    }

    function mapDispatchToProps(
      dispatch: ThunkDispatch<StoreState, AxiosInstance, Actions>
    ): DispatchProps {
      return {
        currentUser: () => dispatch(getCurrentUser())
      };
    }

    return connect<StateProps, DispatchProps, Props, StoreState>(
      mapStateToProps,
      mapDispatchToProps
    )(RequireAuth);
  };
}
