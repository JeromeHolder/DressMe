import React, { Component } from 'react';
import './App.css';

const cards = [
  {
    imgSrc: 'images/square1.jpg',
    title: 'Card 1'
  }, {
    imgSrc: 'images/square2.jpg',
    title: 'Card 2'
  }, {
    imgSrc: 'images/square3.jpg',
    title: 'Card 3'
  }, {
    imgSrc: 'images/square4.jpg',
    title: 'Card 4'
  }, {
    imgSrc: 'images/square5.jpg',
    title: 'Card 5'
  }, {
    imgSrc: 'images/square6.jpg',
    title: 'Card 6'
  }
]

class App extends Component {

  render() {

    return (
      <div className="container">
          Your Code here 
      </div>
      
    );
  }
}

class Card extends Component { 
  render () {
    return (
      //your code here
    )
  }
}


export default App;
