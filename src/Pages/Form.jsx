import React, { useEffect, useState } from 'react'
import line from '../assets/FormPage/Line 9.png'
import plane from '../assets/FormPage/icons8-paperplane-64 1.png'
import cloud1 from '../assets/FormPage/Group 102.png'
import cloud2 from '../assets/FormPage/Group 104.png'
import cloud3 from '../assets/FormPage/Group 100.png'
import cloud4 from '../assets/FormPage/Group 101.png'
import cloud5 from '../assets/FormPage/Group 103.png'

import {AiOutlineCheckCircle, AiOutlineClose, AiOutlineCloseCircle, AiOutlineLoading} from 'react-icons/ai'
import supabase from '../config/supabase'
import { RxDashboard } from 'react-icons/rx'
import { PiSignOut } from 'react-icons/pi'


function Form() {

    const [FirstName,setFirstName]=useState('')
    const [LastName,setLastName]=useState('')

    const [User,setUser]=useState(null)
    const [UserSettings,setUserSettings]=useState(false)
    const [UserType,setUserType]=useState(1)

    useEffect(()=>{
        const userSession= JSON.parse(sessionStorage.getItem('session'))
        if(userSession==null)
        {
          window.location.replace('/login')
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
    <div class='w-full min-h-screen flex flex-col space-y-[6vh] font-Poppins'>

        <div class='w-full flex justify-between text-[1.2vw] font-Poppins z-[999]  px-[3vw] py-[3vh]'>
            <text class='font-semibold'>ResumeAnalysis.<text class='text-[#1B5BFF]'>ai</text></text>
            <div class='flex space-x-[1vw] items-center text-base text-[#DEE4EC]'>
                <div class='h-[2vw] w-[2vw] rounded-full flex justify-center items-center text-white bg-[#167FFC]'>1</div>
                <text class='text-black'>Enter Details</text>
                <text>----</text>
                <div class='h-[2vw] w-[2vw] rounded-full flex justify-center items-center bg-[#DEE4EC] text-[#8CA1BA]'>2</div>
                <text>Tell Us More</text>
                <text>----</text>
                <div class='h-[2vw] w-[2vw] rounded-full flex justify-center items-center bg-[#DEE4EC] text-[#8CA1BA]'>3</div>
                <text>View Resume</text>
            </div>
            {
                User==null?
                <AiOutlineLoading class='animate-spin'/>
                :
                <div class='flex items-center font-medium space-x-[2vw]'>
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

        <div class='w-full flex flex-col items-center space-y-[10vh] z-10'>
            <div class='flex flex-col items-center'>
                <text class='text-[#167FFC] text-[2.5vw] font-semibold'>Your Perfect Resume is just some questions away!</text>
                <text class='text-[#98A3BF]'>Fill in the form to receive your expert written Resume.</text>
            </div>
            <div class='w-1/3 flex flex-col space-y-[8vh]'>
                <div class='flex flex-col space-y-[3vh]'>
                    <div class='flex flex-col space-y-[1vh]'>
                        <text class='text-[#928D8D]'>First Name</text>
                        <div class='flex items-center space-x-[1vw]'>
                            <input onChange={(e)=>{setFirstName(e.target.value)}} class='w-full px-[1vw] py-[1.5vh] bg-[#EAF0FF] rounded-lg outline-none'/>
                            {
                                FirstName.length==0?
                                <AiOutlineCloseCircle size='1.9rem' color='#d10000'/>
                                :
                                <AiOutlineCheckCircle size='1.9rem' color='green'/>
                            }
                        </div>
                    </div>
                    <div class='flex flex-col space-y-[1vh]'>
                        <text class='text-[#928D8D]'>Last Name</text>
                        <div class='flex items-center space-x-[1vw]'>
                            <input onChange={(e)=>{setLastName(e.target.value)}} class='w-full px-[1vw] py-[1.5vh] bg-[#EAF0FF] rounded-lg outline-none'/>
                            {
                                LastName.length==0?
                                <AiOutlineCloseCircle size='1.9rem' color='#d10000'/>
                                :
                                <AiOutlineCheckCircle size='1.9rem' color='green'/>
                            }
                        </div>
                    </div>
                </div>
                <div class='w-full flex justify-between'>
                    <button  onClick={()=>{window.location.replace('/')}} class='px-[2vw] py-[1.5vh] rounded-lg border-[1px] border-black'>Back</button>
                    <button  onClick={()=>{if(FirstName.length>0 && LastName.length>0){localStorage.setItem('name',JSON.stringify(FirstName));window.location.replace('/form2')}}} class='px-[2vw] py-[1.5vh] rounded-lg bg-[#167FFC] text-white'>Continue</button>
                </div>
            </div>
        </div>


        <div class='absolute top-[50vh] flex items-start'>
            <img src={line} class='mt-[4vw] w-[8vw]'/>
            <img src={plane} class='w-[4vw]'/>
        </div>
        <div class='w-full flex items-center absolute bottom-[10vh]'>
            <div class='w-1/2 flex flex-col space-y-[2vh] items-center'>
                <img src={cloud3} class='w-[15vw] ml-[8vw]'/>
                <img src={cloud1} class='w-[10vw] mr-[8vw]'/>
            </div>
            <div class='w-1/2 flex flex-col space-y-[2vh] items-center'>
                <div class='flex items-center space-x-[7vw]'>
                    <img src={cloud5} class='w-[7vw] '/>
                    <img src={cloud2} class='w-[10vw] mb-[5vh]'/>
                </div>
                <img src={cloud4} class='w-[18vw]'/>
            </div>
        </div>
        <div class='w-full flex justify-center absolute bottom-0 text-sm py-[2vh]'>
            <text class='text-[#98A3BF]'>By signing up via your social profile or by email you agree with our <text class='text-[#167FFC]'>Terms of Use</text> and <text class='text-[#167FFC]'>Privacy Policy</text>.</text>
        </div>

        

    </div>
  )
}

export default Form