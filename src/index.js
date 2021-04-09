import { CssBaseline } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const app = (
  <>
    <CssBaseline />
    <App />
  </>
)

ReactDOM.render(app, document.getElementById('root'));
