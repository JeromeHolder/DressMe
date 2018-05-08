import React from 'react';

export default class Hats extends React.Component{
    render(){
        let hatsJSX = this.props.hats.map((hat, i)=>{
            return  <div className="card cardWidth" >
                        <img className="card-img-top card-body" src={hat.picture} />
                        <div className="card-body">
                            <h5 className="card-title">{hat.name}</h5>
                            <p className="card-text">{hat.price}</p>
                            <a href="#" className="btn btn-primary">Add to Cart</a>
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

{/* <ul key={i}>
                        <li>{hat.name}</li>
                        <li>{hat.price}</li>
                        <button>Add to Cart</button>
                    </ul> */}