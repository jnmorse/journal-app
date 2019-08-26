import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../reducers';
import { AxiosInstance } from 'axios';
import { Action } from 'redux';
import { JournalEntry } from './journal-actions';
import {
  EditJournalEntrySuccessAction,
  ActionTypes,
  EditJournalEntryFailAction
} from './types';

function editJournalEntrySuccess(
  data: JournalEntry
): EditJournalEntrySuccessAction {
  return {
    type: ActionTypes.EditJournalEntrySuccess,
    payload: data
  };
}

function editJournalEntryFail(error: string): EditJournalEntryFailAction {
  return {
    type: ActionTypes.EditJournalEntryFail,
    payload: error
  };
}

export function editJournalEntry(
  data: JournalEntry
): ThunkAction<
  Promise<EditJournalEntrySuccessAction | EditJournalEntryFailAction>,
  StoreState,
  AxiosInstance,
  EditJournalEntrySuccessAction | EditJournalEntryFailAction
> {
  return async (dispatch, getState, api) => {
    const response = await api.put<JournalEntry>(`/journals/${data._id}`, data);

    if (response.status === 200) {
      return dispatch(editJournalEntrySuccess(response.data));
    }

    return dispatch(editJournalEntryFail('was unable to edit'));
  };
}
