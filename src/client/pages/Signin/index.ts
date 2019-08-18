import { Signin } from './Signin';
import {
  User,
  signinUser,
  CreateUser,
  UserActions,
  SigninSuccessAction,
  SigninFailAction
} from '../../actions';
import { connect } from 'react-redux';
import { StoreState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';

export interface StateProps {
  user: User;
}

export interface DispatchProps {
  signinUser: (
    user: CreateUser
  ) => Promise<SigninSuccessAction | SigninFailAction>;
}

function mapStateToProps({ user }: StoreState): StateProps {
  return { user };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, AxiosInstance, UserActions>
): DispatchProps {
  return {
    signinUser: async (user: CreateUser) => {
      return await dispatch(signinUser(user));
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
