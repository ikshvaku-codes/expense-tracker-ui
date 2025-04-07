import Dashboard from './Dashboard';
import OneTimeExpenseView from './OneTimeExpenseView';
export const MAIN_MENU_ITEMS = [
    {
      title: 'Overview',
      index: 0,
      component: <Dashboard />
    },
    {
      title: 'One-Time Expenses',
      index: 0,
      component: <OneTimeExpenseView />
    },
    {
      title: 'Recurring Expenses',
      index: 0,
      component: <Dashboard />
    },
    {
      title: 'Reports',
      index: 0,
      component: <Dashboard />
    },
    {
      title: 'Settings',
      index: 4,
      component: <Dashboard />
    },


]


export const HEADER_ITEM = [
  {
    header: 'Expense',
    index: 0,
  },
  {
    header: 'Income',
    index: 1,
  },
  {
    header: 'Invest',
    index: 2,
  },
  {
    header: 'Debt',
    index: 3,
  },
  {
    header: 'Application',
    index: 4,
  },
 
]