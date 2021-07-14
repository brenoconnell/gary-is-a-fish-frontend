import React from 'react';
import allBevTypes from '../HomePage/AllBeverageTypes.json';

class TableFilter extends React.Component {
    
    constructor(props) {
        super(props)
  
        this.handleChangeFilterType = this.handleChangeFilterType.bind(this)
        this.handleChangeFilter = this.handleChangeFilter.bind(this)

        this.allFilterTypes = ["beverageType", "brand", "volume"]
        this.allFilterOptions = {}
        this.allFilterTypes.forEach((type => {
            this.allFilterOptions[type] = this.getAllOptionsForKey(type)
        }))

        this.state = {
            currFilterChoices: this.allFilterOptions[this.allFilterTypes[0]],
            currListOfDrinks: props.listOfDrinks
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
        let newList = this.filterByType()
        this.props.setListOfDrinks(newList)
    }
  
    handleChangeFilter(event) {
        if(this.filterTypeState.value === "volume"){
            this.filterState = {value: parseInt(event.target.value)}
        }
        else{
            this.filterState = {value: event.target.value}
        }
        let newList = this.filterByType()
        this.props.setListOfDrinks(newList)
    }

    filterByType(){
        console.log(this.state)
        if(this.filterState.value === "all"){
            return [...this.props.listOfDrinks]
        }
        let newList = [...this.props.listOfDrinks].filter((drink) => {
            return this.filterState.value === drink[this.filterTypeState.value]
        })
        return newList
    }

    getAllOptionsForKey(key){
        let options = []
        if(key === "beverageType"){
            options = [...allBevTypes.bevTypes].sort((a,b) => a > b ? -1 : 1)
        }
        else {
            this.props.listOfDrinks.forEach((drink) => {
                if(!options.includes(drink[key])){
                    options.push(drink[key])
                }
            })
            options.sort((a,b) => a > b ? -1 : 1)
        }
        options.push("all")
        options.reverse()
        return options
    }
  
    render() {
        return (
            <div>
                <div>
                    <select className="filter-select" id="myTypeFilter" onChange={this.handleChangeFilterType}>
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
                    <select className="filter-select" id="myFilter" onChange={this.handleChangeFilter}>
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