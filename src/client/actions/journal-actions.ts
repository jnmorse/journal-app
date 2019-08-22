import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../reducers';
import { AxiosInstance } from 'axios';
import { GetJournalEntriesAction, ActionTypes } from './types';

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
): ThunkAction<
  Promise<void>,
  StoreState,
  AxiosInstance,
  GetJournalEntriesAction
> {
  return async (dispatch, getState, api) => {
    const response = await api.get<JournalEntry[]>('/journals', {
      params: {
        limit,
        offset
      }
    });

    dispatch({
      type: ActionTypes.GetJournalEntries,
      payload: response.data
    });
  };
}
