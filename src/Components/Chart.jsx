// src/components/Chart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ expenses }) => {
    const categories = [...new Set(expenses.map(expense => expense.category))];
    const data = {
        labels: categories,
        datasets: [{
            data: categories.map(category => 
                expenses.filter(expense => expense.category === category).reduce((acc, expense) => acc + expense.amount, 0)
            ),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        }],
    };

    return (
        <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Expense Distribution</h2>
            <Pie data={data} />
        </div>
    );
};

export default Chart;