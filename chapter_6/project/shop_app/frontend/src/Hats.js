import React from 'react';

export default class Hats extends React.Component{
    render(){
        // Returns each hat item on a card
        let hatsJSX = this.props.hats.map((hat, i)=>{
            return  <div className="card cardWidth" key={i}>
                        <img className="card-img-top card-body img-fluid" src={hat.picture} alt='hat'/>
                        <div className="card-body">
                            <h5 className="card-title">{hat.name}</h5>
                            <p className="card-text">${hat.price}</p>
                            <a className="btn btn-primary" onClick={()=>{this.props.addToCart(hat)}}>Add to Cart</a>
                        </div>
                    </div>
        })
        return(
            <div className='row'>
                {hatsJSX}
            </div>
        )
    }
}