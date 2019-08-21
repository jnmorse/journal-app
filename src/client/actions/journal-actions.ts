import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../reducers';
import { AxiosInstance } from 'axios';
import { Action } from 'redux';

export interface JournalEntry {
  id: string;
  title: string;
  body: string;
  image: string;
  private: boolean;
  category: string[];
  tags: string[];
  created: string;
  updated: string;
  user: string;
}

export function getJournalEntries(
  limit: number = 5,
  offset: number = 0
): ThunkAction<Promise<void>, StoreState, AxiosInstance, Action> {
  return async (dispatch, getState, api) => {
    const response = await api.get<JournalEntry[]>('/journals', {
      params: {
        limit,
        offset
      }
    });

    dispatch({
      type: 'GET_JOURNAL_ENTRIES',
      payload: response.data
    });
  };
}
