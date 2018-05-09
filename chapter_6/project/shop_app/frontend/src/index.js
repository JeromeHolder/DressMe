import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
    // Wraps App in the Router
    <Router>
        <App />
    </Router>, document.getElementById('root'));
registerServiceWorker();
