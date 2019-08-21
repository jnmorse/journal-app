import React, { Component } from 'react';

import { Card } from 'react-bootstrap';
import { Dispatch } from 'redux';

import { JournalStateProps, DispatchProps } from './index';

interface JournalEntriesProps extends JournalStateProps {
  limit: number;
  offset: number;
}

export default class JournalEntries extends Component<
  JournalEntriesProps & DispatchProps
> {
  public componentDidMount() {
    this.props.getJournalEntries();
  }

  public render(): JSX.Element[] {
    return this.props.journals.map(journal => (
      <Card key={journal.id}>
        <Card.Header>First Entry</Card.Header>
      </Card>
    ));
  }
}
