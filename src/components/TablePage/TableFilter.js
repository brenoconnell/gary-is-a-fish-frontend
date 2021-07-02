import React from 'react';

class TableFilter extends React.Component {
    
    constructor(props) {
        super(props);
        this.listOfDrinks = props.listOfDrinks
        this.setListOfDrinks = props.setListOfDrinks
  
        this.handleChangeFilterType = this.handleChangeFilterType.bind(this)
        this.handleChangeFilter = this.handleChangeFilter.bind(this)

        this.allFilterTypes = ["beverageType", "brand", "volume" ]
        this.allFilterOptions = {}
        this.allFilterTypes.forEach((type => {
            let myType = type.replace(" ", "")
            this.allFilterOptions[myType] = this.getAllOptionsForKey(myType)
        }))

        this.currFilterChoices = this.allFilterOptions[this.allFilterTypes[0]]

        this.filterTypeState = {value: this.allFilterTypes[0]}
        this.filterState = {value: this.currFilterChoices[0]}
    }

    handleChangeFilterType(event) {
        this.filterTypeState = {value: event.target.value}
        this.filterState = {value: "all"}
        this.setListOfDrinks(this.filterByType())

        let newFilterType = this.filterTypeState.value.replace(" ", "")
        this.currFilterChoices = this.allFilterOptions[newFilterType]
        console.log(this.currFilterChoices)
    }
  
    handleChangeFilter(event) {
        this.filterState = {value: event.target.value}
        let filteredList = this.filterByType();
        this.setListOfDrinks(filteredList);
    }

    filterByType(){
        let filterStateValue = this.filterState.value
        let filterTypeStateValue = this.filterTypeState.value.replace(" ", "")

        if(filterStateValue === "all"){
            return this.listOfDrinks
        }
        let newList = this.listOfDrinks.filter((drink) => {
            return filterStateValue == drink[filterTypeStateValue]
        })
        return newList
    }

    getAllOptionsForKey(key){
        let options = ["All"]
        this.listOfDrinks.forEach((drink) => {
            if(!options.includes(drink[key])){
                options.push(drink[key])
            }
        })
        return options;
    }
  
    render() {
        return (
            <div>
                <div>
                    <label htmlFor="typeFilter"> What do you want to filter?</label>
                    <select name="typeFilter" id="myTypeFilter" onChange={this.handleChangeFilterType}>
                        {this.allFilterTypes.map((type) => {
                            return (
                                <option key={type} value={type}> 
                                    {type} 
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="filter">Filter</label>
                    <select name="filter" id="myFilter" onChange={this.handleChangeFilter}>
                        {this.currFilterChoices.map((choice) => {
                            return (
                                <option key={choice} value={choice}> 
                                    {choice} 
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>

        );
    }
}

export default TableFilter;