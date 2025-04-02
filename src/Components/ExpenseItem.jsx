// src/components/ExpenseItem.js
import React from 'react';

const ExpenseItem = ({ expense, onDelete }) => {
    return (
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div>
                <h3 className="text-lg font-semibold">{expense.description}</h3>
                <p className="text-gray-400">{expense.category}</p>
                <p className="text-gray-400">{expense.isRecurring ? 'Recurring' : 'One-Time'}</p>
            </div>
            <div className="flex items-center">
                <span className="text-xl font-bold">${expense.amount.toFixed(2)}</span>
                <button
                    onClick={() => onDelete(expense.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ExpenseItem;