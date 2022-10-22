import React, { useState } from 'react'
import '../assets/tailwind.css'
import { createRoot } from 'react-dom/client'
import Axios from 'axios'
import axios from 'axios';


const username = 'kartik';


const App = () => {

    const [selectedScreen, setSelectedScreen] = useState(2);
    const screens = [
        {
            name: "LogReg",
            component: <LogReg />
        },
        {
            name: "Home",
            component: <Home />
        },
        {
            name: "Setting",
            component: <Setting />
        }
    ]
    return <>
        {screens[selectedScreen].component}
    </>
}

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
    return <div>
        <NavBar />
        <div className="w-full flex flex-col items-center justify-items-stretch rounded">
            <div className="flex flex-row items-center justify-items-stretch w-full shadow cursor-pointer">
                {tabs.map((tab, i) => <div key={i} className={"flex-1 flex justify-center items-center p-2 pt-4 border-b-2 mt-[-20px]"} onClick={() => setSelectedTab(i)}>{tab.name}</div>)}
            </div>
            {tabs[selectedTab].component}
        </div>
    </div>
}

const LogReg = () => {
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
    return <div>
        <NavBar />
        <div className="w-full flex flex-col items-center justify-items-stretch rounded">
            <div className="flex flex-row items-center justify-items-stretch w-full shadow cursor-pointer">
                {tabs.map((tab, i) => <div key={i} className={"flex-1 flex justify-center items-center p-2 pt-4 border-b-2 mt-[-20px]"} onClick={() => setSelectedTab(i)}>{tab.name}</div>)}
            </div>
            {tabs[selectedTab].component}
        </div>
    </div>
}

const Setting = () => {
    return <div>
        < NavBar />
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
                    <button type="button" className=" w-full mb-[10px] text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"> Change fav Symbol </button>
                </div>

                <div className="mb-3 flex flex-col items-center">
                    <label className="text-center block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                    <input type="password" id="newPassword" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="new password" required />
                    <button type="button" className=" w-full mb-[10px] text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"> Change Pw </button>
                </div>

            </form>
        </div>
    </div>
}

function changeFavWord(){
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

    if (newFavWord == '' ) {
        alert("please input all parameters")
        return;
    }

    Axios.post('http://localhost:3000/changefavword', {
            FavWord: newFavWord,
            Username: username
        }).then((response) => {
            alert(response.data.message);
            (document.getElementById("newFavWord") as HTMLInputElement).value = '';
        })
}

const NavBar = () => {
    return <div>
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-orange-600 mb-3">
            <a className="ml-6 text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white">
                SagiousPass
            </a>
            {/* <a onClick={() => setSelectedScreen(2) className="ml-6 text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white" >
                    User
            </a> */}
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
            if (response.data.message) {
                alert(response.data.message)
            }
        })
    }

    return <div>
        <form>
            <div className="mb-6 mt-[25px]">
                <label className="text-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
                <input type="text" id="usernameLog" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="username" required />
            </div>
            <div className="mb-6">
                <label className="text-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                <input type="password" id="passwordLog" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="password" required />
            </div>
            <button type="button" onClick={login} className="text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">LogIn</button>
        </form>
    </div>

}

const RegisterTab = () => {
    const register = () => {
        const usernameReg = (document.getElementById("usernameReg") as HTMLInputElement).value
        const passwordReg = (document.getElementById("passwordReg") as HTMLInputElement).value
        const favWordReg = (document.getElementById("favWordReg") as HTMLInputElement).value
        const favSymbolReg = (document.getElementById("favSymbReg") as HTMLInputElement).value
        const confirmPw = (document.getElementById("confirmpwReg") as HTMLInputElement).value

        if (usernameReg.length > 9) {
            (document.getElementById("usernameReg") as HTMLInputElement).value = '';
            alert("Please choose shorter word")
            return;
        }

        if (usernameReg.length < 6) {
            (document.getElementById("usernameReg") as HTMLInputElement).value = '';
            alert("Please choose a longer word")
            return;
        }

        if (usernameReg == '' || passwordReg == '' || favWordReg == '' || favSymbolReg == '' || confirmPw == '') {
            alert("please input all parameters")
            return;
        }

        let symbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/§?]+/;
        let letters = /[a-zA-Z]/;

        if (symbols.test(favSymbolReg)) {
            if (letters.test(favSymbolReg)) {
                (document.getElementById("favSymbReg") as HTMLInputElement).value = '';
                alert("please dont input Letters with the Symbol")
                return;
            }
        } else {
            (document.getElementById("favSymbReg") as HTMLInputElement).value = '';
            alert("please input a Letter as the Symbol")
            return;
        }

        if (confirmPw != passwordReg) {
            alert("Confirm Password doesn't match with initial Password");
            (document.getElementById("confirmpwReg") as HTMLInputElement).value = '';
        } else {
            Axios.post('http://localhost:3000/register', {
                Username: usernameReg,
                Password: passwordReg,
                FavWord: favWordReg,
                FavSymbol: favSymbolReg,
            }).then((response) => {
                if (response.data.message) {
                    alert(response.data.message);
                    (document.getElementById("usernameReg") as HTMLInputElement).value = '';
                } else {
                    alert("Registered");
                    (document.getElementById("usernameReg") as HTMLInputElement).value = '';
                    (document.getElementById("passwordReg") as HTMLInputElement).value = '';
                    (document.getElementById("favWordReg") as HTMLInputElement).value = '';
                    (document.getElementById("favSymbReg") as HTMLInputElement).value = '';
                    (document.getElementById("confirmpwReg") as HTMLInputElement).value = '';
                }
            });

        }
    }

    return <div>
        <form id="form">
            <div className="mb-3 mt-[10px]">
                <label className="text-center block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"> Username</label>
                <input type="text" id="usernameReg" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="username: length 6-9" required />
            </div>
            <div className="mb-3 ">
                <label className="text-center block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Favourite Word</label>
                <input type="text" id="favWordReg" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="any word you like" required />
            </div>
            <div className="mb-3 ">
                <label className="text-center block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Favourite Symbol</label>
                <input type="text" id="favSymbReg" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="any symbol you like" required />
            </div>
            <div className="mb-3">
                <label className="text-center block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                <input type="password" id="passwordReg" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="password" required />
            </div>
            <div className="mb-3">
                <label className="text-center block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm Password</label>
                <input type="password" id="confirmpwReg" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="confirm password" required />
            </div>
            <button type="button" className=" mb-[10px] text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={register}>SignUp</button>
        </form>
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

    Axios.post('http://localhost:3000/find', {
        url: searchurl,
    }).then((response) => {
        if(response.data.message){
            alert(response.data.message);
            (document.getElementById("searchurl") as HTMLInputElement).value ='';
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
        Username: username,
        urlSave: UrlSave,
        passwordSave: PasswordSaveEnc,
    }).then((response) => {
        if (response.data.message) {
            alert(response.data.message);
        } else{
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
        Username: username,
        urlSave: UrlSave,
        passwordSave: PasswordSaveEnc,
    }).then((response) => {
        if (response.data.message) {
            alert(response.data.message);
        } else{
            alert("Passward was updated for this url: " + UrlSave);
            (document.getElementById("url") as HTMLInputElement).value = '';
            (document.getElementById("password") as HTMLInputElement).value = '';
        }
    });
}

const CreateTab = () => {
    return <div>
        {/* <div className="mb-6 mt-[25px]">
            <label className=" text-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Favourite Word:</label>
            <input type="text" id="favWord" className=" outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="Word with 6 letters" required/>
        </div> 
        <div className="mb-6">
            <label className=" text-center block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Favourite Symbol:</label>
            <input type="text" id="favSymb" className="outline-0 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" placeholder="fav Symbol" required/>
        </div>  */}
        <button type="button" onClick={erstellen} className="my-6 text-white  bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get Password</button>
    </div>
}

function erstellen() {

    Axios.post('http://localhost:3000/getFavWord&Symbol', {
        Username: username
    }).then((result) => {
        console.log(result)
        var favW;
        favW = result.data[0].FavWord;
        //alert(favW)
        var favS;
        favS = result.data[0].FavSymbol;
        //alert(favS)

        var password;
        var w = favW.length;
        // alert(w)

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




var CryptoJS = require("crypto-js/core");
CryptoJS.AES = require("crypto-js/aes");

const pepper = 'Yoru'

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

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)

