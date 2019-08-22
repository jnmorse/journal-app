import React, { Component } from 'react';
import { Layout } from '../Layout';
import { Form, Container, Button, InputGroup } from 'react-bootstrap';

interface JournalFormState {
  title: string;
  body: string;
  image: string;
  isPrivate: boolean;
  category: string[];
  tags: string[];
  created: Date;
}

export default class JournalForm extends Component<{}, JournalFormState> {
  public state: JournalFormState = {
    title: '',
    isPrivate: false,
    body: '',
    category: [],
    image: '',
    created: new Date(),
    tags: []
  };

  public render(): JSX.Element {
    const { isPrivate } = this.state;
    return (
      <Layout>
        <Container>
          <Form method="post" autoComplete="off">
            <header>
              <h2>New Post</h2>
            </header>

            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <InputGroup>
                <Form.Control type="text" name="title" placeholder="My Title" />
                <InputGroup.Append>
                  <Button
                    title="Public is visable to everyone"
                    onClick={() =>
                      this.setState(prevState => ({
                        isPrivate: !prevState.isPrivate
                      }))
                    }
                  >
                    {isPrivate ? 'Private' : 'Public'}
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image URL</Form.Label>
              <Form.Control name="image" type="url" required />
              <Form.Control.Feedback type="invalid">
                Url is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control name="category" />
            </Form.Group>

            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <Form.Control name="tags" />
            </Form.Group>

            <Form.Group controlId="body">
              <Form.Label>Post Body (Markdown)</Form.Label>
              <Form.Control as="textarea" rows={5} />
            </Form.Group>

            <footer>
              <Button type="submit">Create New Post</Button>
            </footer>
          </Form>
        </Container>
      </Layout>
    );
  }
}
