import React from 'react';

export default class Cart extends React.Component{
    render(){
        // Tallys the number of items in the cart
        let itemCountJSX = this.props.cart.reduce((acc, cur) => {
            return acc + 1;
        }, 0)
        // Calculates the total price of items in the cart
        let totalPriceJSX = this.props.cart.reduce((acc, cur) => {
            return acc + cur.price;
        }, 0)
        return (
            <footer>
                <h3>Cart</h3>
                <p>No. of Items {itemCountJSX}</p>
                <p>Subtotal: ${totalPriceJSX}</p>
            </footer>
        )
    }
}