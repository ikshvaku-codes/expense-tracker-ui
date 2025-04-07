import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseOverview from './ExpenseOverview';
import Chart from './Chart';
import ExpenseList from './ExpenseList';
import { LOCAL_URL } from '../environments/environment';

const EXPENSE_URI = LOCAL_URL + '/api/transactions';
const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    axios.get(EXPENSE_URI)
    .then(response => {
      setExpenses(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the expenses!', error);
    });
  }
  useEffect(() => {
    fetchExpenses();
  }, []);


    const deleteExpense = (id) => {
        axios.delete(`${EXPENSE_URI}/${id}`)
        .then(response => {
          if (response.status === 200) {
            fetchExpenses(); 
          }
        })
    };
  return (
    <div>
      <h1 className="text-2xl font-bold">Expense Tracker Dashboard</h1>
      <ExpenseOverview expenses={expenses} />
      <Chart expenses={expenses} />
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
    </div>
  )
}

export default Dashboard