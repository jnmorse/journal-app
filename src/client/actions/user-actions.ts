import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { StoreState } from '../reducers';
import {
  ActionTypes,
  CurrentUserAction,
  UserError,
  SigninSuccessAction,
  SigninFailAction
} from './types';
import { AxiosInstance } from 'axios';
import { User } from './interfaces';
import { DeepPartial } from 'redux';

export function getCurrentUser(): ThunkAction<
  Promise<void>,
  StoreState,
  AxiosInstance,
  CurrentUserAction | UserError
> {
  return async (dispatch, getState, api) => {
    try {
      const response = await api.get<User>('/current_user');

      dispatch({
        type: ActionTypes.Current_User,
        payload: response.data
      });
    } catch (error) {
      dispatch({ type: ActionTypes.User_Error, payload: 'Not Logged in' });
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
          type: ActionTypes.Signin_Success,
          payload: response.data
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
