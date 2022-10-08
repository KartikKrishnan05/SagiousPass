import React, { useState } from 'react'
import '../assets/tailwind.css'
import { createRoot } from 'react-dom/client'


const App = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const tabs = [
        {
            name: "Home",
            component: <HomeTab />
        },
        {
            name: "Check",
            component: <CheckTab />
        },
        {
            name: "Save",
            component: <SaveTab />
        },
        {
            name: "Find",
            component: <FindTab />
        },
        {
            name: "Get",
            component: <GetTab />
        },
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
        <div className="w-full flex flex-col items-center justify-items-stretch rounded">
            <div className="flex flex-row items-center justify-items-stretch w-full shadow cursor-pointer">
                {tabs.map((tab, i) => <div key={i} className={ "flex-1 flex justify-center items-center p-2 border-b-2" + (selectedTab === i ? "border-b-blue-500" : "border-b-transparent")} onClick={() => setSelectedTab(i)}>{tab.name}</div>)}
            </div>
            {tabs[selectedTab].component}
        </div>
    </>
}

const HomeTab = () => {
    return <div>
        <div className="mt-[50px] text-center mb-10 font-serif text-5xl">SagiousPass</div>
        <div className="text-center font-mono text-xl"> Welcome to your new and safer Password Manager </div>    
    </div>
}

const CheckTab = () =>{
    return <div>
        <div className="mb-6 mt-[25px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-center">Test you current Password:</label>
            <input type="password" id="testpw" className="outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="Enter your password" required/>
        </div> 
        <button type="button" onClick={überprüfung} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Check</button>
        <p id="result" className="mt-[25px]"> Ihr Passwort ist:  </p> 
    </div>
}

const FindTab = () =>{
    return <div>
        <div className="mb-6 mt-[25px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-center">Page Url</label>
            <input type="url" id="searchurl" className="outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="Enter url to get pw" required/>
        </div> 
        <button type="button" onClick={find} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Find Password</button>
        
    </div>   
}

const SaveTab = () =>{
    return <div>
        <div className="mb-6 mt-[25px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-center">Page Url</label>
            <input type="url" id="url" className="outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="Enter your url" required/>
        </div> 
        <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-center">Your Password</label>
            <input type="password" id="password" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="Enter your password" required/>
        </div> 
        <button type="button" onClick={save} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
        <button type="button" onClick={del} className=" mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete lS</button>
    </div>
}

const GetTab = () =>{
    return <div>
        <div className="mb-6 mt-[25px]">
            <label className=" text-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Favourite Word:</label>
            <input type="text" id="favWord" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="Word with 6 letters" required/>
        </div> 
        <div className="mb-6">
            <label className=" text-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Favourite Symbol:</label>
            <input type="text" id="favSymb" className="outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="fav Symbol" required/>
        </div> 
        <button type="button" onClick={erstellen} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get PW</button>
    </div>
}

const LoginTab = () => {
    return <div>
        <form>
            <div className="mb-6 mt-[25px]">
                <label className="text-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
                <input type="text" id="username" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="username" required/>
            </div> 
            <div className="mb-6">
                <label className="text-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                <input type="password" id="password" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="password" required/>
            </div> 
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">LogIn</button>
        </form>
    </div>
}

const RegisterTab = () => { 
    return <div>
        <form>
            <div className="mb-6 mt-[10px]">
                <label className="text-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
                <input type="text" id="username" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="username" required/>
            </div> 
            <div className="mb-6 ">
                <label className="text-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Favourite Word</label>
                <input type="text" id="favWord" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="any word you like" required/>
            </div> 
            <div className="mb-6 ">
                <label className="text-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Favourite Symbol</label>
                <input type="text" id="favSymb" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="any symbol you like" required/>
            </div> 
            <div className="mb-6">
                <label className="text-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                <input type="password" id="password" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="password" required/>
            </div> 
            <div className="mb-6">
                <label className="text-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm Password</label>
                <input type="password" id="confirmpassword" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="confirm password" required/>
            </div> 
            <button type="button" className=" mb-[20px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">SignUp</button>
        </form>
    </div>
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)


function überprüfung() {
    
    var TestPass = (document.getElementById("testpw") as HTMLInputElement).value
    var strength = 6;

    const hasUpperCase = /[A-Z]/.test(TestPass)
    const hasLowerCase = /[a-z]/.test(TestPass)
    const hasNumbers = /\d/.test(TestPass)
    const hasSpecial = /\W/.test(TestPass)

    if (TestPass.length < 8) {
        strength--;
    }
    if (TestPass.length < 12) {
        strength--;
    }
    if (!hasUpperCase) {
        strength--;
    }
    if (!hasLowerCase) {
        strength--;
    }
    if (!hasNumbers) {
        strength--; 
    }
    if (!hasSpecial) {
        strength--;
    }

    if (strength == 1) {
        document.getElementById("result").innerHTML = "Ihr Passwort ist: UNGENÜGEND";
    } else if (strength == 2) {
        document.getElementById("result").innerHTML = "Ihr Passwort ist: MANGELHAFT";
    } else if (strength == 3) {
        document.getElementById("result").innerHTML = "Ihr Passwort ist: ANNEHMBAR";
    } else if (strength == 4) {
        document.getElementById("result").innerHTML = "Ihr Passwort ist: BEFRIEDIGEND";
    } else if (strength == 5) {
        document.getElementById("result").innerHTML = "Ihr Passwort ist: GUT";
    } else if (strength == 6) {
        document.getElementById("result").innerHTML = "Ihr Passwort ist: SEHR GUT";
    }

    var vorhanden = false;
    vorhanden = ["123456", "123456789", "picture1", "password", "12345678", "111111", "123123", "12345", "1234567890", "senha", "1234567", "qwerty", "abc123", "Million2", "000000", "1234", "iloveyou", "aaron431", "password1", "qqww1122", "123", "omgpop", "123321", "654321", "qwertyuiop", "qwer123456", "123456a", "a123456", "666666", "asdfghjkl", "ashley", "987654321", "unknown", "zxcvbnm", "112233", "chatbooks", "20100728", "123123123", "princess", "jacket025", "evite", "123abc", "123qwe", "sunshine", "121212", "dragon", "1q2w3e4r", "5201314", "159753", "123456789", "pokemon", "qwerty123", "Bangbang123", "jobandtalent", "monkey", "1qaz2wsx", "abcd1234", "default", "aaaaaa", "soccer", "123654", "ohmnamah23", "12345678910", "zing", "shadow", "102030", "11111111", "asdfgh", "147258369", "qazwsx", "qwe123", "michael", "football", "baseball", "1q2w3e4r5t", "party", "daniel", "asdasd", "222222", "myspace1", "asd123", "555555", "a123456789", "888888", "7777777", "fuckyou", "1234qwer", "superman", "147258", "999999", "159357", "love123", "tigger", "purple", "samantha", "charlie", "babygirl", "88888888", "jordan23", "789456123", "jordan", "anhyeuem", "killer", "basketball", "michelle", "1q2w3e", "lol123", "qwerty1", "789456", "6655321", "nicole", "naruto", "master", "chocolate", "maggie", "computer", "hannah", "jessica", "123456789a", "password123", "hunter", "686584", "iloveyou1", "0987654321", "justin", "cookie", "hello", "blink182", "andrew", "25251325", "love", "987654", "bailey", "princess1", "0123456", "101010", "12341234", "a801016", "1111", "1111111", "anthony", "yugioh", "fuckyou1", "amanda", "asdf1234", "trustno1", "butterfly", "x4ivygA51F", "iloveu", "batman", "starwars", "summer", "michael1", "00000000", "lovely", "jakcgt333", "buster", "jennifer", "babygirl1", "family", "456789", "azerty", "andrea", "q1w2e3r4", "qwer1234", "hello123", "10203", "matthew", "pepper", "12345a", "letmein", "joshua", "131313", "123456b", "madison", "Sample123", "777777", "football1", "jesus1", "taylor", "b123456", "whatever", "welcome", "ginger", "flower", "333333", "1111111111", "robert", "samsung", "a12345", "loveme", "gabriel", "alexander", "cheese", "passw0rd", "142536", "peanut", "11223344", "thomas", "Angel1"].includes(TestPass);
    if (vorhanden == true) {
        document.getElementById("Note").innerHTML = "Ihr Passwort ist in den top 200 meist genutzten Passwörter";
    }
}

function erstellen() {

    var favW = (document.getElementById("favWord") as HTMLInputElement).value
    var favS = (document.getElementById("favSymb") as HTMLInputElement).value
   
    if(favW.length < 6){
        alert("Please choose a longer Word")
    } else if(favW.length == 0 ){
        alert("Please input Word")
    } else if(favS.length == 0){
        alert("please input a Symbol")
    } else{
    var password;
    var w = favW.length;

    function generateRandom(maxLimit = w){
      let rand = Math.random() * maxLimit;    
      rand = Math.round(rand);
      return rand;
    }

    var firstNumber = generateRandom(w);
    var secondNumber = generateRandom(w);

    while(firstNumber == 0){
      firstNumber = generateRandom(w);
    }
    while (secondNumber == 0){
      secondNumber = generateRandom(w);
    }
    
    while(firstNumber == secondNumber){
      secondNumber = generateRandom(w);
    }

    const newfavW = favW.slice (0, firstNumber - 1) + favW.charAt(firstNumber - 1).toUpperCase() + favW.slice(firstNumber);
    const finalfavW = newfavW.slice(0, secondNumber -1) + newfavW.charAt(secondNumber -1).toUpperCase() + newfavW.slice(secondNumber);

    password = finalfavW + favS + firstNumber + '' + secondNumber;
    alert(password);
    }
}

function save() {
    var url = (document.getElementById("url") as HTMLInputElement).value
    var pw = (document.getElementById("password") as HTMLInputElement).value
    var name = localStorage.getItem(url);
    if(name){
        alert('New Password word added to ' + url);
    }else{
        var encryptedpw = encrypt(pw);
        localStorage.setItem(url, encryptedpw);
    }
    
}

function del(){
    console.log(localStorage.clear())
    console.log(localStorage)
}

function find(){
    var searchurl = (document.getElementById("searchurl") as HTMLInputElement).value
    var encryptedpw = localStorage.getItem(searchurl)
    var pw = decrypt(encryptedpw)
    alert(pw)
}

var CryptoJS = require("crypto-js/core");
CryptoJS.AES = require("crypto-js/aes");

const pepper = 'yoru'

function encrypt(pw) {
    var encrypted = CryptoJS.AES.encrypt((CryptoJS.enc.Utf8.parse(pw)), pepper);
    return encrypted;
}

function decrypt(encryptedpw) {
    //alert(encryptedpw)
    var decrypted = CryptoJS.AES.decrypt((encryptedpw), pepper).toString(CryptoJS.enc.Utf8);;
    //alert(decrypted)
    return decrypted;
  }