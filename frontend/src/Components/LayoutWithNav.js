import React from 'react'
import Navbar from './Navbar'
import { Outlet } from "react-router-dom";
export default function LayoutWithNav() {
  return (
    <div className='w-screen h-screen border-2 border-black flex justify-center items-center'>
        <div className='w-[900px] h-[500px] border-2 border-[red]'>
            <div className='h-auto bg-slate-200'>
                <Navbar/>
            </div>
            <div className='h-[360px] border-2 border-black'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}
