// src/components/TransactionManager.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionManager = () => {
    const [transactions, setTransactions] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');
    const [minAmount, setMinAmount] = useState('');
    const [maxAmount, setMaxAmount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTransactions();
    }, [page]);

    const fetchTransactions = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`/api/transactions?page=${page}&size=${size}`);
            setTransactions(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            setError("Error fetching transactions");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTransaction = { description, amount, date };
        try {
            await axios.post('/api/transactions', newTransaction);
            fetchTransactions();
            setDescription('');
            setAmount(0);
            setDate('');
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/transactions/${id}`);
            fetchTransactions();
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    const handleFilter = async () => {
        try {
            const response = await axios.get('/api/transactions/filter', {
                params: {
                    minAmount: minAmount || undefined,
                    maxAmount: maxAmount || undefined,
                    startDate: startDate || undefined,
                    endDate: endDate || undefined,
                },
            });
            setTransactions(response.data);
        } catch (error) {
            console.error("Error filtering transactions:", error);
        }
    };

    const clearFilters = () => {
        setMinAmount('');
        setMaxAmount('');
        setStartDate('');
        setEndDate('');
        fetchTransactions(); // Reset to original transaction list
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Transaction Manager</h2>
            {loading && <p className="text-gray-500 ">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border rounded p-2 mr-2"
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border rounded p-2 mr-2"
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border rounded p-2 mr-2"
                    required
                />
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white rounded p-2"
                >
                    Add Transaction
                </button>
            </div>
            <div className="mb-4">
                <input
                    type="number"
                    placeholder="Min Amount"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    className="border rounded p-2 mr-2"
                />
                <input
                    type="number"
                    placeholder="Max Amount"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                    className="border rounded p-2 mr-2"
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded p-2 mr-2"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border rounded p-2 mr-2"
                />
                <button
                    onClick={handleFilter}
                    className="bg-green-500 text-white rounded p-2"
                >
                    Filter
                </button>
                <button
                    onClick={clearFilters}
                    className="bg-gray-500 text-white rounded p-2 ml-2"
                >
                    Clear Filters
                </button>
            </div>
            <ul className="border-t border-gray-300">
                {transactions.map((transaction) => (
                    <li key={transaction.id} className="flex justify-between items-center py-2">
                        <span>
                            {transaction.description} - ${transaction.amount} on {transaction.date}
                        </span>
                        <button
                            onClick={() => handleDelete(transaction.id)}
                            className="bg-red-500 text-white rounded p-1"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                    className="bg-blue-500 text-white rounded p-2"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages - 1}
                    className="bg-blue-500 text-white rounded p-2"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionManager;