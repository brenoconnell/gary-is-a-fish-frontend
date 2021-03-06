import React from 'react';
import './TablePage.css';
import Table from './Table';
import './../../App.css';

function handleChangeSearchBar(event, setSearchValue) {
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

function handleResetSearch(getAllDrinks, setSearchValue, setHasSearchResult) {
    setSearchValue("")
    setHasSearchResult(true)
    getAllDrinks()
}

function searchDrinksByText(listOfDrinks, text) {
    if(text === ""){
        return undefined
    }
    let searchedList = [...listOfDrinks].filter((drink) => {
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

// eslint-disable-next-line
function SearchBar(props){
    const [searchValue, setSearchValue] = React.useState("")
    return(
        <form onSubmit={(e) => handleSubmitSearchBar(e, props.listOfDrinks, props.setListOfDrinks, props.getAllDrinks, props.setHasSearchResult)}>
            <input onChange={(e) => handleChangeSearchBar(e, setSearchValue)} value={searchValue} placeholder="Search..." type="text"/>
            <div className="form-buttons" style={{width: "30%"}}>
                <button className="green-submit-button">Search</button>
                <button className="white-button" type="button" onClick={() => handleResetSearch(props.getAllDrinks, setSearchValue, props.setHasSearchResult)}>Reset</button>
            </div>
        </form>
    )
}

function TablePage(props) {
    // eslint-disable-next-line
    const [hasSearchResult, setHasSearchResult] = React.useState(true)

    return (
        <div className="TablePage">
            {/* <SearchBar setHasSearchResult={setHasSearchResult} getAllDrinks={props.getAllDrinks} listOfDrinks={props.listOfDrinks} setListOfDrinks={props.setListOfDrinks}></SearchBar> */}
            {   hasSearchResult 
                ? <Table adminAccess={props.adminAccess} removeDrink={props.removeDrink} listOfDrinks={props.listOfDrinks} setListOfDrinks={props.setListOfDrinks}></Table>
                : <p> No search results... </p>
            }
        </div>
    );
}

export default TablePage;