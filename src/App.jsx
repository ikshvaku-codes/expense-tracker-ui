// src/App.js
import React, { useState } from 'react';
import Dashboard from './Components/Dashboard';
import ExpenseForm from './Components/ExpenseForm';

const App = () => {
    const [expenses, setExpenses] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false); // State for form visibility

    const addExpense = (expense) => {
        setExpenses([...expenses, expense]);
    };

    const deleteExpense = (id) => {
        setExpenses(expenses.filter(expense => expense.id !== id));
    };
    const toggleFormVisibility = () => {
      setIsFormVisible(!isFormVisible); // Toggle form visibility
  };

    return (
        <div className="container mx-auto p-4 ">
            <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>
            <button 
                onClick={toggleFormVisibility} 
                className="bg-blue-500 text-white p-2 rounded mb-4"
            >
                {isFormVisible ? 'Cancel' : 'Add Expense'}
            </button>
            {isFormVisible && <ExpenseForm onAdd={addExpense} />} {/* Conditionally render the form */}

            <Dashboard expenses={expenses} onDelete={deleteExpense} />
        </div>
    );
};

export default App;