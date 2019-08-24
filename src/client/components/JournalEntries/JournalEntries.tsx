import React, { Component } from 'react';

import { Card, Row, Col, Button } from 'react-bootstrap';

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

  public toDateTimeString(dateString: string): string {
    const date: Date = new Date(dateString);

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  public renderEntries(): JSX.Element[] {
    return this.props.journals.map(journal => {
      console.log(journal);
      return (
        <Col key={journal._id} md={5}>
          <Card>
            <Card.Header>{journal.title}</Card.Header>
            <Card.Body>{journal.body.substr(0, 50)}</Card.Body>
            <Card.Footer>
              <p>{this.toDateTimeString(journal.updated)}</p>
              <Button type="button" variant="danger">
                Delete
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      );
    });
  }

  public render(): JSX.Element {
    return <Row>{this.renderEntries()}</Row>;
  }
}
