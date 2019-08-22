import { combineReducers } from 'redux';
import { userReducer, UserReducerState } from './user-reducer';
import { JournalEntry, Actions } from '../actions';
import { journalReducer } from './journal-reducer';

export interface StoreState {
  user: UserReducerState;
  journals: JournalEntry[];
}

export const Reducers = combineReducers<StoreState, Actions>({
  user: userReducer,
  journals: journalReducer
});
