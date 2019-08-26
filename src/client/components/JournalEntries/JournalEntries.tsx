import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import marked from 'marked';
import { Link } from 'react-router-dom';

import { JournalStateProps, DispatchProps } from './index';
import { JournalEntry } from '../../actions';

export default class JournalEntries extends Component<
  JournalStateProps & DispatchProps
> {
  public componentDidMount() {
    this.props.getJournalEntries();
  }

  public toDateTimeString(dateString: string): string {
    const date: Date = new Date(dateString);

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  public showButtons(entry: JournalEntry) {
    const { user, deleteEntry } = this.props;

    if (user && user._id === entry.user._id) {
      return (
        <>
          <Button
            type="button"
            variant="danger"
            onClick={() => deleteEntry(entry._id)}
          >
            Delete
          </Button>
          <Button
            as={Link}
            type="button"
            variant="success"
            to={`/journal/${entry._id}/edit`}
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
        <Col key={journal._id} lg={6}>
          <Card as="section">
            <Card.Header as="header" className="text-center">
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
              <h2>
                <Link to={`/journal/${journal._id}`}>{journal.title}</Link>
              </h2>
            </Card.Header>
            <Card.Body
              dangerouslySetInnerHTML={{ __html: marked(journal.body) }}
            />
            <Card.Footer as="footer">
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
