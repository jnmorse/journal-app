import React, { Component } from 'react';
import { Link, RouteProps, NavLinkProps } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  Container,
  Jumbotron
} from 'react-bootstrap';

import image from '../../images/quill-svgrepo-com.svg';
import { DispatchProps, StateProps } from './index';

type HomeProps = RouteProps & DispatchProps & StateProps;

import { Layout } from '../../components/Layout';

export class Home extends Component<HomeProps> {
  public componentDidMount() {
    if (!this.props.user.id) {
      this.props.getCurrentUser();
    }
  }

  public render(): JSX.Element {
    return (
      <Layout>
        <Jumbotron fluid>
          <header style={{ textAlign: 'center' }}>
            <img src={image} alt="image" width={200} />

            <h2>Digital Journal</h2>
            <p>Organize all your content and ideas together in one place.</p>
          </header>
        </Jumbotron>
      </Layout>
    );
  }
}
