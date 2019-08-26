import React, { Component } from 'react';
import marked from 'marked';

import { Layout } from '../../components/Layout';
import SEO from '../../components/SEO';

import { ViewEntryStateProps, ViewEntryDispatchProps } from './index';
import { NotFound } from '../NotFound';
import { Container } from 'react-bootstrap';

interface ViewEntryProps extends ViewEntryStateProps, ViewEntryDispatchProps {}

export default class ViewEntry extends Component<ViewEntryProps> {
  constructor(props: ViewEntryProps) {
    super(props);

    if (!props.entry) {
      props.getEntry();
    }
  }

  public render(): JSX.Element {
    const { entry } = this.props;

    if (!entry) {
      return <NotFound />;
    }

    const created = new Date(entry.created).toLocaleDateString();

    return (
      <Layout>
        <SEO title={entry.title} description={entry.body.substr(0, 50)} />

        <Container as="article">
          <header style={{ textAlign: 'center' }}>
            {entry.image ? (
              <img
                src={entry.image}
                alt="header"
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '30vh',
                  objectPosition: 'center center'
                }}
              />
            ) : null}
            <h1>{entry.title}</h1>
          </header>

          <div dangerouslySetInnerHTML={{ __html: marked(entry.body) }} />

          <footer>
            <p>
              by {entry.user.username} on {created}
            </p>
          </footer>
        </Container>
      </Layout>
    );
  }
}
