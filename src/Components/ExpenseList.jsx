// src/components/ExpenseList.js
import React from 'react';
import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses, onDelete }) => {
    return (
        <div className="mt-4">
            {expenses.length === 0 ? (
                <p>No expenses found.</p>
            ) : (
                expenses.map(expense => (
                    <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
                ))
            )}
        </div>
    );
};

export default ExpenseList;