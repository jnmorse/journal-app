import { combineReducers } from 'redux';
import { userReducer, UserReducerState } from './user-reducer';
import { UserActions } from '../actions';

export interface StoreState {
  user: UserReducerState;
}

export const Reducers = combineReducers<StoreState, UserActions>({
  user: userReducer
});
