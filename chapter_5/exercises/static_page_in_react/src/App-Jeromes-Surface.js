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


class Card extends React.Component { 
  render () {
    return (
        <div className="col s4">
          <div className="card">
            <div className="card-image">
              <img src={this.props.imagesrc} />
              <span className="card-title">{this.props.title}</span>
            </div>
            <div className="card-content">
              <p>Powering the next generation of creators. Build your skills in business, design &amp; technology.</p>
            </div>
          </div>
        </div>
    )
  }
}

class App extends React.Component {

  render() {

    let cardSet = [];
    for(let i=0; i < cards.length; i++){
      cardSet.push(<Card title={cards[i].title} imagesrc={cards[i].imgSrc}/>);
    }

    return (
      <div className="container">
        <h1>BrainStaGram</h1>
        <div className="row">
          {cardSet}
        </div>
      </div>
      
    );
  }
}

export default App;
