import { Signin } from './Signin';
import {
  User,
  signinUser,
  Actions,
  SigninSuccessAction,
  SigninFailAction
} from '../../actions';
import { connect } from 'react-redux';
import { StoreState } from '../../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';

export interface StateProps {
  user: User | false;
}

export interface DispatchProps {
  signinUser: (user: {
    email: string;
    password: string;
  }) => Promise<SigninSuccessAction | SigninFailAction>;
}

function mapStateToProps({ user }: StoreState): StateProps {
  return { user };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, AxiosInstance, Actions>
): DispatchProps {
  return {
    signinUser: async (user: { email: string; password: string }) => {
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
