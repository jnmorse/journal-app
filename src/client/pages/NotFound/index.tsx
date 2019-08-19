import React from 'react';
import Helmet from 'react-helmet';

import image from '../../images/quill-svgrepo-com.svg';
import { StatusCode } from '../../components/StatusCode';

import { Layout } from '../../components/Layout';
import { Container } from 'react-bootstrap';

export interface NotFoundPropTypes {
  status: number;
}

export const NotFound = ({ status }: NotFoundPropTypes): JSX.Element => {
  return (
    <Layout>
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>

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
