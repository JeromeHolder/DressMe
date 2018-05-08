import React from 'react';

export default class Shoes extends React.Component{
    render(){
        let shoesJSX = this.props.shoes.map((shoe, i)=>{
            return  <div className="card cardWidth" >
                        <img className="card-img-top card-body" src={shoe.picture} />
                        <div className="card-body">
                            <h5 className="card-title">{shoe.name}</h5>
                            <p className="card-text">{shoe.price}</p>
                            <a href="#" className="btn btn-primary">Add to Cart</a>
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

{/* <ul key={i}>
                        <li>{shoe.name}</li>
                        <li>{shoe.price}</li>
                        <button>Add to Cart</button>
                    </ul> */}

    