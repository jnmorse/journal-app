import React, { Component, ChangeEvent, FormEvent } from 'react';
import { Redirect } from 'react-router';

import { Layout } from '../../components/Layout';
import { Form, Container, Button, ButtonGroup } from 'react-bootstrap';
import SEO from '../../components/SEO';

import { JournalFormDispatchProps, JournalFormStateProps } from './index';
import { NewJournalEntry, ActionTypes, Actions } from '../../actions';
import { StatusCode } from '../../components/StatusCode';

interface JournalFormState extends NewJournalEntry {
  submited: boolean;
  error: string | false;
}

export default class JournalForm extends Component<
  JournalFormDispatchProps & JournalFormStateProps,
  JournalFormState
> {
  constructor(props: JournalFormDispatchProps & JournalFormStateProps) {
    super(props);

    const defaultState: JournalFormState = {
      title: '',
      body: '',
      image: '',
      submited: false,
      error: false
    };

    if (props.entry) {
      this.state = { ...defaultState, ...props.entry };
    } else {
      this.state = defaultState;
    }
  }

  public updateValue = (event: ChangeEvent<any>) => {
    const { name, value } = event.target;

    if (Object(this.state).hasOwnProperty(name)) {
      this.setState({ ...this.state, [name]: value });
    }
  };

  public submitNewEntry = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const { error, submited, ...post } = this.state;

    let action: Actions;

    if (this.props.entry) {
      action = await this.props.editEntry({ ...this.props.entry, ...post });
    } else {
      action = await this.props.newEntry(post);
    }

    if (
      action.type === ActionTypes.NewJournalEntrySuccess ||
      action.type === ActionTypes.EditJournalEntrySuccess
    ) {
      this.setState({
        submited: true
      });
    }
  };

  public render(): JSX.Element {
    const { title, body, submited, image } = this.state;

    const { entry } = this.props;

    if (submited) {
      return (
        <StatusCode code={302}>
          <Redirect to="/" />
        </StatusCode>
      );
    }

    return (
      <Layout>
        <SEO title="New Post" description="write a new journal entry" />
        <Container>
          <Form method="post" autoComplete="off" onSubmit={this.submitNewEntry}>
            <header>
              <h2>{entry ? 'Edit' : 'False'} Post</h2>
            </header>

            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="My Title"
                value={title}
                required
                onChange={this.updateValue}
              />
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="url"
                name="image"
                placeholder="http://example.com/image.jpg"
                value={image}
                onChange={this.updateValue}
              />
            </Form.Group>

            <Form.Group controlId="body">
              <Form.Label>Post Body (Markdown)</Form.Label>
              <Form.Control
                as="textarea"
                name="body"
                rows={5}
                required
                value={body}
                onChange={this.updateValue}
              />
            </Form.Group>

            <footer>
              <Button type="submit">
                {entry ? 'Edit Post' : 'Create New Post'}
              </Button>
            </footer>
          </Form>
        </Container>
      </Layout>
    );
  }
}
