import { UserActions, ActionTypes } from '../actions';

export interface UserReducerState {
  id: string;
  email: string;
  created: string;
  updated: string;
}

export const userReducer = (
  state: UserReducerState = { id: '', email: '', created: '', updated: '' },
  action: UserActions
): UserReducerState => {
  switch (action.type) {
    case ActionTypes.Current_User: {
      return action.payload;
    }

    case ActionTypes.Signin_Success: {
      return state;
    }

    default: {
      return state;
    }
  }
};
