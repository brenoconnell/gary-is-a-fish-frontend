import React from 'react';
import './Table.css';
import DrinkItem from './DrinkItem';
// eslint-disable-next-line
import NewDrinkPage from '../NewDrinkPage/NewDrinkPage';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


function removeDrink(drink, removeDrink) {
    sendRemoveRequest(drink.id)
    removeDrink(drink.id)
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
        <button onClick={()=>removeDrink(props.myDrink, props.removeDrink)}>REMOVE</button>
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

    // Both of these attributes deal with possible admin features
    // eslint-disable-next-line

    const [reverseSorted, setReverseSorted] = React.useState(initReverseSorted)
    const [open, setOpen] = React.useState(false)
    const [selectedDrink, setSelectedDrink] = React.useState({})

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const onClickDrinkItem = (drink) => {
        setSelectedDrink(drink)
        handleClickOpen()
    }

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
                                props.adminAccess &&
                                <RemoveDrinkButton removeDrink={props.adminAccess} myDrink={drink}></RemoveDrinkButton>
                            }  
                        </li>
                    )
                })}
            </ul>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedDrink.brand}</DialogTitle>
                <DialogContent style={{"overflow": "hidden"}}>
                    <NewDrinkPage 
                        drink={selectedDrink} 
                        newDrink={false} 
                        listOfDrinks={props.listOfDrinks} 
                        setListOfDrinks={props.setListOfDrinks}
                        handleClose={handleClose}
                        editMode={props.adminAccess}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        
        </div>
    );
}

export default Table;