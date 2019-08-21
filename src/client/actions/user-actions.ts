import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { StoreState } from '../reducers';
import {
  ActionTypes,
  CurrentUserAction,
  UserError,
  SigninSuccessAction,
  SigninFailAction,
  SignupSuccessAction,
  SignupFailAction
} from './types';
import { AxiosInstance } from 'axios';
import { User } from './interfaces';

export function getCurrentUser(): ThunkAction<
  Promise<CurrentUserAction | UserError>,
  StoreState,
  AxiosInstance,
  CurrentUserAction | UserError
> {
  return async (dispatch, getState, api) => {
    try {
      const response = await api.get<User | false>('/current_user');

      if (!response.data) {
        return dispatch({
          type: ActionTypes.User_Error,
          payload: 'Not Logged in'
        });
      }

      return dispatch({
        type: ActionTypes.Current_User,
        payload: response.data
      });
    } catch (error) {
      return dispatch({
        type: ActionTypes.User_Error,
        payload: 'Not Logged in'
      });
    }
  };
}

export interface CreateUser {
  email: string;
  password: string;
}

export function signinUser(
  user: CreateUser
): ThunkAction<
  Promise<SigninSuccessAction | SigninFailAction>,
  StoreState,
  AxiosInstance,
  SigninSuccessAction | SigninFailAction
> {
  return async (dispatch, getState, api) => {
    try {
      const response = await api.post<User>('/signin', user);

      if (response.status === 200) {
        return dispatch({
          type: ActionTypes.Signin_Success
        });
      }

      return dispatch({
        type: ActionTypes.Signin_Fail,
        payload: 'Was not able to signin'
      });
    } catch (error) {
      return dispatch({
        type: ActionTypes.Signin_Fail,
        payload: error
      });
    }
  };
}

export function signupUser(
  user: CreateUser
): ThunkAction<
  Promise<SignupSuccessAction | SignupFailAction>,
  StoreState,
  AxiosInstance,
  SignupSuccessAction | SignupFailAction
> {
  return async (dispatch, getState, api) => {
    try {
      const response = await api.post<User>('/signup', user);

      if (response.status === 200) {
        return dispatch({
          type: ActionTypes.Signup_Success,
          payload: response.data
        });
      }

      return dispatch({
        type: ActionTypes.Signup_Fail,
        payload: 'Was not able to signin'
      });
    } catch (error) {
      return dispatch({
        type: ActionTypes.Signup_Fail,
        payload: error
      });
    }
  };
}
