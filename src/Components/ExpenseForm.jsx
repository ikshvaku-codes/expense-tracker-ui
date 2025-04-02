// src/components/ExpenseForm.js
import React, { useState } from 'react';

const ExpenseForm = ({ onAdd }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description || !amount || !category) return;

        const newExpense = { 
            id: Date.now(), 
            description, 
            amount: parseFloat(amount), 
            category, 
            isRecurring 
        };
        onAdd(newExpense);

        setDescription('');
        setAmount('');
        setCategory('');
        setIsRecurring(false);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border border-gray-300 rounded">
            <h2 className="text-xl font-semibold mb -4">Add New Expense</h2>
            <div className="mb-4">
                <label className="block mb-1">Description</label>
                <input 
                    type="text" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="border border-gray-300 p-2 w-full rounded" 
                    required 
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Amount</label>
                <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    className="border border-gray-300 p-2 w-full rounded" 
                    required 
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Category</label>
                <input 
                    type="text" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    className="border border-gray-300 p-2 w-full rounded" 
                    required 
                />
            </div>
            <div className="mb-4">
                <label className="flex items-center">
                    <input 
                        type="checkbox" 
                        checked={isRecurring} 
                        onChange={(e) => setIsRecurring(e.target.checked)} 
                        className="mr-2" 
                    />
                    Recurring Expense
                </label>
            </div>
            <button 
                type="submit" 
                className="bg-blue-500 text-white p-2 rounded"
            >
                Add Expense
            </button>
        </form>
    );
};

export default ExpenseForm;