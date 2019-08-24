import React, { Component, ChangeEvent, FormEvent } from 'react';
import { Layout } from '../../components/Layout';
import {
  Form,
  Container,
  Button,
  InputGroup,
  ButtonGroup
} from 'react-bootstrap';
import SEO from '../../components/SEO';

import { JournalFormDispatchProps } from './index';
import { NewJournalEntry } from '../../actions';

interface JournalFormState extends NewJournalEntry {
  submited: boolean;
}

export default class JournalForm extends Component<
  JournalFormDispatchProps,
  JournalFormState
> {
  public state: JournalFormState = {
    title: '',
    private: false,
    body: '',
    category: [],
    image: '',
    tags: [],
    submited: false
  };

  public updateValue = (event: ChangeEvent<any>) => {
    const { name, value } = event.target;

    if (Object(this.state).hasOwnProperty(name)) {
      this.setState({ ...this.state, [name]: value });
    }
  };

  public updateVisiablity = () => {
    this.setState(prevState => ({ private: !prevState.private }));
  };

  public updateCategory = (event: ChangeEvent<any>): void => {
    const category: string = event.target.value;

    this.setState({
      category: category.split(',').map(value => value.trim())
    });
  };

  public updateTags = (event: ChangeEvent<any>): void => {
    const tags: string = event.target.value;

    this.setState({
      tags: tags.split(',').map(value => value.trim())
    });
  };

  public submitNewEntry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { submited, ...post } = this.state;

    this.props.newEntry(post);
  };

  public render(): JSX.Element {
    const { private: isPrivate, title, body, category, tags } = this.state;
    return (
      <Layout>
        <SEO title="New Post" description="write a new journal entry" />
        <Container>
          <Form method="post" autoComplete="off" onSubmit={this.submitNewEntry}>
            <header>
              <h2>New Post</h2>
            </header>

            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="My Title"
                  value={title}
                  required
                  onChange={this.updateValue}
                />
                <InputGroup.Append>
                  <Button
                    title="Public is visable to everyone"
                    onClick={this.updateVisiablity}
                  >
                    {isPrivate ? 'Private' : 'Public'}
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image URL</Form.Label>
              <Form.Control name="image" type="url" />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="input"
                type="text"
                name="category"
                placeholder="Category1, Category2"
                value={category.join(', ')}
                onChange={this.updateCategory}
              />
              <Form.Text>comma seperated list</Form.Text>
            </Form.Group>

            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                name="tags"
                value={tags.join(', ')}
                placeholder="one, two, three"
                onChange={this.updateTags}
              />
              <Form.Text>comma seperated list</Form.Text>
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
              <ButtonGroup>
                <Button type="submit">Create New Post</Button>
                <Button type="button" variant="secondary">
                  Preview
                </Button>
              </ButtonGroup>
            </footer>
          </Form>
        </Container>
      </Layout>
    );
  }
}
