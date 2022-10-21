import React, { useState } from 'react'
import '../assets/tailwind.css'
import { createRoot } from 'react-dom/client'
import Axios from 'axios'
import {Buffer} from 'buffer';


const App = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const tabs = [
    {
        name: "Login",
        component: <LoginTab />
    },
    {
        name: "Register",
        component: <RegisterTab />
    },
    ]
    return <>
    <NavBar />
    <div className="w-full flex flex-col items-center justify-items-stretch rounded">
    <div className="flex flex-row items-center justify-items-stretch w-full shadow cursor-pointer">
          {tabs.map((tab, i) => <div key={i} className={ "flex-1 flex justify-center items-center p-2 pt-4 border-b-2 mt-[-20px]"} onClick={() => setSelectedTab(i)}>{tab.name}</div>)}
    </div>
    {tabs[selectedTab].component}
    </div>
    </>
}

const NavBar = () => {
    return <div>
          <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-orange-600 mb-3">
                <a className="ml-6 text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white">
                  SagiousPass
                </a>
          </nav>
    </div>
}
const LoginTab = () => {

    const login = () => {
    const usernameLog = (document.getElementById("usernameLog") as HTMLInputElement).value
    //alert(usernameLog)
    const passwordLog = (document.getElementById("passwordLog") as HTMLInputElement).value 
    //alert(passwordLog)

    Axios.post('http://localhost:3000/login', {
        Username: usernameLog, 
        Password: passwordLog, 
    }).then((response) => {
        if(response.data.message){
            alert(response.data.message)
        } else{
            console.log(response.data[0].Username)
        }
    })
}

    return <div>
        <form>
            <div className="mb-6 mt-[25px]">
                <label className="text-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
                <input type="text" id="usernameLog" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="username" required/>
            </div> 
            <div className="mb-6">
                <label className="text-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                <input type="password" id="passwordLog" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="password" required/>
            </div> 
            <button type="button" onClick={login} className="text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">LogIn</button>
        </form>
    </div>

}


const RegisterTab = () => { 
    // const [usernameReg, setUsernameReg] = useState("");
    // const [passwordReg, setPasswordReg] = useState("");
    // const [favWordReg, setFavWordReg] = useState("");
    // const [favSymbolReg, setFavSymbolReg] = useState("");

    const register = () => {
        const usernameReg = (document.getElementById("usernameReg") as HTMLInputElement).value
        const passwordReg = (document.getElementById("passwordReg") as HTMLInputElement).value 
        const favWordReg = (document.getElementById("favWordReg") as HTMLInputElement).value
        const favSymbolReg = (document.getElementById("favSymbReg") as HTMLInputElement).value
        const confirmPw = (document.getElementById("confirmpwReg") as HTMLInputElement).value

        if(confirmPw != passwordReg){
            alert("Confirm Password doenst match with initial Password");
            (document.getElementById("confirmpwReg") as HTMLInputElement).value = '';
        } else{

            Axios.post('http://localhost:3000/register', {
                Username: usernameReg, 
                Password: passwordReg, 
                FavWord: favWordReg, 
                FavSymbol: favSymbolReg,
                // Salt: SaltReg
            }).then((response) => {
                console.log(response);
            })

        alert("Registered");

        (document.getElementById("usernameReg") as HTMLInputElement).value = '';
        (document.getElementById("passwordReg") as HTMLInputElement).value = '';
        (document.getElementById("favWordReg") as HTMLInputElement).value = '';
        (document.getElementById("favSymbReg") as HTMLInputElement).value = '';
        (document.getElementById("confirmpwReg") as HTMLInputElement).value = '';

        }
    }

    return <div>
        <form id="form">
            <div className="mb-3 mt-[10px]">
                <label className="text-center block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"> Username</label>
                <input type="text" id="usernameReg" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="username" required/>
            </div> 
            <div className="mb-3 ">
                <label className="text-center block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Favourite Word</label>
                <input type="text"id="favWordReg" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="any word you like" required/>
            </div> 
            <div className="mb-3 ">
                <label className="text-center block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Favourite Symbol</label>
                <input type="text"id="favSymbReg" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="any symbol you like" required/>
            </div> 
            <div className="mb-3">
                <label className="text-center block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                <input type="password"id="passwordReg" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="password" required/>
            </div> 
            <div className="mb-3">
                <label className="text-center block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm Password</label>
                <input type="password" id="confirmpwReg" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="confirm password" required/>
            </div> 
            <button type="button" className=" mb-[10px] text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={register}>SignUp</button>
        </form>
    </div>
}


const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)

