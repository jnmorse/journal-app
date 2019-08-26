import React from 'react';
import Helmet from 'react-helmet';

import image from '../../images/quill-svgrepo-com.svg';
import { StatusCode } from '../../components/StatusCode';

import { Layout } from '../../components/Layout';
import { Container } from 'react-bootstrap';
import SEO from '../../components/SEO';

export const NotFound = (): JSX.Element => {
  return (
    <Layout>
      <SEO title="404" description="Page not found" />
      <StatusCode code={404}>
        <Container style={{ textAlign: 'center' }}>
          <header>
            <img src={image} width="200" alt="Quill" />
            <h1>404 Not Found</h1>
          </header>

          <p>Sorry the page you where looking for was not found</p>
        </Container>
      </StatusCode>
    </Layout>
  );
};
