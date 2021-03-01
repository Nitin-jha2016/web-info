import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Link } from "react-router-dom";
import HttpsRedirect from 'react-https-redirect';

ReactDOM.render(
  <React.StrictMode>
    <HttpsRedirect>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </HttpsRedirect>
  </React.StrictMode>,
  document.getElementById('root')
);


