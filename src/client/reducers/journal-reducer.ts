import { JournalEntry, ActionTypes, Actions } from '../actions';

export function journalReducer(
  state: JournalEntry[] = [],
  action: Actions
): JournalEntry[] {
  switch (action.type) {
    case ActionTypes.GetJournalEntries: {
      return [...state, ...action.payload];
    }
    default: {
      return state;
    }
  }
}
