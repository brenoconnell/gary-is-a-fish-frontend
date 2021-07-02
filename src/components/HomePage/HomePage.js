import React from 'react';
import './HomePage.css';
import Tabs from "../Tabs/Tabs"; 
import TablePage from '../TablePage/TablePage';

function Welcome(props) {
  return <h2>Hello, {props.name}</h2>;
}

function createList(limit){
    let myList = []
    for(let i = 0; i < limit; i++){
        myList[i] = i
    }
    return myList
}

function onClickReact(num){
    console.log(num)
}

function addListItem(myList, setList){
    const newList = myList.concat(myList.length);
    setList(newList);
}

function AddListItemButton(props){
    const myList = props.myList
    const setList = props.setList
    return (
        <button onClick={() => addListItem(myList, setList)}>+</button>
    )
}

function removeListItem(myList, setList){
    const newList = myList.slice(0, myList.length - 1);
    setList(newList);
}

function RemoveListItemButton(props){
    const myList = props.myList
    const setList = props.setList
    return (
        <button onClick={() => removeListItem(myList, setList)}>-</button>
    )
}

function HomePage() {

    const initialList = createList(5)
    const [myList, setList] = React.useState(initialList);
    return (
        <div className="HomePage">
            <div>
                <Welcome name="You" />
            </div>
            <Tabs> 
                <div label="Table Page"> 
                    <TablePage></TablePage> 
                </div> 
                <div label="myList">
                    <ul className="myList">
                        {myList.map((item) => {
                            return (<li key={item}>
                                <button onClick={() => onClickReact(item + 1)}>{item + 1}</button>
                            </li>)
                        })}
                    </ul>
                    <AddListItemButton myList={myList} setList={setList}></AddListItemButton>
                    <RemoveListItemButton myList={myList} setList={setList}></RemoveListItemButton>
                </div>
            </Tabs> 
        </div>
    );
}

export default HomePage;
