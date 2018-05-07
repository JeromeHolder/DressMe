import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from './About';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <div>
            <nav>
                <Link to="/">To-do List</Link>
                <Link to="/about">About</Link>
            </nav>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/about" component={About} />
            </Switch>
        </div>
    </Router>
, document.getElementById('root'));
registerServiceWorker();
