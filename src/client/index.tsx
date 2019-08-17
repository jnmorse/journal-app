import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import { Root } from './Root';

const HotRoot = hot(Root);

import './index.css';

ReactDOM.render(<Root />, document.getElementById('root'));
