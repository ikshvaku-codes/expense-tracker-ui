import React from 'react'
import {MAIN_MENU_ITEMS, HEADER_ITEM} from './MenuItems';
const NavBar = ({ setSelectedMenu}) => {
    const handleMenuClick = (menu) => {
        console.log(menu.target.textContent);
        setSelectedMenu(menu.target.textContent);
    };
  return (
    <>
        <h2 className="text-xl font-bold">Navigation</h2>
        <ul>
            {
                HEADER_ITEM.map((item, counter) => (
                    <div key= {counter}>
                        <div className='container bg-gray-800 text-gray-500 ml-2 mt-2 rounded-lg'>
                            <h3 className='text-lg font-semibold'>{item.header}</h3>

                        </div>
                        {
                            MAIN_MENU_ITEMS.filter((element)=> item.index === element.index).map((element, index) => (
                                
                               
                                    
                                    <li className="py-2 ml-6"  key={index}>
                                        <button onClick={handleMenuClick}>{element.title}</button>
                                    </li>
                                
                            ))          

                        }


                    </div>
                ))
                
            }
        </ul>
    </>
  )
}

export default NavBar;
