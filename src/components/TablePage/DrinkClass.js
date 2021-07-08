class DrinkClass {

    constructor(drink) {
        this.id = drink.id;
        this.brand = drink.brand;
        this.brandBeverageName = drink.brandBeverageName;
        this.beverageType = drink.beverageType;
        this.price = parseInt(drink.price);
        this.currency = drink.currency;
        this.volume = parseInt(drink.volume);
        this.multipack = drink.multipack;
        this.numInMultipack = drink.numInMultipack;
        this.alcoholContent = parseInt(drink.alcoholContent);
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
}

export default DrinkClass;

