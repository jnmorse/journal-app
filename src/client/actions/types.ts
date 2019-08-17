export interface SigninSuccessAction {
  type: ActionTypes.Signin_Success;
  payload: string;
}

export interface SigninFailAction {
  type: ActionTypes.Signin_Fail;
}

export enum ActionTypes {
  Signin_Success = 'SIGNIN_SUCCESS',
  Signin_Fail = 'SIGNIN_FAIL'
}

export type UserActions = SigninSuccessAction | SigninFailAction;
