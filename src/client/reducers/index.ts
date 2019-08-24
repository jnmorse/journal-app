import { combineReducers } from 'redux';
import { userReducer } from './user-reducer';
import { JournalEntry, Actions, User } from '../actions';
import { journalReducer } from './journal-reducer';

export interface StoreState {
  user: false | User;
  journals: JournalEntry[];
}

export const Reducers = combineReducers<StoreState, Actions>({
  user: userReducer,
  journals: journalReducer
});
