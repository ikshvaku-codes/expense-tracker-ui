import {React, useState} from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const TRANSACTION_TYPE = [
    'Expense',
    'Income',
    'Investment',
    'Loan'
]
const TransactionEntry = ({onAdd, message}) => {
    const [description, setDescription] = useState('');
        const [amount, setAmount] = useState('');
        const [category, setCategory] = useState('');
        const [isRecurring, setIsRecurring] = useState(false);
        const [date, setDate] = useState(new Date());
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!description || !amount || !category) return;

        const newExpense = { 
            id: Date.now(), 
            date: date,
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
        setDate(new Date());
    }

    const [selectedOption, setSelectedOption] = useState("");

    // Handle dropdown selection
    const handleChange = (event) => {
      setSelectedOption(event.target.value);
      console.log(`You selected: ${event.target.value}`);
    };
  
  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border border-gray-300 rounded">
        <div className="flex items-center justify-between mb-4">
            <h2 className='text-xl font-semibold mb -4'>Record New Transaction</h2>
            <div className=" m-4 py-4">
                <label htmlFor="dropdown">Choose an option:</label>
                <select id="dropdown" value={selectedOption} onChange={handleChange} className=" mx-4">
                {         
                    TRANSACTION_TYPE.map((opt, index) => (
                        <option key={index} value={opt} className="border border-gray-800 bg-gray-700 p-2 w-full rounded ">
                            {opt}
                        </option>
                    ))
                }
                </select>

            </div>
        </div>
        {message && <p className="text-green-500 mb-4">{message}</p>} 
        <div className="mb-4">
            <label className="block mb-1">Date</label>
            <DatePicker 
                selected={date} 
                onChange={(date) => setDate(date)} 
                required 
            />
        </div>
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
                Recurring Transaction
            </label>
        </div>
        <button 
            type="submit" 
            className="bg-blue-500 text-white p-2 rounded"
        >
            Add Expense
        </button>
    </form>
  )
}

export default TransactionEntry