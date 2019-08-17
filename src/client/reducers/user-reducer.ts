import { UserActions, ActionTypes } from '../actions';

export interface UserReducerState {
  token: string;
  isAuthorized: boolean;
}

export const userReducer = (
  state: UserReducerState = { token: '', isAuthorized: false },
  action: UserActions
): UserReducerState => {
  switch (action.type) {
    case ActionTypes.Signin_Success: {
      return { isAuthorized: true, token: action.payload };
    }

    default: {
      return state;
    }
  }
};
