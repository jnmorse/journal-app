import { User } from './interfaces';

export interface SigninSuccessAction {
  type: ActionTypes.Signin_Success;
  payload: User;
}

export interface SigninFailAction {
  type: ActionTypes.Signin_Fail;
  payload?: any;
}

export interface CurrentUserAction {
  type: ActionTypes.Current_User;
  payload: User;
}

export interface UserError {
  type: ActionTypes.User_Error;
  payload: any;
}

export enum ActionTypes {
  User_Error = 'USER_ERROR',
  Signin_Success = 'SIGNIN_SUCCESS',
  Signin_Fail = 'SIGNIN_FAIL',
  Current_User = 'CURRENT_USER'
}

export type UserActions =
  | SigninSuccessAction
  | SigninFailAction
  | CurrentUserAction;
