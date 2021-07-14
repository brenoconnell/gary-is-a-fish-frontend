import allBevTypes from '../HomePage/AllBeverageTypes.json';

class DrinkClass {

    constructor(drink) {
        this.id = drink.id;
        this.brand = drink.brand;
        this.brandBeverageName = drink.brandBeverageName;
        this.beverageType = drink.beverageType;
        this.price = parseFloat(drink.price);
        this.currency = drink.currency;
        this.volume = parseInt(drink.volume);
        this.multipack = drink.multipack;
        this.numInMultipack = drink.numInMultipack;
        this.alcoholContent = parseFloat(drink.alcoholContent);
        this.shop = drink.shop;
        this.shopLocation = drink.shopLocation;
        this.shopCity = drink.shopCity;
        this.shopCountry = drink.shopCountry;
        this.itemImageRef = drink.itemImageRef;
        this.garyScore = this.calcGaryScore();
        this.inputTime = new Date(drink.inputTime);
    }

    calcGaryScore(){
        if(!this.multipack){
            return (this.volume * this.alcoholContent * 0.01)/ this.price
        }
        else{
            return (this.volume * this.alcoholContent * 0.01) / (this.price / this.numInMultipack)
        }
    }

    isValidDrink(){
        let requiredTextFields = ["id", "brand", "brandBeverageName", "shop", "shopLocation", "shopCountry"]
        let requiredNumFields = ["price", "volume", "alcoholContent", "garyScore"]

        let valid = true
        let invalidFields = []

        for(let field of requiredTextFields){
            if(this[field] === ""){
                valid = false
                invalidFields.push(field)
            }
        }
        for(let field of requiredNumFields){
            if(!Number(this[field]) || this[field] === 0){
                valid = false
                invalidFields.push(field)
            }
        }
        if(this.inputTime === undefined){
            valid = false
            invalidFields.push("inputTime")
        }
        if(!allBevTypes.bevTypes.includes(this.beverageType)){
            valid = false
            invalidFields.push("beverageType")
        }
        return valid
    }
}

export default DrinkClass;

