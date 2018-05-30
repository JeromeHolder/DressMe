import React from 'react';

export default class SADisplay extends React.Component{
    render(){
        let sa = this.props.SAinfo;
        let expertiseList = sa.expertise.map((item, i) => {
            return <span key={i} >{item}</span>
        })
        return (
            <div>
                <h1>{sa.fname} {sa.lname}</h1>
                <img src={sa.image} alt=""/>
                <h2>{sa.availRad}</h2>
                <h3>{sa.rating}</h3>
                {expertiseList}
            </div>
        )
    }
}