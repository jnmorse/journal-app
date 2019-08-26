import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';

import ViewEntry from './ViewEntry';
import { JournalEntry, Actions, getJournalEntries } from '../../actions';
import { StoreState } from '../../reducers';

export interface ViewEntryStateProps {
  entry?: JournalEntry;
}

export interface ViewEntryDispatchProps {
  getEntry(): Promise<void>;
}

function mapStateToProps(
  { journals }: StoreState,
  ownProps: RouteComponentProps<{ id: string }>
): ViewEntryStateProps {
  return {
    entry: journals.find(ent => ent._id === ownProps.match.params.id)
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, AxiosInstance, Actions>,
  ownProps: RouteComponentProps<{ id: string }>
): ViewEntryDispatchProps {
  return {
    getEntry() {
      return dispatch(getJournalEntries());
    }
  };
}

export default connect<
  ViewEntryStateProps,
  ViewEntryDispatchProps,
  RouteComponentProps<{ id: string }>,
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(ViewEntry);
