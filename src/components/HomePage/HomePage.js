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

    const getAllDrinks = () => {
        const sortProp = "garyScore"
        let xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            let newDrinksList = []
            for(let drink of JSON.parse(xhr.responseText)){
                newDrinksList.push(new DrinkClass(drink))
            }
            newDrinksList.sort((drinkA, drinkB) => {
                if (drinkA[sortProp] < drinkB[sortProp]) {
                    return 1;
                }
                if (drinkA[sortProp] > drinkB[sortProp]) {
                    return -1;
                }
                return 0;
            })
            setListOfDrinks(newDrinksList)
        })
        xhr.open('GET','http://localhost:5000/drink')
        xhr.send()
    }

    React.useEffect(() => {
        getAllDrinks()
    }, [])

    return (
        <div className="HomePage">
            <div>
                <Welcome name="You" />
            </div>
            <Tabs> 
                <div label="All Drinks"> 
                    <TablePage getAllDrinks={getAllDrinks} removeDrink={removeDrink} listOfDrinks={listOfDrinks} setListOfDrinks={setListOfDrinks}></TablePage> 
                </div>
                <div label="Submit New Drink">
                    <NewDrinkPage newDrink={true} listOfDrinks={listOfDrinks} setListOfDrinks={setListOfDrinks} editMode={true}></NewDrinkPage>
                </div>
            </Tabs> 
        </div>
    );
}

export default HomePage;
