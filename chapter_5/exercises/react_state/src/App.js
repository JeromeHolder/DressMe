import React, { Component } from 'react';
<<<<<<< HEAD
=======
import './App.css'
>>>>>>> 6cbe917029fcd972e35d957df8095f5d78066d77
/* List of image urls ------------------------------
'http://imgur.com/9itd49u.png'
'http://imgur.com/n19BXfZ.png'
'http://imgur.com/VBwQmzA.png'
'http://imgur.com/nawDxVv.png'
-------------------------------------------------- */

class App extends Component {
<<<<<<< HEAD
  render() {
=======
	constructor(){
		super();
		this.state={
			index:0
		}
		this.nextSlide = this.nextSlide.bind(this);
		this.previousSlide = this.previousSlide.bind(this);
	}

	nextSlide(){
		this.setState({index: this.state.index + 1})
	}

	previousSlide(){
		this.setState({index: this.state.index -1})
	}

  render() {

	const myImages = this.props.imageUrls.map((image, index)=>{
		return <img src={image} className={index===this.state.index ? '' : 'hidden'} />
	})
>>>>>>> 6cbe917029fcd972e35d957df8095f5d78066d77
		return (
			<div className="App">
				<h1 >Calvin Carousel</h1>
			    <div>
<<<<<<< HEAD
			    	<button onClick>Previous</button>
			      	<span>1 of 4</span>
			      	<button onClick>Next</button>
			    </div>
				<div>
					<img src="http://imgur.com/9itd49u.png" />
=======
			    	<button disabled={this.state.index === 0 ? true : false} onClick={this.previousSlide}>Previous</button>
			      	<span>{this.state.index + 1} of 4</span>
			      	<button disabled={this.state.index === this.props.imageUrls.length-1 ? true : false} onClick={this.nextSlide}>Next</button>
			    </div>
				<div>
					{myImages}

>>>>>>> 6cbe917029fcd972e35d957df8095f5d78066d77
				</div>
			</div>			
		)
	}
}

export default App;
