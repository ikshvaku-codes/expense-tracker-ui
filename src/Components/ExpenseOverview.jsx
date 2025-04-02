// src/components/ExpenseOverview.js
import React from 'react';

const ExpenseOverview = ({ expenses }) => {
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const oneTimeExpenses = expenses.filter(expense => !expense.isRecurring);
    const recurringExpenses = expenses.filter(expense => expense.isRecurring);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-600 p-4 rounded shadow">
                <h3 className="font-bold">Total Expenses</h3>
                <p>&#x20b9; {totalExpenses.toFixed(2)}</p>
            </div>
            <div className="bg-gray-600 p-4 rounded shadow">
                <h3 className="font-bold">One-Time Expenses</h3>
                <p>&#x20b9; {oneTimeExpenses.reduce((acc, expense) => acc + expense.amount, 0).toFixed(2)}</p>
            </div>
            <div className="bg-gray-600 p-4 rounded shadow">
                <h3 className="font-bold">Recurring Expenses</h3>
                <p>&#x20b9; {recurringExpenses.reduce((acc, expense) => acc + expense.amount, 0).toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ExpenseOverview;