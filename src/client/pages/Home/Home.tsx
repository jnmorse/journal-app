import React, { Component } from 'react';
import { RouteProps } from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';

import image from '../../images/quill-svgrepo-com.svg';

import { Layout } from '../../components/Layout';
import JournalEntries from '../../components/JournalEntries';
import SEO from '../../components/SEO';

export class Home extends Component<RouteProps> {
  public render(): JSX.Element {
    return (
      <Layout>
        <SEO
          title="Home"
          description="save your hopes, dreams, and any other journal like content"
        />
        <Jumbotron fluid as="header" style={{ textAlign: 'center' }}>
          <img src={image} alt="image" width={200} style={{ margin: 10 }} />

          <h2>Digital Journal</h2>
          <p>Organize all your content and ideas together in one place.</p>
        </Jumbotron>
        <JournalEntries limit={5} offset={0} />
      </Layout>
    );
  }
}
