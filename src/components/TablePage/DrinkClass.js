class DrinkClass {
    constructor(id, brand, brandBeverageName, beverageType, price, currency, volume, multipack, numInMultipack, alcoholContent, shop, shopLocation, shopCity, shopCountry, itemImageRef, inputTime) {
        this.id = id;
        this.brand = brand;
        this.brandBeverageName = brandBeverageName;
        this.beverageType = beverageType;
        this.price = price;
        this.currency = currency;
        this.volume = volume;
        this.multipack = multipack;
        this.numInMultipack = numInMultipack;
        this.alcoholContent = alcoholContent;
        this.shop = shop;
        this.shopLocation = shopLocation;
        this.shopCity = shopCity;
        this.shopCountry = shopCountry;
        this.itemImageRef = itemImageRef;
        this.garyScore = this.calcGaryScore();
        this.inputTime = inputTime;
    }

    calcGaryScore(){
        if(!this.multipack){
            return (this.volume * this.alcoholContent * 0.01)/ this.price
        }
        else{
            return (this.volume * this.alcoholContent * 0.01) / (this.price / this.numInMultipack)
        }
    }

    // constructor(){
    //     this.id = -1;
    //     this.brand = "";
    //     this.brandBeverageName = "";
    //     this.beverageType = "";
    //     this.price = -1;
    //     this.currency = "";
    //     this.volume = -1;
    //     this.multipack = false;
    //     this.numInMultipack = -1;
    //     this.alcoholContent = -1;
    //     this.shop = "";
    //     this.shopLocation = "";
    //     this.shopCity = "";
    //     this.shopCountry = "";
    //     this.itemImageRef = "";
    // }
}

export default DrinkClass;

