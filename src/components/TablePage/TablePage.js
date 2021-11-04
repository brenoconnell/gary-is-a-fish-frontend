import React from 'react';
import './TablePage.css';
import Table from './Table';
import './../../App.css';
// import TableFilter from './TableFilter';

function handleChangeSearchBar(event, setSearchValue) {
    // console.log(event.target.value)
    setSearchValue(event.target.value)
}

function handleSubmitSearchBar(event, listOfDrinks, setListOfDrinks, getAllDrinks, setHasSearchResult) {
    event.preventDefault()
    getAllDrinks()
    setTimeout(() => {
        let searchedList = searchDrinksByText(listOfDrinks, event.target[0].value)
        if(searchedList === undefined) {
            setHasSearchResult(true)
        }
        else if(searchedList.length > 0){
            setHasSearchResult(true)
            setListOfDrinks(searchedList)
        }
        else {
            setHasSearchResult(false)
        }
    }, 500)
}

function handleResetSearch(getAllDrinks, setSearchValue) {
    setSearchValue("")
    getAllDrinks()
}

function searchDrinksByText(listOfDrinks, text) {
    if(text === ""){
        return undefined
    }
    let searchedList = listOfDrinks.filter((drink) => {
        let containsPhrase = false
        for(let key of Object.keys(drink)){
            if(typeof drink[key] === "string") {
                if((drink[key].toLowerCase()).includes(text.toLowerCase())) {
                    containsPhrase = true
                    break
                }  
            }
        }
        return containsPhrase
    })
    return searchedList
}

function SearchBar(props){
    const [searchValue, setSearchValue] = React.useState("")
    return(
        <form onSubmit={(e) => handleSubmitSearchBar(e, props.listOfDrinks, props.setListOfDrinks, props.getAllDrinks, props.setHasSearchResult)}>
            <input onChange={(e) => handleChangeSearchBar(e, setSearchValue)} value={searchValue} placeholder="Search..." type="text"/>
            <div className="form-buttons">
                <button className="green-submit-button">Search</button>
                <button className="white-button" type="button" onClick={() => handleResetSearch(props.getAllDrinks, setSearchValue)}>Reset</button>
            </div>
        </form>
    )
}


function TablePage(props) {
    const [hasSearchResult, setHasSearchResult] = React.useState(true)

    return (
        <div className="TablePage">
            <SearchBar setHasSearchResult={setHasSearchResult} getAllDrinks={props.getAllDrinks} listOfDrinks={props.listOfDrinks} setListOfDrinks={props.setListOfDrinks}></SearchBar>
            {/* <TableFilter listOfDrinks={props.listOfDrinks} setListOfDrinks={props.setListOfDrinks}></TableFilter> */}
            {   hasSearchResult &&
                <Table removeDrink={props.removeDrink} listOfDrinks={props.listOfDrinks} setListOfDrinks={props.setListOfDrinks}></Table>
            }
            {   !hasSearchResult &&
                <p>
                    No search results...
                </p>
            }
        </div>
    );
}

export default TablePage;