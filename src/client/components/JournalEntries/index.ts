import { connect } from 'react-redux';

import JournalEntries from './JournalEntries';
import { StoreState } from '../../reducers';
import { JournalEntry, getJournalEntries } from '../../actions';
import { ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { Action, Dispatch } from 'redux';

export interface JournalStateProps {
  journals: JournalEntry[];
}

export interface DispatchProps {
  getJournalEntries: (limit?: number, offset?: number) => Promise<void>;
}

function mapStateToProps({ journals }: StoreState): JournalStateProps {
  return { journals };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, AxiosInstance, Action>
): DispatchProps {
  return {
    getJournalEntries: (limit?: number, offset?: number) =>
      dispatch(getJournalEntries(limit, offset))
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
