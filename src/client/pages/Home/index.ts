import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';

import { StoreState } from '../../reducers';
import {
  User,
  getCurrentUser,
  CurrentUserAction,
  UserError
} from '../../actions';
import { Home } from './Home';
import { RouteProps } from 'react-router';
import { currentUser } from 'src/controllers/autherization';

export interface StateProps {
  user: User;
}

export interface DispatchProps {
  getCurrentUser: () => Promise<CurrentUserAction | UserError>;
}

function mapStateToProps({ user }: StoreState): StateProps {
  return { user };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, AxiosInstance, CurrentUserAction>
): DispatchProps {
  return {
    getCurrentUser: () => {
      return dispatch(getCurrentUser());
    }
  };
}

export default connect<StateProps, DispatchProps, RouteProps, StoreState>(
  mapStateToProps,
  mapDispatchToProps
)(Home);
