import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import favicon from '../images/quill.png';

type MetaProps = JSX.IntrinsicElements['meta'];

interface SEOProps {
  title: string;
  description: string;
  meta: MetaProps[];
  keywords: string[];
  lang: string;
}

interface SEODefaultProps {
  meta: MetaProps[];
  keywords: string[];
  lang: string;
}

export default class SEO extends Component<SEOProps> {
  public static defaultProps: SEODefaultProps = {
    lang: 'en-US',
    keywords: [],
    meta: []
  };

  public render(): JSX.Element {
    const { title, description, keywords, meta, lang } = this.props;
    return (
      <Helmet
        htmlAttributes={{ lang }}
        title={title}
        titleTemplate={'%s | Digital Journal'}
        meta={[
          {
            name: 'description',
            content: description
          },
          {
            property: 'og:title',
            content: title
          },
          {
            property: 'og:type',
            content: 'website'
          },
          {
            name: 'twitter:card',
            content: 'summary'
          },
          {
            name: 'twitter:create',
            content: '@tamed_lionheart'
          },
          {
            name: 'twitter:title',
            content: title
          },
          {
            name: 'twitter:description',
            content: description
          },
          ...meta
        ].concat(
          keywords.length > 0
            ? { name: 'keywords', content: keywords.join(',') }
            : []
        )}
      >
        <link rel="shortcut icon" href={favicon} type="image/png" />
      </Helmet>
    );
  }
}
