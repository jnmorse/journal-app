import { Signin } from './Signin';
import { User, signinUser, CreateUser } from '../../actions';
import { connect } from 'react-redux';
import { StoreState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';

export interface StateProps {
  user: User;
}

export interface DispatchProps {
  signinUser: (user: CreateUser) => Promise<void>;
}

function mapStateToProps({ user }: StoreState): StateProps {
  return { user };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, AxiosInstance, any>
): DispatchProps {
  return {
    signinUser: async (user: CreateUser) => {
      await dispatch(signinUser(user));
    }
  };
}

export const ConnectedSignin = connect<
  StateProps,
  DispatchProps,
  {},
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(Signin);

export { Signin };
