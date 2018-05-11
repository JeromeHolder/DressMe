import React from 'react';

export default class Shoes extends React.Component{
    render(){
        // Returns each shoe item on a card
        let shoesJSX = this.props.shoes.map((shoe, i)=>{
            return  <div className="card cardWidth" key={i}>
                        <img className="card-img-top card-body img-fluid" src={shoe.picture} alt='shoe'/>
                        <div className="card-body">
                            <h5 className="card-title">{shoe.name}</h5>
                            <p className="card-text">${shoe.price}</p>
                            <a className="btn btn-primary" onClick={()=>{this.props.addToCart(shoe)}}>Add to Cart</a>
                        </div>
                    </div>
        })
        return(
            <div className='row'>
                {shoesJSX}
            </div>
        )
    }
}


    