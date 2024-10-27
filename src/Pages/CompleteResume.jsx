import React, { useEffect, useState } from 'react'
import cloud1 from '../assets/FormPage/Group 102.png'
import cloud2 from '../assets/FormPage/Group 104.png'
import cloud3 from '../assets/FormPage/Group 100.png'
import cloud4 from '../assets/FormPage/Group 101.png'
import cloud5 from '../assets/FormPage/Group 103.png'
import { AiOutlineClose, AiOutlineLeft, AiOutlineLoading, AiOutlineRight } from 'react-icons/ai'

import Comma from '../assets/blueComma.png'
import StripeCheckout from 'react-stripe-checkout'
import {loadStripe} from '@stripe/stripe-js'
import { RxDashboard } from 'react-icons/rx'
import { PiSignOut } from 'react-icons/pi'

function CompleteResume() {

  const [Testimonials,setTestimonials]=useState([
    {name:'John S.',title:'Marketing Professional',desc:'I was skeptical at first, but resumeanalysis.ai exceeded my expectations! It not only highlighted the strengths of my resume but also pointed out areas that needed improvement. Thanks to resumeanalysis.ai, I landed my dream job in just a few weeks'},
    {name:'Sarah L.',title:'Recent College Graduate',desc:'As a recent graduate, I had no idea how to make my resume stand out. Resumeanalysis.ai gave me valuable insights and suggestions on how to tailor my resume for different job applications. It made the job hunting process so much easier.'},
    {name:'Michael R',title:'IT Specialist',desc:'I have been in the IT field for over a decade, and I thought I had a strong resume. However, resumeanalysis.ai found hidden strengths in my experience that I hadn not even realized. It improved my resume significantly and helped me secure a higher-paying position'},
    {name:'Linda K.',title:'Career Changer',desc:'Transitioning to a new career can be daunting, but resumeanalysis.ai provided me with the confidence I needed. It helped me reframe my skills and experience in a way that was attractive to my target industry. I am now happily employed in a new field.'},
    {name:'David P.',title:'HR Manager',desc:'I have reviewed countless resumes in my career, but resumeanalysis.ai added a new layer of depth to my recruitment process. It helped me quickly identify the most promising candidates and save time. It is a game-changer for anyone in HR'},
    {name:'Emily G. ',title:'Small Business Owner',desc:'As a small business owner, I dont have the luxury of a dedicated HR department. Resumeanalysis.ai simplified the hiring process by ensuring I only interviewed candidates who were the best fit for my company. It is a must-have for busy entrepreneurs!'}
  ])

  const [CurrentTestimonial,setCurrentTestimonial]=useState(1)
  const Plans=[
    {id:1,title:'OneTime_Analysis'},
    {id:2,title:'Subscription_Analysis'},
    {id:3,title:'OneTime_Written'}
  ]

  async function Subscribe_to_plan(plan_id)
  {
    if(plan_id==2)
    {
      setLoading({plan1:true,plan2:Loading.plan2})
    }
    else
    {
      setLoading({plan1:Loading.plan1,plan2:true})
    }
    const response=await fetch('https://resumeanalysis-backend.onrender.com/v1/api/pay',{
      method:'POST',
      body:JSON.stringify({access_token:User.access_token,success_url:'http://localhost:5174/Upload', cancel_url:'http://localhost:5174/PayAnalysis', plan_id:plan_id}),
      headers: {
          'Content-Type': 'application/json',
      },
    })

    const result= await response.json()
    if(result.data==null)
    {
      toast.error('Session expired',{
        delay:1000,
        onClose:()=>LogoutUser
      })
        
    }
    else
    {
      window.location.href=result.data
    }
  }

  const [User,setUser]=useState(null)
  const [UserSettings,setUserSettings]=useState(false)
  const [UserType,setUserType]=useState(1)
  const [Loading,setLoading]=useState({plan1:false,plan2:false})

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
    <div class='w-full min-h-screen flex flex-col items-center space-y-[6vh] font-Poppins pb-[5vh]'>
      <div class='w-full flex justify-between text-[1.2vw] font-Poppins z-[999]  px-[3vw] py-[3vh]'>
          <text class='font-semibold'>ResumeAnalysis.<text class='text-[#1B5BFF]'>ai</text></text>
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
      <div class='w-[70%] flex flex-col space-y-[2vh] items-center'>
        <text class='font-bold text-[1.9vw] text-[#1B5BFF]'>Complete In-Depth Resume Analysis</text>
        <text class='text-center font-light text-[1vw]'>Your support is vital in keeping our site up and running. With a premium subscription, you'll gain access to advanced resume analysis, and exclusive resources that can supercharge your job search. Otherwise you can also do a one time resume analysis</text>
      </div>

      <div class='w-full flex justify-center space-x-[5vw] '>
        <button onClick={()=>Subscribe_to_plan(2)} class='rounded-lg flex flex-col items-center text-white py-[2vh] px-[2vw] bg-[#1B5BFF]'>
            {
              Loading.plan1==true?
              <AiOutlineLoading color='white' class='animate-spin'/>
              :
              <div class='flex flex-col items-center'>
                <text class='text-[1.1vw] font-bold'>Pay 10$</text>
                <text class='text-[1vw]'>one time payment</text>
              </div>
            }
        </button>
        
        <button onClick={()=>Subscribe_to_plan(1)} class='rounded-lg flex flex-col items-center py-[2vh] px-[2vw] text-[#1B5BFF] border-[#1B5BFF] border-[2px]'>
          {
            Loading.plan2==true?
            <AiOutlineLoading color='white' class='animate-spin'/>
            :
            <div class='flex flex-col items-center'>
              <text class='text-[1.1vw] font-bold'>Pay 5$</text>
              <text class='text-[1vw]'>subscription payment</text>
            </div>
          }
        </button>
      </div>

      <div class='w-full flex flex-col space-y-[2vh]'>
        <div class='w-full flex justify-center space-x-[1vw] overflow-x-hidden p-[2vw]'>
          {
            Testimonials.map((obj,index)=>
              index==CurrentTestimonial+1||index==CurrentTestimonial||index==CurrentTestimonial-1?
              <div class={`w-[30vw] min-h-[30vh] flex flex-col justify-end relative bg-white shadow-xl rounded-lg pt-[5vh]`}>
                <div class='absolute top-0 w-full h-[1vh] bg-[#1B5BFF] rounded-t-lg'></div>
                <div class='flex flex-col space-y-[2vh] p-[1vw]'>
                  <text class='text-[0.9vw]'>{obj.desc}</text>
                  <div class='flex flex-col'>
                    <text class='text-[1vw] font-semibold'>{obj.name}</text>
                    <text class='text-[0.9vw]'>{obj.title}</text>
                    <div class='flex justify-end'>
                      <img src={Comma} class='w-[2vw]'/>
                    </div>
                  </div>
                </div>
              </div>
              :
              <></>
            )
          }
        </div>
        <div class='flex justify-center space-x-[1vw] items-center'>
          <button onClick={()=>{if(CurrentTestimonial>1){setCurrentTestimonial(CurrentTestimonial-1)}}} class={`rounded-full flex justify-center ${CurrentTestimonial==1?'bg-[#1B5BFF]/30':'bg-[#1B5BFF]'} p-[0.5vw]`}>
            <AiOutlineLeft color='white' size='1.3vw'/>
          </button>
          <button onClick={()=>{if(CurrentTestimonial<Testimonials.length-2){setCurrentTestimonial(CurrentTestimonial+1)}}} class={`rounded-full flex justify-center ${CurrentTestimonial==Testimonials.length-2?'bg-[#1B5BFF]/30':'bg-[#1B5BFF]'} p-[0.5vw]`}>
            <AiOutlineRight color='white' size='1.3vw'/>
          </button>
        </div>
      </div>
      
      <div class='w-full flex items-center absolute bottom-0 -z-10'>
            <div class='w-1/2 flex flex-col items-center'>
                <div class='flex items-center space-x-[7vw]'>
                    <img src={cloud5} class='w-[7vw] '/>
                    <img src={cloud2} class='w-[10vw] mb-[5vh]'/>
                    <img src={cloud1} class='w-[10vw] mr-[8vw]'/>
                </div>
                <img src={cloud3} class='w-[15vw] ml-[8vw]'/>
                <img src={cloud1} class='w-[10vw] mr-[8vw]'/>
            </div>
            <div class='w-1/2 flex flex-col items-center'>
                <div class='flex items-center space-x-[3vw]'>
                    <img src={cloud1} class='w-[7vw] '/>
                    <img src={cloud3} class='w-[10vw] mb-[5vh]'/>
                </div>
                <div class='flex items-center space-x-[14vw]'>
                    <img src={cloud5} class='w-[7vw] '/>
                    <img src={cloud4} class='w-[10vw] mb-[5vh]'/>
                </div>
                <img src={cloud4} class='w-[18vw]'/>
            </div>
        </div>

    </div>
  )
}

export default CompleteResume