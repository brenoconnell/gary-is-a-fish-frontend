import React from 'react';
import './NewDrinkPage.css';
import DrinkClass from '../TablePage/DrinkClass';

import allBevTypes from '../HomePage/AllBeverageTypes.json';

class NewDrinkPage extends React.Component {
    constructor(props) {
        super(props);

        this.listOfDrinks = props.listOfDrinks
        this.setListOfDrinks = props.setListOfDrinks

        this.allBevTypes = [...allBevTypes.bevTypes].sort((a,b) => a > b ? 1 : -1)

        
        this.state = {
            brand: "",
            brandBeverageName: "",
            beverageType: this.allBevTypes[0],
            price: "",
            volume: 0,
            multipack: false,
            numInMultipack: 0,
            alcoholContent: 0,
            shop: "",
            shopLocation: "",
            shopCountry: "",
            inputTime: "",
            id: "",
            currency: "EUR"
        }
    }

    myChangeHandler(event, myKey){
        this.setState({[myKey]: event.target.value})
    }

    makeRandID(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    postNewDrink(drink) {
        let xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            console.log(xhr.responseText)
        })
        xhr.open('POST','http://localhost:5000/postNewDrink')
        xhr.send(JSON.stringify(drink))
    }

    onSubmitForm(event){
        event.preventDefault()
        let newDate = new Date()
        let newDrink = new DrinkClass(this.state)
        newDrink.id = this.makeRandID(10)
        newDrink.inputTime = newDate.toString()
        if(newDrink.isValidDrink()){
            this.props.listOfDrinks.push(newDrink)
            this.props.setListOfDrinks(this.props.listOfDrinks)
            this.postNewDrink(newDrink)
        }
        else{
            console.log(newDrink)
            alert("INVALID, try again")
        }
    }

    render() {
        return (
            <form onSubmit={(event) => this.onSubmitForm(event)}>
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="brandInput"><b>Brand</b></label>
                        <input placeholder="Carlsberg..." name="brandInput" type='text' onChange={(event) => this.myChangeHandler(event, "brand")}/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="brandBeverageNameInput"><b>Beverage Name</b></label>
                        <input placeholder="Regular, Unfiltered..." name="brandBeverageNameInput" type='text' onChange={(event) => this.myChangeHandler(event, "brandBeverageName")}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="beverageTypeSelect"><b>Beverage Type</b></label>
                        <select value={this.state.beverageType} placeholder="Beer, Wine..." className="form-select" name="beverageTypeSelect" type='text' onChange={(event) => this.myChangeHandler(event, "beverageType")}>
                            {this.allBevTypes.map((bevType) => {
                                return (
                                    <option key={bevType} value={bevType}>{bevType}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="priceInput"><b>Price (EUR)</b></label>
                        <input placeholder="Price in EUR..." name="priceInput" type='number' step="0.01" onChange={(event) => this.myChangeHandler(event, "price")}/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="volumeInput"><b>Volume (ml)</b></label>
                        <input placeholder="Vol. in ml..." name="volumeInput" type='number' onChange={(event) => this.myChangeHandler(event, "volume")}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="alcoholContentInput"><b>Alcohol %</b></label>
                        <input placeholder="% v/v alcohol..." name="alcoholContentInput" type='number' step="0.01" onChange={(event) => this.myChangeHandler(event, "alcoholContent")}/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="numInMultipackInput"><b># In Pack</b></label>
                        <input placeholder="1, 4, 8..." name="numInMultipackInput" type='number' onChange={(event) => this.myChangeHandler(event, "numInMultipack")}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="shopInput"><b>Shop Namw</b></label>
                        <input placeholder="Tesco, Circle K..." name="shopInput" type='text' onChange={(event) => this.myChangeHandler(event, "shop")}/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="shopLocationInput"><b>Shop Area</b></label>
                        <input placeholder="Booterstown..." name="shopLocationInput" type='text' onChange={(event) => this.myChangeHandler(event, "shopLocation")}/>
                    </div>
                    
                </div>
                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="shopCountryInput"><b>Shop Country</b></label>
                        <input placeholder="Ireland..." name="shopCountryInput" type='text' onChange={(event) => this.myChangeHandler(event, "shopCountry")}/>
                    </div>
                </div>
                <div className="form-buttons">
                    <button className="green-submit-button" type="submit">SUBMIT</button>
                </div>
            </form>
        );
    }
}

export default NewDrinkPage;