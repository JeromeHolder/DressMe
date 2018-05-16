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

    // Removes items in cart
    clearCart = () => {
        axios.post('http://localhost:8080/clearCart')
            .then(result => {
                this.setState({
                    cart: result.data
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    render(){
        // Redirects to homepage if user not logged in
        // Added a call to clearCart to deal with a case in which the user manually clears local storage
        if(!localStorage.userName){
            this.clearCart();
            return <Redirect to='/' />;
        }
        return (
            <div className="container">
                <div className="sidenav">
                    <h5>Welcome {this.props.userName}!</h5>
                    <nav className="sidenavlinks">
                        <p className="sidelinkheading">Sections</p>
                        <Link className="sidenavdisplay navtextcolor" to='/shop/hats'>Hats</Link>
                        <Link className="sidenavdisplay navtextcolor" to='/shop/shoes'>Shoes</Link>
                    </nav>
                    <div className="cart">
                        <Cart cart={this.state.cart}/>
                        <button className="btn btn-dark" disabled={this.state.cart.length === 0 ? true:false} onClick={this.clearCart}>Clear Cart</button>
                    </div>
                    <button className="btn btn-dark logout" onClick={this.props.logout}>Logout</button>
                </div>
                <div className="main">
                    <Switch>
                        <Route path='/shop/hats' render={ ()=>{return <Hats hats={this.state.hats} addToCart={this.addToCart}/>}} />
                        <Route path='/shop/shoes' render={ ()=>{return <Shoes shoes={this.state.shoes} addToCart={this.addToCart}/>}} />
                    </Switch>
                </div>
            </div>
        )
    }
}