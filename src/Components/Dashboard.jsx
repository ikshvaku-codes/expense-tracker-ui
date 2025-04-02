// src/components/Dashboard.js
import React from 'react';
import ExpenseOverview from './ExpenseOverview';
import ExpenseList from './ExpenseList';
import Chart from './Chart';

const Dashboard = ({ expenses, onAdd, onDelete }) => {
    return (
        <div className="flex flex-col md:flex-row bg-gray-700">
            <aside className="w-full md:w-1/4 bg-gray-800 p-4">
                <h2 className="text-xl font-bold">Navigation</h2>
                <ul>
                    <li className="py-2">Overview</li>
                    <li className="py-2">One-Time Expenses</li>
                    <li className="py-2">Recurring Expenses</li>
                    <li className="py-2">Reports</li>
                    <li className="py-2">Settings</li>
                </ul>
            </aside>
            <main className="w-full md:w-3/4 p-4">
                <h1 className="text-2xl font-bold">Expense Tracker Dashboard</h1>
                <ExpenseOverview expenses={expenses} />
                <Chart expenses={expenses} />
                <ExpenseList expenses={expenses} onDelete={onDelete} />
            </main>
        </div>
    );
};

export default Dashboard;