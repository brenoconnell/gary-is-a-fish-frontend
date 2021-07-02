import React from 'react';

let currencySymbols = {
    'USD': '$', // US Dollar
    'EUR': '€', // Euro
    'CRC': '₡', // Costa Rican Colón
    'GBP': '£', // British Pound Sterling
    'ILS': '₪', // Israeli New Sheqel
    'INR': '₹', // Indian Rupee
    'JPY': '¥', // Japanese Yen
    'KRW': '₩', // South Korean Won
    'NGN': '₦', // Nigerian Naira
    'PHP': '₱', // Philippine Peso
    'PLN': 'zł', // Polish Zloty
    'PYG': '₲', // Paraguayan Guarani
    'THB': '฿', // Thai Baht
    'UAH': '₴', // Ukrainian Hryvnia
    'VND': '₫', // Vietnamese Dong
};

function MultipackInfo(props) {
    let isMultipack = props.multipack;
    let numInMultipack = props.numInMultipack;
    if(!isMultipack){
        numInMultipack = 1
    }
    return(<div className="drinkCategory">{numInMultipack}</div>)
}

function countryNameToCode(countryName){
    var countries = require("i18n-iso-countries");
    countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
    let code = countries.getAlpha2Code(countryName, "en");
    return code.toLowerCase();
}

function CountryFlag(props){
    let src = "https://www.countryflags.io/" + countryNameToCode(props.countryName) +"/flat/48.png";
    return <div className="drinkCategory"><img src={src} alt={props.countryName}></img></div>
}

function DrinkItem(props) {
    let myDrink = props.myDrink;
    return (
        <div className="DrinkItem">
            <div className="drinkCategory">{myDrink.brand}</div>
            <div className="drinkCategory">{myDrink.brandBeverageName}</div>
            <div className="drinkCategory">{currencySymbols[myDrink.currency]} {myDrink.price}</div>
            <MultipackInfo multipack={myDrink.multipack} numInMultipack={myDrink.numInMultipack}></MultipackInfo>
            <div className="drinkCategory">{myDrink.volume}</div>
            <div className="drinkCategory">{myDrink.alcoholContent}</div>
            <div className="drinkCategory">{myDrink.garyScore.toFixed(2)}</div>
            <CountryFlag countryName={myDrink.shopCountry}></CountryFlag>
        </div>
    );
}

export default DrinkItem;