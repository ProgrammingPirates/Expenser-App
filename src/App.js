import React, {useState, useEffect} from 'react';

import NewExpense from './components/NewExpense/NewExpense';

import Expenses from './components/Expenses/Expenses';


let DUMMY_EXPENSE = [
    {
        id: 'e1',
        title: 'Schoool',
        price: 234,
        date: new Date(2014,5,45)
    },
    {
        id: 'e2',
        title: 'BOOOKS',
        price: 89,
        date: new Date(2020,5,5)
    },
    {
        id: 'e3',
        title: 'Mess FEE',
        price: 94,
        date: new Date(2013,0,5)
    },
];

const App = () => {
    
    const [expenses, setExpenses] = useState(DUMMY_EXPENSE);

    function fetchData(){
        fetch('https://data.mongodb-api.com/app/data-bxohl/endpoint/data/beta').then(
            response => {
                return response.json();
            }
        ).then(
            data => {
                //console.log(data);
                setExpenses(data);
            }
        );
    }

    useEffect(()=>{
        fetchData();
    },[]);

    const addExpenseHandler = (expense) => {
        fetch('https://data.mongodb-api.com/app/data-bxohl/endpoint/data/beta', {
            method: 'POST',
            body: JSON.stringify(expense),
            headers: {
                'content-Type' : 'application/json'
            }
        }).then(
            response => {
                fetchData();
            }
        );
    };

    return (
        <div>
            <NewExpense onAddExpense={addExpenseHandler} />
            <Expenses item={expenses} />
        </div>    
    );
}

export default App;