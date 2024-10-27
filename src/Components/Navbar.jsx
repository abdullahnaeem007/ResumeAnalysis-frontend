import React, { useEffect, useState } from 'react'
import supabase from '../config/supabase'
import { RxDashboard } from "react-icons/rx";
import { PiSignOut } from "react-icons/pi";

function Navbar() {

  const [User,setUser]=useState(null)
  const [UserSettings,setUserSettings]=useState(false)
  const [UserType,setUserType]=useState(1)

  useEffect(()=>{
    const userSession= JSON.parse(sessionStorage.getItem('session'))
    if(userSession==null)
    {
      //window.location.replace('/login')
    }
    setUser(userSession)
    CheckAdminLogin(userSession)
  },[])

  async function LogoutUser()
    {
        const response = await supabase.auth.signOut()
        sessionStorage.clear()
        localStorage.clear()
        window.location.replace('/login')
    }

    async function CheckAdminLogin(userSession)
    {
        const {data,error}=await supabase
        .from('Admin')
        .select('*')
        .eq('Email',userSession.user.email)

        if(data.length==0)
        {
          setUserType(1)
        }
        else
        {
          setUserType(2)
        }
    }

  return (
    <div class='w-full h-fit flex items-center justify-between bg-white fixed top-0 text-[1.2vw] font-Poppins z-[999]  px-[3vw] py-[3vh]'>
        <button onClick={()=>{window.location.replace('/')}} class='font-semibold'>ResumeAnalysis.<text class='text-[#1B5BFF]'>ai</text></button>
          {
            User==null?
            <div class='flex font-medium space-x-[3vw]'>
              <button onClick={()=>{window.location.replace('/login')}}>Log In</button>
              <button onClick={()=>{window.location.replace('/register')}} class='text-[#1B5BFF] border-[1px] border-[#1B5BFF] px-[1vw] py-[1vh] rounded-full'>Register</button>
            </div>
          :
          <div class='flex items-center font-medium space-x-[2vw]'>
            {/* <button onClick={LogoutUser} class='w-fit flex px-[2vw] py-[1vh] text-white rounded-xl bg-[#167FFC]'>Logout</button> */}
            <RxDashboard onClick={()=>{if(UserType==1){window.location.replace('/UserDashboard')}else{window.location.replace('/AdminDashboard')}}} size='2.5rem' class='hover:bg-gray-200 cursor-pointer rounded-lg p-[0.3rem]'/>
            <div class='relative flex flex-col items-center'>
              <button onClick={()=>{setUserSettings(!UserSettings)}} class='w-[2.7rem] h-[2.7rem] text-white flex justify-center items-center rounded-full bg-[#1B5BFF]/70 hover:bg-[#1B5BFF]/50'>{User.user.email[0].toUpperCase()}</button>
              {
                UserSettings==true?
                  <div class='w-fit text-[0.9rem] px-[1vw] rounded-lg space-y-[5vh] py-[3vh] font-normal flex flex-col items-center mt-[3rem] right-0 top-0 bg-white shadow-md absolute'>
                    <div class='flex flex-col space-y-[2vh] items-center px-[2vw]'>
                      <text>{User.user.email}</text>
                      <button class='w-[5rem] h-[5rem] text-white text-[2rem] flex justify-center items-center rounded-full bg-[#1B5BFF]/70 hover:bg-[#1B5BFF]/50'>{User.user.email[0].toUpperCase()}</button>
                      <text class='font-medium text-[1.3rem]'>Hi,{User.user.email.slice(0,User.user.email.indexOf('@'))}!</text>
                    </div>
                    <div class='w-full flex flex-col shadow-md rounded-lg bg-gray-100'>
                      <button onClick={()=>{if(UserType==1){window.location.replace('/UserDashboard')}else{window.location.replace('/AdminDashboard')}}} class='w-full hover:bg-gray-200  flex p-[0.8rem] space-x-[1vw] items-center'>
                        <RxDashboard size='1.5rem'/>
                        <text class='w-full flex justify-start text-[1rem]'>Open Dashboard</text>
                      </button>
                      <button onClick={LogoutUser} class='w-full hover:bg-gray-200  flex p-[0.8rem] space-x-[1vw] items-center'>
                        <PiSignOut size='1.5rem'/>
                        <text class='w-full flex justify-start text-[1rem]'>Sign out</text>
                      </button>
                    </div>
                  </div>
                :
                  <></>
              }
            </div>
          </div>
          }
    </div>
  )
}

export default Navbar