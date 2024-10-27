import React, { useEffect, useState } from 'react'
import cloud1 from '../assets/FormPage/Group 102.png'
import cloud2 from '../assets/FormPage/Group 104.png'
import cloud3 from '../assets/FormPage/Group 100.png'
import cloud4 from '../assets/FormPage/Group 101.png'
import cloud5 from '../assets/FormPage/Group 103.png'
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

import Comma from '../assets/orangeComma.png'
import StripeCheckout from 'react-stripe-checkout'
import { ToastContainer, toast } from 'react-toastify'
import supabase from '../config/supabase'

function WriteResume() {

  const [Testimonials,setTestimonials]=useState([
    {name:'Sarah L.',title:'Recent College Graduate',desc:'Working with Joshua and his team at resumeanalysis.ai was a transformative experience. They meticulously crafted my resume, tailoring it to my unique skills and experiences. The result was a resume that not only impressed employers but also boosted my confidence during interviews. Thanks to their expertise, I secured a fantastic job in a highly competitive industry. I highly recommend resumeanalysis.ai for professional resume writing—its a wise investment in your future'},
    {name:'David M.',title:'HR Manager',desc:'My experience with resumeanalysis.ai was truly remarkable. They took my ordinary resume and turned it into an impressive document that highlighted my key achievements and skills. The personalized approach and attention to detail made all the difference. With their expertly crafted resume, I received multiple job offers and could choose the one that best aligned with my career goals. I highly recommend their services to anyone seeking to enhance their job prospects.'},
  ])

  const [CurrentTestimonial,setCurrentTestimonial]=useState(1)
  const [User,setUser]=useState(null)

  async function Subscribe_to_plan(plan_id)
  {
    const response=await fetch('https://resumeanalysis-backend.onrender.com/v1/api/pay',{
      method:'POST',
      body:JSON.stringify({access_token:User.access_token,success_url:'http://localhost:5174/form3', cancel_url:'http://localhost:5174/WriteResume', plan_id:plan_id}),
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

  async function LogoutUser()
    {
        const response = await supabase.auth.signOut()
        sessionStorage.clear()
        localStorage.clear()
        window.location.replace('/login')
    }

  useEffect(()=>{
    const userSession= JSON.parse(sessionStorage.getItem('session'))
    if(userSession==null)
    {
        window.location.replace('/login')
    }
    setUser(userSession)
  },[])

  return (
    <div class='w-full min-h-screen flex flex-col items-center space-y-[6vh] font-Poppins pb-[5vh]'>
      <ToastContainer/>
      <div class='w-full flex justify-between text-[1.2vw] font-Poppins z-[999]  px-[3vw] py-[3vh]'>
          <text class='font-semibold'>ResumeAnalysis.<text class='text-[#1B5BFF]'>ai</text></text>
          <AiOutlineClose color='#98A3BF'/>
      </div>
      <div class='w-[70%] flex flex-col space-y-[2vh] items-center'>
        <text class='font-bold text-[1.9vw] text-[#FE9526]'>Get a professional to Write Your Resume</text>
        <text class='text-center font-light text-[1vw]'>We will work closely with you to create a standout resume that grabs the attention of recruiters and hiring managers. With our service, you'll get a <text class='underline text-[#167FFC]/70 font-medium'>polished, keyword-optimized resume that effectively showcases your skills and experiences, increasing your chances of landing interviews</text> and achieving your career goals.</text>
      </div>

      <div class='w-full flex justify-center space-x-[5vw] '>
          <button onClick={()=>Subscribe_to_plan(3)} class='rounded-lg flex flex-col items-center text-white py-[2vh] px-[2vw] bg-[#FE9526]'>
            <text class='text-[1.1vw] font-bold'>Pay 75$</text>
            <text class='text-[1vw]'>Professional resume writing</text>
          </button>
      </div>

      <div class='w-full flex flex-col space-y-[2vh]'>
        <div class='w-full flex justify-center space-x-[1vw] overflow-x-hidden p-[2vw]'>
          {
            Testimonials.map((obj,index)=>
              index==CurrentTestimonial+1||index==CurrentTestimonial||index==CurrentTestimonial-1?
              <div class={`w-[30vw] min-h-[30vh] flex flex-col justify-end relative bg-white shadow-xl rounded-lg pt-[5vh]`}>
                <div class='absolute top-0 w-full h-[1vh] bg-[#FE9526] rounded-t-lg'></div>
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

export default WriteResume