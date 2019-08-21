import { Action } from 'redux';
import { JournalEntry } from '../actions';

export function journalReducer(state: JournalEntry[] = [], action: Action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
