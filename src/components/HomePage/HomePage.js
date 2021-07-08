import React from 'react';
import './HomePage.css';
import Tabs from "../Tabs/Tabs"; 
import TablePage from '../TablePage/TablePage';

function Welcome(props) {
  return <h2>Hello, {props.name}</h2>;
}

function HomePage() {
    return (
        <div className="HomePage">
            <div>
                <Welcome name="You" />
            </div>
            <Tabs> 
                <div label="All Drinks"> 
                    <TablePage></TablePage> 
                </div>
                <div label="Submit New Drink">
                    I'm gonna put a big form in here
                </div>
            </Tabs> 
        </div>
    );
}

export default HomePage;
