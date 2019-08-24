import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import marked from 'marked';

import { JournalStateProps, DispatchProps } from './index';
import { JournalEntry } from '../../actions';
import { Link } from 'react-router-dom';

interface JournalEntriesProps extends JournalStateProps {
  limit: number;
  offset: number;
}

export default class JournalEntries extends Component<
  JournalEntriesProps & DispatchProps
> {
  public componentDidMount() {
    const { limit, offset } = this.props;
    this.props.getJournalEntries(limit, offset);
  }

  public toDateTimeString(dateString: string): string {
    const date: Date = new Date(dateString);

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  public showButtons(entry: JournalEntry) {
    const { user } = this.props;

    if (user && user._id === entry.user._id) {
      return (
        <>
          <Button type="button" variant="danger">
            Delete
          </Button>
          <Button
            as={Link}
            type="button"
            variant="success"
            to={`/journal/${entry._id}`}
          >
            Edit
          </Button>
        </>
      );
    }

    return null;
  }

  public renderEntries(): JSX.Element[] {
    return this.props.journals.map(journal => {
      return (
        <Col key={journal._id} md={4}>
          <Card>
            <Card.Header>
              {journal.image ? (
                <img
                  src={journal.image}
                  alt="image"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    objectPosition: 'top center',
                    maxHeight: '10em'
                  }}
                />
              ) : null}
              {journal.title}
            </Card.Header>
            <Card.Body
              dangerouslySetInnerHTML={{ __html: marked(journal.body) }}
            />
            <Card.Footer>
              <p>
                <span>by {journal.user.username} on </span>
                <span>{this.toDateTimeString(journal.updated)}</span>
              </p>
              {this.showButtons(journal)}
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
