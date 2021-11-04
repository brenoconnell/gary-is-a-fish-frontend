import React from 'react';
import './Table.css';
import DrinkItem from './DrinkItem';
import NewDrinkPage from '../NewDrinkPage/NewDrinkPage';

function removeDrink(drinkId, removeDrink) {
    sendRemoveRequest(drinkId)
    removeDrink(drinkId)
}

function sendRemoveRequest(drinkId){
    let xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
        console.log(xhr.responseText)
    })
    xhr.open('DELETE','http://localhost:5000/drink/' + drinkId)
    xhr.send()   
}

function RemoveDrinkButton(props) {

    return (
        <button onClick={()=>removeDrink(props.myDrinkId, props.removeDrink)}>REMOVE</button>
    )

}

function Table(props) {

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

    const sortType = {
        brand: "Brand",
        garyScore: "Gary Score (ml alc./€)",
        price: "Price",
        beverageType: "Beverage Type",
        numInMultipack: "# in pack",
        volume: "Volume (ml)",
        alcoholContent: "Alcohol %",
        shop: "Shop",
        shopCountry: "Country"
    }

    const [reverseSorted, setReverseSorted] = React.useState(initReverseSorted)
    const [removeDrinkAllowed, setRemoveDrinkAllowed] = React.useState(false)

    const sortByType = (sortType, listOfDrinks, setListOfDrinks) => {
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

    const onClickDrinkItem = (drink) => {
        console.log("openDrink")
        console.log(drink)

        // Open new drink dialog here
        // return(
        //     <NewDrinkPage drink={drink} newDrink={false} listOfDrinks={props.listOfDrinks} setListOfDrinks={props.setListOfDrinks}></NewDrinkPage>
        // )
    }

    // Causes too many rerenders using setListOfDrinks
    // sortByType("garyScore", props.listOfDrinks, props.setListOfDrinks)

    return (
        <div className="Table">
            <ul className="myList">
                <li key="header">
                    <div className="tableHeader">
                        {Object.keys(sortType).map((type) => {
                                return (
                                    <div key={type} onClick={() => sortByType(type, props.listOfDrinks, props.setListOfDrinks)} 
                                    className="drinkCategory"><b>{sortType[type]}</b></div>
                                )
                            })
                        }
                    </div>
                </li>
                {props.listOfDrinks.map((drink) => {
                    return (
                        <li onClick={() => onClickDrinkItem(drink)} key={drink.id}> 
                            <DrinkItem myDrink={drink}></DrinkItem> 
                            {
                                removeDrinkAllowed &&
                                <RemoveDrinkButton removeDrink={props.removeDrink} myDrinkId={drink.id}></RemoveDrinkButton>
                            }  
                        </li>
                    )
                })}
            </ul>
        
        </div>
    );
}

export default Table;