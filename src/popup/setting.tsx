import React, { useState } from 'react'
import '../assets/tailwind.css'
import { createRoot } from 'react-dom/client'
import Axios from 'axios'

const App = () => {
    return <>
    <NavBar />
    <div className="w-full flex flex-col items-center justify-items-stretch rounded">
        <form>
            <div className="mb-3 mt-[10px] flex flex-col items-center">
                <label className="text-center block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"> Username</label>
                <input type="text" id="newFavWord" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="username" required/>
                <button type="button" className=" w-full mb-[10px] text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center"> Change fav Word </button>
            </div>             
            <div className="mb-3 flex flex-col items-center">
                <label className="text-center block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Favourite Word</label>
                <input type="text" id="newFavSymbol" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="any word you like" required/>
                <button type="button" className=" w-full mb-[10px] text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"> Change fav Symbol </button>
            </div> 
            
            <div className="mb-3 flex flex-col items-center">
                <label className="text-center block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                <input type="password" id="newPassword" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="password" required/>
                <button type="button" className=" w-full mb-[10px] text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"> Change Pw </button>
            </div> 
            
        </form>
        </div>
    </>
}

const NavBar = () => {
    return <div>
          <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-orange-600 mb-3">
                <a className="ml-6 text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white">
                  SagiousPass
                </a>
                <a href="home.html" className="ml-6 text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white" >
                    Home
                </a>
          </nav>
    </div>
}



const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
