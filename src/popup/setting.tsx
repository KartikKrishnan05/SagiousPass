import React, { useState } from 'react'
import '../assets/tailwind.css'
import { createRoot } from 'react-dom/client'
import Axios from 'axios'

function getParameter () {
    let parameter = new URLSearchParams(window.location.search);
    return parameter.get("username")
}

var Username =  getParameter()

const Setting = () => {
    alert(Username)
    return <>
    <NavBar />
        <div className="w-full flex flex-col items-center justify-items-stretch rounded">
            <form>
                <div className="mb-3 mt-[10px] flex flex-col items-center">
                    <label className="text-center block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"> Favourite Word</label>
                    <input type="text" id="newFavWord" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="any word you like" required />
                    <button type="button" onClick={changeFavWord} className=" w-full mb-[10px] text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center"> Change fav Word </button>
                </div>
                <div className="mb-3 flex flex-col items-center">
                    <label className="text-center block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Favourite Symbol</label>
                    <input type="text" id="newFavSymbol" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="any symbol you like" required />
                    <button type="button" onClick={changeFavSymbol} className=" w-full mb-[10px] text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"> Change fav Symbol </button>
                </div>

                <div className="mb-3 flex flex-col items-center">
                    <label className="text-center block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                    <input type="password" id="newPassword" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="new password" required />
                    <button type="button" onClick={changePassword}  className=" w-full mb-[10px] text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"> Change Pw </button>
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
                <a href={"home.html?username=" + Username} className="ml-6 text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white" >
                    Home
                </a>
          </nav>
    </div>
}



function changeFavWord() {
    const newFavWord = (document.getElementById("newFavWord") as HTMLInputElement).value

    if (newFavWord.length > 9) {
        (document.getElementById("newFavWord") as HTMLInputElement).value = '';
        alert("Please choose shorter word")
        return;
    }

    if (newFavWord.length < 6) {
        (document.getElementById("newFavWord") as HTMLInputElement).value = '';
        alert("Please choose a longer word")
        return;
    }

    if (newFavWord == '') {
        alert("please input Word parameter")
        return;
    }

    Axios.post('http://localhost:3000/changefavword', {
        FavWord: newFavWord,
        Username: Username
    }).then((response) => {
        alert(response.data.message);
        (document.getElementById("newFavWord") as HTMLInputElement).value = '';
    })
}

function changeFavSymbol() {
    const newFavSymbol = (document.getElementById("newFavSymbol") as HTMLInputElement).value

    if (newFavSymbol.length >= 2) {
        (document.getElementById("newFavWord") as HTMLInputElement).value = '';
        alert("Please only choose one character")
        return;
    }

    let symbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/§?]+/;
    let letters = /[a-zA-Z]/;

    if (symbols.test(newFavSymbol)) {
        if (letters.test(newFavSymbol)) {
            (document.getElementById("newFavSymbol") as HTMLInputElement).value = '';
            alert("please dont input Letters with the Symbol")
            return;
        }
    } else {
        (document.getElementById("newFavSymbol") as HTMLInputElement).value = '';
        alert("please input a Letter as the Symbol")
        return;
    }

    if (newFavSymbol == '') {
        alert("please input Symbol parameter")
        return;
    }

    Axios.post('http://localhost:3000/changefavsymbol', {
        FavSymbol: newFavSymbol,
        Username: Username
    }).then((response) => {
        alert(response.data.message);
        (document.getElementById("newFavSymbol") as HTMLInputElement).value = '';
    })
}

function changePassword() {
    const newPassword = (document.getElementById("newPassword") as HTMLInputElement).value


    if (newPassword == '') {
        alert("please input Symbol parameter")
        return;
    }

    Axios.post('http://localhost:3000/changepassword', {
        NewPassword: newPassword,
        Username: Username
    }).then((response) => {
        alert(response.data.message);
        (document.getElementById("newPassword") as HTMLInputElement).value = '';
    })
}


const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<Setting />)
