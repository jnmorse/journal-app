import { ActionTypes, Actions } from '../actions';

export interface UserReducerState {
  id: string;
  email: string;
  created: string;
  updated: string;
}

export const userReducer = (
  state: UserReducerState | false = false,
  action: Actions
): UserReducerState | false => {
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
