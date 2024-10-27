import React, { useEffect } from 'react'
import bg1 from '../assets/bg1.png'
import bg2 from '../assets/bg2.png'
import icon1 from '../assets/icon1.png'
import icon2 from '../assets/icon2.png'
import icon3 from '../assets/icon3.png'
import icon4 from '../assets/icon4.png'
import icon5 from '../assets/icon5.png'
import icon6 from '../assets/icon6.png'
import icon7 from '../assets/icon7.png'
import line1 from '../assets/line1.png'
import line2 from '../assets/line2.png'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import supabase from '../config/supabase'

function Homepage() {
    useEffect(()=>{
        const fetchAuthData = async () => {
            try {
              const { data, error } = await supabase.auth.getUser();
      
              if (error) {
                throw error;
              }
      
              console.log(data);
            } catch (error) {
              console.error('Error fetching auth data:', error.message);
            }
          };
      
          fetchAuthData()
    },[])
  return (
    <div class='w-full min-h-screen flex flex-col space-y-[15vh] font-Poppins'>
        <Navbar/> 
        <div class='flex flex-col'>
            <div class='w-full h-fit flex flex-col absolute top-[15vh] items-center'>
                <text class='text-[2.5vw] font-semibold'>ResumeAnalysis.<text class='text-[#1B5BFF]'>ai</text></text>
                <text class='text-[1vw] text-[#928D8D]'>Unlock your Resume’s Potential</text>
            </div>
            <div class='w-full h-fit flex flex-col -space-y-[20vh]'>
                <div class='flex items-center '>
                    <div class='flex -space-x-[5vw] items-center'>
                        <img src={bg1} class='w-[8rem] '/>
                        <div class='flex flex-col -space-y-[3vh]'>
                            <img src={icon1} class='w-20'/>
                            <img src={icon2} class='w-20' />
                        </div>
                    </div>  
                    <img src={line1} class='mt-[15vh]'/>
                </div>
                <div class='w-full flex justify-between pl-[12vh]'>
                    <div class='w-full flex justify-between items-center space-x-[0.5vw]'>
                        <div class='w-full h-full flex flex-col space-y-[2vh]'>
                            <text class='text-[3vw] font-bold'>ResumeAnalysis.<text class='text-[#1B5BFF]'>ai</text> is built and maintained by friends who shared a common struggle:</text>
                            <div class='w-full flex h-full space-x-[2vh]'>
                                <div class='h-full w-[1px] flex flex-col justify-between items-center bg-[#696969]'>
                                    <div class='w-[5px] h-[5px] rounded-full bg-[#696969]'></div>
                                    <div class='w-[5px] h-[5px] rounded-full bg-[#696969]'></div>
                                </div>
                                <text class='italic py-[1vh] text-[#696969]'>We endured a grueling job search process. We spent sleepless nights perfecting resumes only for them to be auto rejected within minutes. We promised each other that we would build a tool that would make job search as effortless. So, we built this AI powered platform. We dissect every aspect of your resume to make sure your resume will land you an interview. This means you'll have a resume that not only meets but exceeds expectations. A resume that will put you ahead of the competition.</text>
                            </div>
                        </div>
                        <img src={line2}/>
                        <button onClick={()=>{window.location.replace('/form1')}} class='w-full h-full flex flex-col space-y-[2vh] items-center'>
                            <text class='font-medium text-[1.5vw]'>Get a free resume analysis</text>
                            <div class='w-full h-[70%] p-[4vw] flex flex-col justify-center items-center border-[2px] border-dashed border-[#BEBEBE] rounded-xl'>
                                <img src={icon3} class='w-[8vw]'/>
                                <text class='text-[1.8vw] text-center font-semibold'>upload your resume and get a free analysis</text>
                                <text class='text-center text-[#999999] text-[1vw]'>DOC, DOCX, PDF, ODF, TXT, RTF, and JPG, PNG, GIF smaller than 5MB</text>
                            </div>
                        </button>
                    </div>
                    <img src={bg2}/>
                </div>
            </div>
        </div>
        <div class='w-full h-fit flex justify-center items-center'>
            <div class='w-[85vw] h-fit relative p-[8vh]'>
                <img src={icon5} class='absolute top-5 left-0 w-[6vw]'/>
                <img src={icon4} class='absolute top-0 right-[5vw] w-[6vw]'/>
                <img src={icon6} class='absolute bottom-[5vh] right-0 w-[6vw]'/>
                <img src={icon7} class='absolute bottom-0 left-0 w-[6vw]'/>
                <div class='w-full min-h-[70vh] text-white flex flex-col space-y-[8vh] px-[20vw] justify-center items-center bg-[#8DADFF] rounded-xl'>
                    <text class='text-[1.5vw] font-medium'>Get a Professional to Write Your Resume</text>
                    <text class='text-center'>We will work closely with you to create a standout resume that grabs the attention of recruiters and hiring managers. With our service, you'll get a polished, keyword-optimized resume that effectively showcases your skills and experiences, increasing your chances of landing interviews and achieving your career goals.</text>
                    <button class='bg-white px-[3vw] py-[1vh] font-medium rounded-full text-[#167FFC]'>Start</button>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Homepage