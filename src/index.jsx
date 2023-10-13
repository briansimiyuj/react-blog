import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css'
import Script from './Script'
import { BrowserRouter as Router, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <Router>

      <Route path="/" component={Script}></Route>

    </Router>

  </React.StrictMode>
);