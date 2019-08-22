import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Helmet } from 'react-helmet';
import { minify } from 'html-minifier';
import { StaticRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import serializeJavascript from 'serialize-javascript';

import { App } from '../client/components/App';
import { StoreState } from 'src/client/reducers';
import { Actions } from 'src/client/actions';

export function reactRenderer(): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const clientManifest = require('../../dist/manifest.json');

    const helmet = Helmet.renderStatic();
    const context = {};

    const { store }: { store: Store<StoreState, Actions> } = res.locals;

    const HtmlHead = () => (
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

        <link rel="stylesheet" href={clientManifest['main.css']} />

        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
      </head>
    );

    const AppScripts = () => (
      <>
        <script src={clientManifest['vendor.js']} />
        <script src={clientManifest['main.js']} />
      </>
    );

    const content = renderToString(
      <Provider store={store}>
        <Router location={req.path} context={context}>
          <App />
        </Router>
      </Provider>
    );

    const html = `
    <!DOCTYPE html>
    <html ${helmet.htmlAttributes.toString()}>

    ${renderToStaticMarkup(<HtmlHead />)}

    <body>
      <div id="root">${content}</div>

      <script>
       window.initState = ${serializeJavascript(store.getState(), {
         isJSON: true
       })}
      </script>
      ${renderToStaticMarkup(<AppScripts />)}
    </body>
    </html>
    `;

    // res.locals apparently is the correct place to store this stuff

    res.locals.context = context;
    res.locals.html = minify(html, { collapseWhitespace: true });
    next();
  };
}
