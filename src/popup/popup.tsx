import React from 'react'
import '../assets/tailwind.css'
import { createRoot } from 'react-dom/client'
//import check from '../static/images/check.png'
//import get from '../static/images/get.png'
//import save from '../static/images/save.png'

const App = (
        <>
        <div className="relative w-auto h-20 m-[20px] bg-white rounded-[20px] border-emerald-900 border-4">
            <div className=" absolute w-full top-[-5px] font-sans text-center text-[50px]"> 
            SagiousPass 
            </div>
        </div>
        <div className="absolute w-[250px] h-[200px] right-[20px] bg-white rounded-[20px] border-emerald-900 border-4">
            <div className="absolute text-center w-full top-1/3 font-semibold font-sans text-[15px] "> 
            Welcome to your new Password manager! 
            </div>
        </div>
        <div className="absolute w-[75px] h-[257px] left-[25px] top-[125px]">
            <a href="" className="cursor-pointer">
            <div className="w-[75px] h-[75px] bg-white rounded-[20px] mb-[16px] hover:scale-105 border-emerald-900 border-4">
            <img src="check" alt="check" className=""/>
            </div>
            </a>
            <a href="" className="cursor-pointer">
            <div className="w-[75px] h-[75px] bg-white rounded-[20px] mb-[16px] hover:scale-105 border-emerald-900 border-4">
            <img src="get" alt="get" className=""/>
            </div>
            </a>
            <a href="" className="cursor-pointer">
            <div className="w-[75px] h-[75px] bg-white rounded-[20px] hover:scale-105 border-emerald-900 border-4">
            <img src="save" alt="save" className=""/>
            </div>
            </a>
        </div>
        <div className="absolute w-[95px] h-[50px] left-[145px] top-[332px] bg-white rounded-[20px] hover:scale-105 border-emerald-900 border-4">
            <div className="absolute text-center w-full top-[10px] text-base font-semibold"> Login </div>
        </div>
        <div className="absolute w-[95px] h-[50px] left-[265px] top-[332px] bg-white rounded-[20px] hover:scale-105 border-emerald-900 border-4">
        <div className="absolute text-center w-full top-[10px] text-base font-semibold"> Register </div>
        </div>
        </>
    
)

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(App)
