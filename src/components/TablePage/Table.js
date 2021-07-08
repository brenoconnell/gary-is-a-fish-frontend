import React from 'react';
import './Table.css';
import DrinkItem from './DrinkItem';

function Table(props) {

    const listOfDrinks = props.listOfDrinks

    return (
        <div className="Table">
            <ul className="myList">
                <li key="header">
                    <div className="tableHeader">
                        <div className="drinkCategory"><b>Brand</b></div>
                        <div className="drinkCategory"><b>Info</b></div>
                        <div className="drinkCategory"><b>Price</b></div>
                        <div className="drinkCategory"><b># in pack</b></div>
                        <div className="drinkCategory"><b>Volume (ml)</b></div>
                        <div className="drinkCategory"><b>Alcohol % </b></div>
                        <div className="drinkCategory"><b>Gary Score (ml alc./€)</b></div>
                        <div className="drinkCategory"><b>Country</b></div>
                    </div>
                </li>
                {listOfDrinks.map((drink) => {
                    return (
                        <li key={drink.id}> 
                            <DrinkItem myDrink={drink}></DrinkItem> 
                        </li>
                    )
                })}
            </ul>
        
        </div>
    );
}

export default Table;