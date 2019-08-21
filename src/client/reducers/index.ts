import { combineReducers } from 'redux';
import { userReducer, UserReducerState } from './user-reducer';
import { UserActions, JournalEntry } from '../actions';
import { journalReducer } from './journal-reducer';

export interface StoreState {
  user: UserReducerState;
  journals: JournalEntry[];
}

export const Reducers = combineReducers<StoreState, UserActions>({
  user: userReducer,
  journals: journalReducer
});
