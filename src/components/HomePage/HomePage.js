import React from 'react';
import './HomePage.css';
import Tabs from "../Tabs/Tabs"; 
import TablePage from '../TablePage/TablePage';
import NewDrinkPage from '../NewDrinkPage/NewDrinkPage';
import DrinkClass from '../TablePage/DrinkClass';

function Welcome(props) {
  return <h2>Hello, {props.name}</h2>;
}

function HomePage() {

    const initialList = []
    const [listOfDrinks, setListOfDrinks] = React.useState(initialList);

    const removeDrink = (drinkId) => {
        let newList = listOfDrinks.filter((drink) => {
            return drink.id !== drinkId
        })
        setListOfDrinks(newList)
    }

    React.useEffect(() => {
        let xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            let newDrinksList = []
            for(let drink of JSON.parse(xhr.responseText)){
                newDrinksList.push(new DrinkClass(drink))
            }
            setListOfDrinks(newDrinksList)
        })
        xhr.open('GET','http://localhost:5000/drink')
        xhr.send()
    }, [])

    return (
        <div className="HomePage">
            <div>
                <Welcome name="You" />
            </div>
            <Tabs> 
                <div label="All Drinks"> 
                    <TablePage removeDrink={removeDrink} listOfDrinks={listOfDrinks} setListOfDrinks={setListOfDrinks}></TablePage> 
                </div>
                <div label="Submit New Drink">
                    <NewDrinkPage listOfDrinks={listOfDrinks} setListOfDrinks={setListOfDrinks}></NewDrinkPage>
                </div>
            </Tabs> 
        </div>
    );
}

export default HomePage;
