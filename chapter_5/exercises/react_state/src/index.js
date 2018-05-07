import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

<<<<<<< HEAD
ReactDOM.render(<App />, document.getElementById('root'));
=======
const urls= [
    'http://imgur.com/9itd49u.png',
    'http://imgur.com/n19BXfZ.png',
    'http://imgur.com/VBwQmzA.png',
    'http://imgur.com/nawDxVv.png'
]

ReactDOM.render(<App imageUrls={urls}/>, document.getElementById('root'));
>>>>>>> 6cbe917029fcd972e35d957df8095f5d78066d77
registerServiceWorker();
