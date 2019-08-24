import { connect } from 'react-redux';
import { SiteNav } from './SiteNav';
import {
  User,
  Actions,
  getCurrentUser,
  CurrentUserAction,
  UserError
} from '../../actions';
import { StoreState } from '../../reducers';
import { RouteProps, withRouter, RouteComponentProps } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';

export interface StateProps {
  user: User | false;
}

export interface DispatchProps {
  getCurrentUser: () => Promise<CurrentUserAction | UserError>;
}

function mapStateToProps({ user }: StoreState): StateProps {
  return { user };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, AxiosInstance, Actions>
): DispatchProps {
  return {
    getCurrentUser: () => dispatch(getCurrentUser())
  };
}

export default connect<StateProps, DispatchProps, RouteProps, StoreState>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SiteNav));
