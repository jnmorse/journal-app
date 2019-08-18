import { User } from './interfaces';

export interface SigninSuccessAction {
  type: ActionTypes.Signin_Success;
}

export interface SigninFailAction {
  type: ActionTypes.Signin_Fail;
  payload?: any;
}

export interface CurrentUserAction {
  type: ActionTypes.Current_User;
  payload: User;
}

export interface SignupSuccessAction {
  type: ActionTypes.Signup_Success;
  payload: User;
}

export interface SignupFailAction {
  type: ActionTypes.Signup_Fail;
  payload: any;
}

export interface UserError {
  type: ActionTypes.User_Error;
  payload: any;
}

export enum ActionTypes {
  User_Error = 'USER_ERROR',
  Signin_Success = 'SIGNIN_SUCCESS',
  Signin_Fail = 'SIGNIN_FAIL',
  Current_User = 'CURRENT_USER',
  Signup_Success = 'SIGNUP_SUCCESS',
  Signup_Fail = 'SIGNUP_FAIL'
}

export type UserActions =
  | SigninSuccessAction
  | SigninFailAction
  | CurrentUserAction
  | SignupSuccessAction
  | SignupFailAction;
