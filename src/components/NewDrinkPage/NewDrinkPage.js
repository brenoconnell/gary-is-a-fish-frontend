import React from 'react';
import './NewDrinkPage.css';
import DrinkClass from '../TablePage/DrinkClass';

class NewDrinkPage extends React.Component {
    constructor(props) {
        super(props);
        let newDate = new Date()
        console.log(newDate.toString())
        this.state = {
            brand: "",
            brandBeverageName: "",
            beverageType: "",
            price: "",
            volume: 0,
            multipack: false,
            numInMultipack: 0,
            alcoholContent: 0,
            shop: "",
            shopLocation: "",
            shopCountry: "",
            inputTime: newDate.toString(),
            id: this.makeRandID(10)
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

    onSubmitForm(event){
        event.preventDefault()
        let newDrink = new DrinkClass(this.state)
        console.log(newDrink)
    }

    render() {
        return (
            <form onSubmit={(event) => this.onSubmitForm(event)}>

                <label htmlFor="brandInput"><b>Brand</b></label>
                <input name="brandInput" type='text' onChange={(event) => this.myChangeHandler(event, "brand")}/>

                <label htmlFor="brandBeverageNameInput"><b>Beverage Name</b></label>
                <input name="brandBeverageNameInput" type='text' onChange={(event) => this.myChangeHandler(event, "brandBeverageName")}/>

                <label htmlFor="beverageTypeInput"><b>Beverage Type</b></label>
                <input name="beverageTypeInput" type='text' onChange={(event) => this.myChangeHandler(event, "beverageType")}/>

                <label htmlFor="priceInput"><b>Price</b></label>
                <input name="priceInput" type='number' step="0.01" onChange={(event) => this.myChangeHandler(event, "price")}/>

                <label htmlFor="volumeInput"><b>Volume</b></label>
                <input name="volumeInput" type='text' onChange={(event) => this.myChangeHandler(event, "volume")}/>

                <label htmlFor="numInMultipackInput"><b># In Pack</b></label>
                <input name="numInMultipackInput" type='number' onChange={(event) => this.myChangeHandler(event, "numInMultipack")}/>

                <label htmlFor="alcoholContentInput"><b>Alcohol %</b></label>
                <input name="alcoholContentInput" type='number' step="0.01" onChange={(event) => this.myChangeHandler(event, "alcoholContent")}/>

                <label htmlFor="shopInput"><b>Shop</b></label>
                <input name="shopInput" type='text' onChange={(event) => this.myChangeHandler(event, "shop")}/>

                <label htmlFor="shopLocationInput"><b>Shop</b></label>
                <input name="shopLocationInput" type='text' onChange={(event) => this.myChangeHandler(event, "shopLocation")}/>

                <label htmlFor="shopCountryInput"><b>Shop</b></label>
                <input name="shopCountryInput" type='text' onChange={(event) => this.myChangeHandler(event, "shopCountry")}/>

                <button type="submit">SUBMIT</button>
            </form>
        );
    }
}

export default NewDrinkPage;