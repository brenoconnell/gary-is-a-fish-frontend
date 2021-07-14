import React from 'react';
import './TablePage.css';
import Table from './Table';
import TableFilter from './TableFilter';


function TablePage(props) {
    return (
        <div className="TablePage">
            {/* <TableFilter listOfDrinks={props.listOfDrinks} setListOfDrinks={props.setListOfDrinks}></TableFilter> */}
            <Table listOfDrinks={props.listOfDrinks} setListOfDrinks={props.setListOfDrinks}></Table>
        </div>
    );
}

export default TablePage;