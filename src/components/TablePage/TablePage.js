import React from 'react';
import './TablePage.css';
import Table from './Table';
import DrinkClass from './DrinkClass';
import allFakeDrinks from './fakeDrinksList.json';
import TableFilter from './TableFilter';

// function makeRandID(length) {
//     let result = '';
//     let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//    }
//    return result;
// }

// function makeRandNum(min, max, decimalPlaces) {  
//     let rand = Math.random()*(max-min) + min;
//     let power = Math.pow(10, decimalPlaces);
//     return Math.floor(rand*power) / power;
// }

// function createFakeDrinkList(numFakeDrinks){
//     let fakeDrinkList = []
//     for(let i = 0; i < numFakeDrinks; i++){
//         let id = makeRandID(10);
//         let brand = makeRandID(5);
//         let brandBeverageName = makeRandID(10);
//         let beverageType = "Beer";
//         let price = makeRandNum(0, 50, 2);
//         let currency = "EUR";
//         let volume = makeRandNum(200, 2000, 0);
//         let multipack = false;
//         let numInMultipack = -1;
//         let alcoholContent = makeRandNum(2.5, 70, 1);
//         let shop = makeRandID(7);
//         let shopLocation = makeRandID(7);
//         let shopCity = "Dublin";
//         let shopCountry = "Ireland";
//         let itemImageRef = "";
//         const newDrink = new DrinkClass(id, brand, brandBeverageName, beverageType, 
//             price, currency, volume, multipack, numInMultipack, alcoholContent, shop,
//             shopLocation, shopCity, shopCountry, itemImageRef)
//         fakeDrinkList.push(newDrink);
//     }
//     return fakeDrinkList;
// }

function readFakeDrinksListFromJSON(){
    let fakeDrinkList = []
    allFakeDrinks.forEach((drink) => {
        let id = drink.id;
        let brand = drink.brand;
        let brandBeverageName = drink.brandBeverageName;
        let beverageType = drink.beverageType;
        let price = drink.price;
        let currency = drink.currency;
        let volume = drink.volume;
        let multipack = drink.multipack;
        let numInMultipack = drink.numInMultipack;
        let alcoholContent = drink.alcoholContent;
        let shop = drink.shop;
        let shopLocation = drink.shopLocation;
        let shopCity = drink.shopCity;
        let shopCountry = drink.shopCountry;
        let itemImageRef = drink.itemImageRef;
        let inputTime = new Date(drink.inputTime);
        const newDrink = new DrinkClass(id, brand, brandBeverageName, beverageType, 
                price, currency, volume, multipack, numInMultipack, alcoholContent, shop,
                shopLocation, shopCity, shopCountry, itemImageRef, inputTime)
        fakeDrinkList.push(newDrink);
    });
    return fakeDrinkList
}

function TablePage() {

    const initialList = readFakeDrinksListFromJSON()
    // const initialList = createFakeDrinkList(5)
    const [listOfDrinks, setListOfDrinks] = React.useState(initialList);
    return (
        <div className="TablePage">
            <div>
                <TableFilter listOfDrinks={listOfDrinks} setListOfDrinks={setListOfDrinks}></TableFilter>
            </div>
            <Table listOfDrinks={listOfDrinks} setListOfDrinks={setListOfDrinks}></Table>
        </div>
    );
}

export default TablePage;