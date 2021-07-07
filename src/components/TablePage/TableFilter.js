
import React from 'react';

class TableFilter extends React.Component {
    
    constructor(props) {
        super(props);
        this.listOfDrinks = props.listOfDrinks
        this.setListOfDrinks = props.setListOfDrinks
  
        this.handleChangeFilterType = this.handleChangeFilterType.bind(this)
        this.handleChangeFilter = this.handleChangeFilter.bind(this)

        this.allFilterTypes = ["beverageType", "brand", "volume", "alcoholContent" ]
        this.allFilterOptions = {}
        this.allFilterTypes.forEach((type => {
            this.allFilterOptions[type] = this.getAllOptionsForKey(type)
        }))

        this.state = {
            currFilterChoices: this.allFilterOptions[this.allFilterTypes[0]]
        }
        this.filterTypeState = {value: this.allFilterTypes[0]}
        this.filterState = {value: this.state.currFilterChoices[0]}
    }

    handleChangeFilterType(event) {
        this.filterTypeState = {value: event.target.value}
        this.filterState = {value: "all"}
        this.setState({
            currFilterChoices: this.allFilterOptions[event.target.value]
        })
        this.setListOfDrinks(this.filterByType())
    }
  
    handleChangeFilter(event) {
        this.filterState = {value: event.target.value}
        this.setListOfDrinks(this.filterByType());
    }

    filterByType(){
        let filterStateValue = this.filterState.value
        let filterTypeStateValue = this.filterTypeState.value

        if(filterStateValue === "all"){
            return this.listOfDrinks
        }
        let newList = this.listOfDrinks.filter((drink) => {
            return filterStateValue == drink[filterTypeStateValue]
        })
        return newList
    }

    getAllOptionsForKey(key){
        let options = ["all"]
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
                        {this.state.currFilterChoices.map((choice) => {
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