import React, { useState } from 'react'
import '../assets/tailwind.css'
import { createRoot } from 'react-dom/client'
import Axios from 'axios'

function getParameter () {
    let parameter = new URLSearchParams(window.location.search);
    return parameter.get("username")
}
var Username =  getParameter()

var CryptoJS = require("crypto-js/core");
CryptoJS.AES = require("crypto-js/aes");
const pepper = 'Yoru'

const Home = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const tabs = [
        {
            name: "Create",
            component: <CreateTab />
        },
        {
            name: "Save",
            component: <SaveTab />
        },
        {
            name: "Check",
            component: <CheckTab />
        },
        {
            name: "Find",
            component: <FindTab />
        }
    ]
    return <>
        <NavBar />
        <div className="w-full flex flex-col items-center justify-items-stretch rounded">
            <div className="flex flex-row items-center justify-items-stretch w-full shadow cursor-pointer">
                {tabs.map((tab, i) => <div key={i} className={"flex-1 flex justify-center items-center p-2 pt-4 border-b-2 mt-[-20px]"} onClick={() => setSelectedTab(i)}>{tab.name}</div>)}
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
                <a href={"setting.html?username=" + Username} className="ml-6 text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white" >
                    User
                </a>
          </nav>
    </div>
}

const CheckTab = () => {
    return <div>
        <div className="mb-6 mt-[25px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-center">Test you current Password:</label>
            <input type="password" id="testpw" className="outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="Enter your password" required />
        </div>
        <button type="button" onClick={überprüfung} className="text-white  bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Check</button>
        <p id="result" className="mt-[25px]"> Ihr Passwort ist:  </p>
    </div>
}

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

const FindTab = () => {
    return <div>
        <div className="mb-6 mt-[25px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-center">Page Url</label>
            <input type="url" id="searchurl" className="outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="Enter url to remember pw ;)" required />
        </div>
        <button type="button" onClick={find} className="text-white  bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Find Password</button>

    </div>
}

function find() {

    var searchurl = (document.getElementById("searchurl") as HTMLInputElement).value
    var Username = Username

    Axios.post('http://localhost:3000/find', {
        username: Username,
        url: searchurl,
    }).then((response) => {
        if (response.data.message) {
            alert(response.data.message);
            (document.getElementById("searchurl") as HTMLInputElement).value = '';
        } else {
            var decryptedpw = decrypt(response.data)
            alert(decryptedpw)
        }
    });


}

const SaveTab = () => {
    return <div>
        <div className="mb-6 mt-[25px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-center">Page Url</label>
            <input type="url" id="url" className="outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="Enter your url" required />
        </div>
        <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-center">Your Password</label>
            <input type="password" id="password" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="Enter your password" required />
        </div>
        <button type="button" onClick={save} className="text-white  bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
        <button type="button" onClick={update} className=" my-6 text-white  bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Update </button>
    </div>
}

function save() {

    const UrlSave = (document.getElementById("url") as HTMLInputElement).value;
    const PasswordSave = (document.getElementById("password") as HTMLInputElement).value;

    var PasswordSaveEnc = encrypt(PasswordSave).toString()

    Axios.post('http://localhost:3000/save', {
        Username: Username,
        urlSave: UrlSave,
        passwordSave: PasswordSaveEnc,
    }).then((response) => {
        if (response.data.message) {
            alert(response.data.message);
        } else {
            alert("Passward was saved to this url: " + UrlSave);
            (document.getElementById("url") as HTMLInputElement).value = '';
            (document.getElementById("password") as HTMLInputElement).value = '';
        }
    });

    //localStorage: 
    // var name = localStorage.getItem(url);
    // if (name) {
    //     alert('New Password word added to ' + url);
    // } else {
    //     var encryptedpw = encrypt(pw);
    //     localStorage.setItem(url, encryptedpw);
    // }

}

function update() {

    const UrlSave = (document.getElementById("url") as HTMLInputElement).value;
    const PasswordSave = (document.getElementById("password") as HTMLInputElement).value;

    var PasswordSaveEnc = encrypt(PasswordSave).toString()

    Axios.post('http://localhost:3000/update', {
        Username: Username,
        urlSave: UrlSave,
        passwordSave: PasswordSaveEnc,
    }).then((response) => {
        if (response.data.message) {
            alert(response.data.message);
        } else {
            alert("Passward was updated for this url: " + UrlSave);
            (document.getElementById("url") as HTMLInputElement).value = '';
            (document.getElementById("password") as HTMLInputElement).value = '';
        }
    });
}

const CreateTab = () => {
    return <div>
        <button type="button" onClick={erstellen} className="my-12 text-white  bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get Password</button>
    </div>
}

function erstellen() {

    Axios.post('http://localhost:3000/getFavWord&Symbol', {
        Username: Username
    }).then((result) => {
        console.log(result)
        var favW;
        favW = result.data[0].FavWord;
        var favS;
        favS = result.data[0].FavSymbol;

        var password;
        var w = favW.length;

        function generateRandom(maxLimit = w) {
            let rand = Math.random() * maxLimit;
            rand = Math.round(rand);
            return rand;
        }

        var firstNumber = generateRandom(w);
        var secondNumber = generateRandom(w);

        while (firstNumber == 0) {
            firstNumber = generateRandom(w);
        }
        while (secondNumber == 0) {
            secondNumber = generateRandom(w);
        }

        while (firstNumber == secondNumber) {
            secondNumber = generateRandom(w);
        }

        const newfavW = favW.slice(0, firstNumber - 1) + favW.charAt(firstNumber - 1).toUpperCase() + favW.slice(firstNumber);
        const finalfavW = newfavW.slice(0, secondNumber - 1) + newfavW.charAt(secondNumber - 1).toUpperCase() + newfavW.slice(secondNumber);

        password = finalfavW + favS + firstNumber + '' + secondNumber;
        alert(password);
    });



}

function encrypt(pw) {
    var encrypted = CryptoJS.AES.encrypt((CryptoJS.enc.Utf8.parse(pw)), pepper);
    return encrypted;
}

function decrypt(encryptedpw) {
    var decrypted = CryptoJS.AES.decrypt((encryptedpw), pepper).toString(CryptoJS.enc.Utf8);
    return decrypted;
}


const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<Home />)