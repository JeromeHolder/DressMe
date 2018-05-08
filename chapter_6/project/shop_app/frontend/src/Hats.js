import React from 'react';

export default class Hats extends React.Component{
    render(){
        let hatsJSX = this.props.hats.map((hat, i)=>{
            return <ul className='listStyle' key={i}>
                        <li>{hat.name}</li>
                        <li>{hat.price}</li>
                        <button>Add to Cart</button>
                    </ul>
        })
        return(
            <div>
                {hatsJSX}
            </div>
        )
    }
}