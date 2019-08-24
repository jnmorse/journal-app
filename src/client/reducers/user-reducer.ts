import { ActionTypes, Actions, User } from '../actions';

export const userReducer = (
  state: User | false = false,
  action: Actions
): User | false => {
  switch (action.type) {
    case ActionTypes.Current_User: {
      return action.payload;
    }

    case ActionTypes.Signup_Success: {
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
