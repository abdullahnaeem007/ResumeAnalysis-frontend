import React, { useState } from 'react'

import line from '../assets/FormPage/Line 9.png'
import plane from '../assets/FormPage/icons8-paperplane-64 1.png'
import cloud1 from '../assets/FormPage/Group 102.png'
import cloud2 from '../assets/FormPage/Group 104.png'
import cloud3 from '../assets/FormPage/Group 100.png'
import cloud4 from '../assets/FormPage/Group 101.png'
import cloud5 from '../assets/FormPage/Group 103.png'

import {AiOutlineCheckCircle, AiOutlineClose, AiOutlineCloseCircle, AiOutlineLoading} from 'react-icons/ai'

import supabase from '../config/supabase'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Register() {
    const [Email,setEmail]=useState('')
    const [Password,setPassword]=useState('')
    const [Loading,setLoading]=useState(false)

    function VerifyEmail()
    {   
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(Email))
        {
            return true
        }
        else
        {
            return false
        }
    }

    async function RegisterUser()
    {
        if(Email!=''&&Password!='')
        {
            if(VerifyEmail()==true && Password.length>5)
            {
                setLoading(true)

                const PrevStatus= await FetchUsersFromDatabase()
                if(PrevStatus.status=='failure')
                {
                    toast.error(e.message, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
                else if(PrevStatus.data.length>0 && PrevStatus.status=='success')
                {
                    toast.error('Email already registered', {
                        position: toast.POSITION.TOP_CENTER,
                        onClose:()=>{window.location.replace('/login')}
                    });
                }
                else
                {
                    const {data,error}= await supabase.auth.signUp({
                        email:Email,
                        password:Password
                    })
                    
                    if(error)
                    {
                        toast.error(error.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    }
                    else
                    {
                        const SaveStatus= await SaveUserInDatabase()
                        if(SaveStatus.status=='failure')
                        {
                            toast.error(e.message, {
                                position: toast.POSITION.TOP_CENTER,
                            });
                        }
                        else
                        {
                            toast.success('Registeration successful, Verify your email to proceed', {
                                position: toast.POSITION.TOP_CENTER,
                                onClose:()=>{window.location.replace('/login')}
                            });
                        }
                    }
                }

                setLoading(false)
            }
            else if(VerifyEmail()==false)
            {
                toast.error("Invalid email", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
            else
            {
                toast.error("Password must be of 6 characters length", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        }
        else
        {
            toast.error("Kindly fill all the fields", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }

    async function SaveUserInDatabase()
    {
        const res=await fetch('https://resumeanalysis-backend.onrender.com/AddUser',{
            method:'POST',
            body:JSON.stringify({Email:Email.toLowerCase()}),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const sol = await res.json()
        return sol
    }

    async function FetchUsersFromDatabase()
    {
        const res=await fetch('https://resumeanalysis-backend.onrender.com/FetchUsers',{
            method:'POST',
            body:JSON.stringify({Email:Email}),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const sol = await res.json()
        return sol
    }

  return (
    <div class='w-full min-h-screen flex flex-col space-y-[6vh] font-Poppins'>

        <div class='w-full flex justify-between text-[1.2vw] font-Poppins z-[999]  px-[3vw] py-[3vh]'>
            <text class='font-semibold'>ResumeAnalysis.<text class='text-[#1B5BFF]'>ai</text></text>
            <button class='border-black border-[1px] px-[1vw] py-[1vh] rounded-full'>Login</button>
        </div>

        <div class='w-full flex flex-col items-center space-y-[10vh] z-10'>
            <div class='flex flex-col items-center'>
                <text class='text-[#167FFC] text-[2.5vw] font-semibold'>Register</text>
                <text class='text-[#98A3BF]'>Please enter the following information to register.</text>
            </div>
            <div class='w-1/3 flex flex-col space-y-[8vh]'>
                <div class='flex flex-col space-y-[3vh]'>
                    <div class='flex flex-col space-y-[1vh]'>
                        <text class='text-[#928D8D]'>Email:</text>
                        <div class='flex items-center space-x-[1vw]'>
                            <input placeholder='abc@mail.com' onChange={(e)=>{setEmail(e.target.value.toLowerCase())}} class='w-full px-[1vw] py-[1.5vh] bg-[#EAF0FF] rounded-lg outline-none'/>
                            {
                                Email.length==0?
                                <AiOutlineCloseCircle size='1.9rem' color='#d10000'/>
                                :
                                <AiOutlineCheckCircle size='1.9rem' color='green'/>
                            }
                        </div>
                    </div>
                    <div class='flex flex-col space-y-[1vh]'>
                        <text class='text-[#928D8D]'>Password:</text>
                        <div class='flex items-center space-x-[1vw]'>
                            <input placeholder='********' type='password' onChange={(e)=>{setPassword(e.target.value)}} class='w-full px-[1vw] py-[1.5vh] bg-[#EAF0FF] rounded-lg outline-none'/>
                            {
                                Password.length==0?
                                <AiOutlineCloseCircle size='1.9rem' color='#d10000'/>
                                :
                                <AiOutlineCheckCircle size='1.9rem' color='green'/>
                            }
                        </div>
                    </div>
                </div>
                <div class='w-full flex justify-between'>
                    <button onClick={()=>{window.location.replace('/form1')}}  class='px-[2vw] py-[1.5vh] rounded-lg border-[1px] border-black'>Back</button>
                    <button onClick={RegisterUser} class='px-[2vw] py-[1.5vh] rounded-lg bg-[#167FFC] text-white'>
                        {
                            Loading==true?
                            <AiOutlineLoading class='animate-spin' color='white'/>
                            :
                           <text>Sign up</text>
                        }
                    </button>
                </div>
            </div>
        </div>


        <div class='absolute top-[50vh] flex items-start'>
            <img src={line} class='mt-[4vw] w-[8vw]'/>
            <img src={plane} class='w-[4vw]'/>
        </div>
        <div class='w-full flex items-center absolute bottom-[10vh]'>
            <div class='w-1/2 flex flex-col space-y-[2vh] items-center'>
                <div class='flex items-center space-x-[7vw]'>
                    <img src={cloud5} class='w-[7vw] '/>
                    <img src={cloud2} class='w-[10vw] mb-[5vh]'/>
                </div>
                <img src={cloud4} class='w-[18vw]'/>
            </div>
            <div class='w-1/2 flex flex-col space-y-[2vh] items-center'>
                <img src={cloud3} class='w-[15vw] ml-[8vw]'/>
                <img src={cloud1} class='w-[10vw] mr-[8vw]'/>
            </div>
        </div>
        <div class='w-full flex justify-center absolute bottom-0 text-sm py-[2vh]'>
            <text class='text-[#98A3BF]'>By signing up via your social profile or by email you agree with our <text class='text-[#167FFC]'>Terms of Use</text> and <text class='text-[#167FFC]'>Privacy Policy</text>.</text>
        </div>
        
        <ToastContainer/>
    </div>
  )
}

export default Register

