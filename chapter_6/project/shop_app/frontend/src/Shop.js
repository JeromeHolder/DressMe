import React from 'react';
import {Route, Switch, Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import Hats from './Hats';
import Shoes from './Shoes';
import Cart from './Cart';

export default class Shop extends React.Component{
    constructor(){
        super();
        this.state={
            shoes: [],
            hats: [],
            cart: []
        };
    }

    // Gets catalogue of items from server
    componentDidMount(){
        axios.get('http://localhost:8080/catalogue')
             .then(result => {
                 this.setState({
                    shoes: result.data.shoes,
                    hats: result.data.hats,
                    cart: result.data.cart
                 })
             })
             .catch(error => {
                 console.log(error);
             })
    }

    // Adds selected items to the cart in state
    addToCart = (item) => {
        axios.post('http://localhost:8080/cart', {
            item})
             .then(result => {
                 this.setState({
                     cart: result.data
                 })
             })
             .catch(error => {
                 console.log(error);
             })
    }

    render(){
        // Redirects to homepage if user not logged in
        if(!localStorage.userName){
            return <Redirect to='/' />;
        }
        return (
            <div>
                <h1>Shop</h1>
                <h3>Welcome {this.props.userName}</h3>
                <nav>
                    <Link to='/shop/hats'>Hats</Link>
                    <Link to='/shop/shoes'>Shoes</Link>
                </nav>
                <Switch>
                    <Route path='/shop/hats' render={ ()=>{return <Hats hats={this.state.hats} addToCart={this.addToCart}/>}} />
                    <Route path='/shop/shoes' render={ ()=>{return <Shoes shoes={this.state.shoes} addToCart={this.addToCart}/>}} />
                </Switch>
                <Cart cart={this.state.cart}/>
            </div>
        )
    }
}