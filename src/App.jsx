// // src/App.js
// import React, { useState } from 'react';
// import Dashboard from './Components/Dashboard';
// import ExpenseForm from './Components/ExpenseForm';
// import { LOCAL_URL } from './environments/environment' // Adjust the import based on your project structure
// import axios from 'axios';
// const EXPENSE_URI = LOCAL_URL + '/api/expenses'; // Replace with your actual API endpoint
// const App = () => {
//     const [expenses, setExpenses] = useState([]);
//     const [isFormVisible, setIsFormVisible] = useState(false); // State for form visibility
//     const [message, setMessage] = useState(null); // State for message
//     const addExpense = (expense) => {
//         console.log(expense)
//         axios.post(EXPENSE_URI, expense)
//             .then(response => {
//                 if(response.status === 201) {
//                     setMessage('Expense added successfully!');
//                 }
//             }).catch(error => {
//                 console.error('There was an error!', error);
//             }
//         );
//     };

//     const deleteExpense = (id) => {
//         setExpenses(expenses.filter(expense => expense.id !== id));
//     };
//     const toggleFormVisibility = () => {
//         setMessage(null); // Clear message when toggling form visibility
//       setIsFormVisible(!isFormVisible); // Toggle form visibility
//   };

//     return (
//         <div className="container mx-auto p-4 ">
//             <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>
//             <button 
//                 onClick={toggleFormVisibility} 
//                 className="bg-blue-500 text-white p-2 rounded mb-4"
//             >
//                 {isFormVisible ? 'Cancel' : 'Add Expense'}
//             </button>
//             {isFormVisible && <ExpenseForm onAdd={addExpense} message={message}/>} {/* Conditionally render the form */}

//             <Dashboard expenses={expenses} onDelete={deleteExpense} />
//         </div>
//     );
// };

// export default App;


// src/App.jsx
import React, {  useEffect, useState } from 'react';
import Dashboard from './Components/Dashboard';
import TransactionEntry from './Components/TransactionEntry';
import NavBar from './Components/NavBar';
import axios from 'axios';
import { LOCAL_URL } from './environments/environment'; // Adjust the import based on your project structure
import { MAIN_MENU_ITEMS } from './Components/MenuItems';

const TRANSACTION_URI = LOCAL_URL + '/api/transactions'; // Replace with your actual API endpoint
const App = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    //const [isNavbarVisible, setIsNavbarVisible ]= useState(false);
    const [message, setMessage] = useState(null);
    const [selectedMenu, setSelectedMenu] = useState(MAIN_MENU_ITEMS[0].title); // State for selected menu
    const [ mainScreen, setMainScreen]=useState(<Dashboard/>); // State for main screen
    const toggleIsFormVisible = () => {
        setIsFormVisible(!isFormVisible);
    }
   
   // POST TRANSACTION API HIT
    const onAdd = (transaction) => {
        console.log(transaction);
        axios.post(TRANSACTION_URI, transaction)
            .then(response => {
                if(response.status === 201) {
                    setMessage('Transaction added successfully!');
                    setIsFormVisible(false);
                    setMainScreen();
                } else{
                    setMessage('Failed to add transaction.');
                }
            }).catch(error => {
                console.error('There was an error!', error);
            });
        }


     // Default to Dashboard
    useEffect(() => {
        // const setMainScreenValue = () => {
        MAIN_MENU_ITEMS.map((menuItem) => {
            if(menuItem.title==selectedMenu){
                setMainScreen(menuItem.component);
            }
        })
    
        //};
    }, [selectedMenu]);

    return (
        <div className="container mx-auto p-4 ">
            <h1 className="text-3xl font-bold mb-4">Money Manager</h1>
            <button onClick={toggleIsFormVisible} className="bg-blue-500 text-white p-2 rounded mb-4">Add Transaction</button>
            {isFormVisible && <TransactionEntry message={message} onAdd={onAdd}/>}
            <div className="flex flex-col md:flex-row bg-gray-700 ">
                <aside className="w-full md:w-1/4 bg-gray-800 p-4">
                <NavBar setSelectedMenu={setSelectedMenu}/>
                </aside>
                <main className="w-full md:w-3/4 p-4">
                    {mainScreen}                 
                </main>
            </div>       
        </div>
    );
};

export default App;