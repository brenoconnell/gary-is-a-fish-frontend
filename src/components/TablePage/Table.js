import React from 'react';
import './Table.css';
import DrinkItem from './DrinkItem';

function sortByType(sortType, listOfDrinks, setListOfDrinks, reverseSorted, setReverseSorted){

    let reverseSort = reverseSorted[sortType]
    let newList = []

    if(!reverseSort){
        newList = [...listOfDrinks].sort((drinkA, drinkB) => {
            if(drinkA[sortType] > drinkB[sortType]) return 1
            else if(drinkA[sortType] === drinkB[sortType]) return 0
            else return -1
        })
        reverseSorted[sortType] = !reverseSorted[sortType]
        setReverseSorted(reverseSorted)
    }
    else{
        newList = [...listOfDrinks].sort((drinkA, drinkB) => {
            if(drinkA[sortType] < drinkB[sortType]) return 1
            else if(drinkA[sortType] === drinkB[sortType]) return 0
            else return -1
        })
        reverseSorted[sortType] = !reverseSorted[sortType]
        setReverseSorted(reverseSorted)
    }
    setListOfDrinks(newList)
}

function Table(props) {

    const listOfDrinks = props.listOfDrinks
    const setListOfDrinks = props.setListOfDrinks

    const initReverseSorted = {
        brand: false,
        garyScore: true,
        price: false,
        beverageType: false,
        numInMultipack: false,
        volume: false,
        alcoholContent: false,
        shop: false,
        shopCountry: false
    }

    const [reverseSorted, setReverseSorted] = React.useState(initReverseSorted)

    return (
        <div className="Table">
            <ul className="myList">
                <li key="header">
                    <div className="tableHeader">
                        <div onClick={() => sortByType("brand", listOfDrinks, setListOfDrinks, reverseSorted, setReverseSorted)} 
                            className="drinkCategory"><b>Brand</b>
                        </div>
                        <div onClick={() => sortByType("garyScore", listOfDrinks, setListOfDrinks, reverseSorted, setReverseSorted)} 
                            className="drinkCategory"><b>Gary Score (ml alc./€)</b>
                        </div>
                        <div onClick={() => sortByType("price", listOfDrinks, setListOfDrinks, reverseSorted, setReverseSorted)} 
                            className="drinkCategory"><b>Price</b>
                        </div>
                        <div onClick={() => sortByType("beverageType", listOfDrinks, setListOfDrinks, reverseSorted, setReverseSorted)} 
                            className="drinkCategory"><b>Beverage Type</b>
                        </div>
                        <div onClick={() => sortByType("numInMultipack", listOfDrinks, setListOfDrinks, reverseSorted, setReverseSorted)} 
                            className="drinkCategory"><b># in pack</b>
                        </div>
                        <div onClick={() => sortByType("volume", listOfDrinks, setListOfDrinks, reverseSorted, setReverseSorted)} 
                            className="drinkCategory"><b>Volume (ml)</b>
                        </div>
                        <div onClick={() => sortByType("alcoholContent", listOfDrinks, setListOfDrinks, reverseSorted, setReverseSorted)} 
                            className="drinkCategory"><b>Alcohol % </b>
                        </div>
                        <div onClick={() => sortByType("shop", listOfDrinks, setListOfDrinks, reverseSorted, setReverseSorted)} 
                            className="drinkCategory"><b>Shop</b>
                        </div>
                        <div onClick={() => sortByType("shopCountry", listOfDrinks, setListOfDrinks, reverseSorted, setReverseSorted)} 
                            className="drinkCategory"><b>Country</b>
                        </div>
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