import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';

import { StoreState } from '../../reducers';
import { Signup } from './Signup';
import {
  User,
  CreateUser,
  signupUser,
  Actions,
  SignupSuccessAction,
  SignupFailAction
} from '../../actions';

export interface StateProps {
  user: User | false;
}

export interface DispatchProps {
  signupUser: (
    user: CreateUser
  ) => Promise<SignupSuccessAction | SignupFailAction>;
}

function mapStateToProps({ user }: StoreState): StateProps {
  return { user };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, AxiosInstance, Actions>
): DispatchProps {
  return {
    signupUser: async (
      user: CreateUser
    ): Promise<SignupSuccessAction | SignupFailAction> => {
      return await dispatch(signupUser(user));
    }
  };
}

export const ConnectedSignup = connect<
  StateProps,
  DispatchProps,
  {},
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
