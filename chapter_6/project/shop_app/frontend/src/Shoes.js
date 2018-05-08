import React from 'react';

export default class Shoes extends React.Component{
    render(){
        let shoesJSX = this.props.shoes.map((shoe, i)=>{
            return <ul className='listStyle' key={i}>
                        <li>{shoe.name}</li>
                        <li>{shoe.price}</li>
                        <button>Add to Cart</button>
                    </ul>
        })
        return(
            <div>
                {shoesJSX}
            </div>
        )
    }
}