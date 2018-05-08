import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import Hats from './Hats';
import Shoes from './Shoes';

export default class Shop extends React.Component{
    constructor(){
        super();
        this.state={
            shoes: [
                {
                    name: 'Cross-trainer',
                    price: 120,
                    type: 'shoe'
                },
                {
                    name: 'Running',
                    price: 100,
                    type: 'shoe'
                },
                {
                    name: 'Dress',
                    price: 150,
                    type: 'shoe'
                }
            ],
            hats: [
                {
                    name: 'Baseball cap',
                    price: 30,
                    type: 'hat'
                },
                {
                    name: 'Flat cap',
                    price: 65,
                    type: 'hat'
                },
                {
                    name: 'Top hat',
                    price: 90,
                    type: 'hat'
                }
            ]
        };
    }

    render(){
        return (
            <div>
                <h1>Shop</h1>
                <nav>
                    <Link to='/shop/hats'>Hats</Link>
                    <Link to='/shop/shoes'>Shoes</Link>
                </nav>
                <Switch>
                    <Route path='/shop/hats' render={ ()=>{return <Hats hats={this.state.hats}/>}} />
                    <Route path='/shop/shoes' render={ ()=>{return <Shoes shoes={this.state.shoes}/>}} />
                </Switch>
            </div>
        )
    }
}