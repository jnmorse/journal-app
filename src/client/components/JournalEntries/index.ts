import { connect } from 'react-redux';

import JournalEntries from './JournalEntries';
import { StoreState } from '../../reducers';
import {
  JournalEntry,
  getJournalEntries,
  User,
  DeleteResponse,
  deleteJournalEntry
} from '../../actions';
import { ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { Action, Dispatch } from 'redux';

export interface JournalStateProps {
  journals: JournalEntry[];
  user: User | false;
}

export interface DispatchProps {
  getJournalEntries: (limit?: number, offset?: number) => Promise<void>;
  deleteEntry(id: string): Promise<DeleteResponse>;
}

function mapStateToProps({ journals, user }: StoreState): JournalStateProps {
  return { journals, user };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, AxiosInstance, Action>
): DispatchProps {
  return {
    getJournalEntries: (limit?: number, offset?: number) =>
      dispatch(getJournalEntries(limit, offset)),

    deleteEntry(id): Promise<DeleteResponse> {
      return dispatch(deleteJournalEntry(id));
    }
  };
}

export default connect<
  JournalStateProps,
  DispatchProps,
  { limit: number; offset: number },
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(JournalEntries);
