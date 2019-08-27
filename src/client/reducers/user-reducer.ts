import { ActionTypes, Actions, User } from '../actions';

export const userReducer = (
  state: User | false = false,
  action: Actions
): User | false => {
  switch (action.type) {
    case ActionTypes.Current_User: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};
