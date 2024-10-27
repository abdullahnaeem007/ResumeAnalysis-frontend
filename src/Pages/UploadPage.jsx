import React, { useEffect, useState } from 'react'
import line from '../assets/FormPage/Line 9.png'
import plane from '../assets/FormPage/icons8-paperplane-64 1.png'
import cloud1 from '../assets/FormPage/Group 102.png'
import cloud2 from '../assets/FormPage/Group 104.png'
import cloud3 from '../assets/FormPage/Group 100.png'
import cloud4 from '../assets/FormPage/Group 101.png'
import cloud5 from '../assets/FormPage/Group 103.png'
import folder from '../assets/icon3.png'
import PizZip from 'pizzip'
import { DOMParser } from "@xmldom/xmldom";
import mammoth from 'mammoth';
import './UploadPage.css'

import { AiOutlineCheckCircle, AiOutlineClose, AiOutlineCloseCircle, AiOutlineLoading } from 'react-icons/ai'
import { RxDashboard } from 'react-icons/rx'
import { PiSignOut } from 'react-icons/pi'


function UploadPage() {

    const [resume,setresume]=useState(null)
    const [content,setcontent]=useState([])
    const [PageCount,setPageCount]=useState(0)

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
        setEmail(userSession.user.email)
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
    
    function str2xml(str) {
        if (str.charCodeAt(0) === 65279) {
          str = str.substr(1);
        }
        return new DOMParser().parseFromString(str, "text/xml");
      }
    
      function getParagraphs(content) {
        const zip = new PizZip(content);
        const xml = str2xml(zip.files["word/document.xml"].asText());
        const paragraphsXml = xml.getElementsByTagName("w:p");
        const paragraphs = [];
      
        for (let i = 0, len = paragraphsXml.length; i < len; i++) {
          let fullText = "";
          const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
          for (let j = 0, len2 = textsXml.length; j < len2; j++) {
            const textXml = textsXml[j];
            if (textXml.childNodes) {
              fullText += textXml.childNodes[0].nodeValue;
            }
          }
          if (fullText) {
            paragraphs.push(fullText);
          }
        }
        return paragraphs;
      }
    
      function ResumeParserForDOCX(){
        const reader = new FileReader()
        reader.onload=(e)=>{
          const content = e.target.result
          const paragraphs=getParagraphs(content)
          setcontent(paragraphs)
        }
    
        reader.readAsBinaryString(resume)
    
        mammoth.extractRawText({ arrayBuffer: resume })
        .then(result => {
          const text = result.value;
          const estimatedPageCount = estimatePageCount(text);
          setPageCount(estimatedPageCount);
        })
        .catch(error => {
          console.error(error);
        });

      }
    
      const estimatePageCount = (text) => {
        const charactersPerPage = 1800; // Adjust this value based on your content.
        const pageCount = Math.ceil(text.length / charactersPerPage);
        return pageCount;
      }
    
      async function ResumeParserForPDF(){
        const response = await fetch('https://resumeanalysis-backend.onrender.com/pdfParser', {
          method:'POST',
          body:resume,
          headers: 
          {
            'Content-Type': 'application/pdf',
          },
        });
    
        const sol = await response.json()
        setcontent(obj=>[...obj,sol.text])

        const reader = new FileReader()
        reader.onload = function(){
          var typedarray=new Uint8Array(this.result)
          const task = pdfjsLib.getDocument(typedarray)
          task.promise.then((pdf)=>{
            console.log(pdf.numPages)
            setPageCount(pdf.numPages)
          })
        }
        reader.readAsArrayBuffer(resume);
      }



    useEffect(()=>{
        if(content.length>0 && PageCount !=0)
        {
            console.log(content)
            console.log(PageCount)
            localStorage.setItem('ResumeText',JSON.stringify(content))
            localStorage.setItem('PageCount',JSON.stringify(PageCount))
            window.location.replace('/result')
        }
    },[content,PageCount])

    function SubmitResume()
    {
      if(resume!=null)
        {
            if(resume.type=="application/pdf")
            {
              localStorage.setItem('FileType',JSON.stringify('PDF'))
              ResumeParserForPDF()
            }
            else
            {
              localStorage.setItem('FileType',JSON.stringify('DOCX'))
              ResumeParserForDOCX()
            }
        }
    }

    const [Email,setEmail]=useState('')

    

    useEffect(()=>{
      const item=JSON.parse(localStorage.getItem('email'))
      if(item)
      {
        setEmail(item)
      }
    },[])

  return (
    <div class='w-full min-h-screen flex flex-col items-center space-y-[6vh] font-Poppins'>
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
        <div class='w-full flex flex-col items-center space-y-[2vh]'>
            <text class='text-[2vw] font-semibold'>Upload your resume</text>
            <text>Motto line, brand line, brand line, brand line</text>
            <div className="file-upload">
                <img src={folder} alt="upload" className='w-[8vw] h-fit border-[1px] rounded-full p-[1vh]' />
                {
                  resume!=null?
                  <text class='font-semibold text-[1.2vw]'>{resume.name}</text>
                  :
                  <text class='font-semibold text-[1.2vw]'>Upload your resume here</text>
                }
                
                <p>DOC, DOCX, PDF, TXT, smaller than 5MB</p>
                <input type="file" accept=".pdf,.docx,.txt" onChange={(e)=>{setresume(e.target.files[0])}}  />
            </div>
        </div>
        <div class='w-[30%] flex flex-col space-y-[1vh] z-10'>
              <text class='text-[#928D8D]'>Email:</text>
              <div class='flex items-center space-x-[1vw]'>
                  <input value={Email} onChange={(e)=>{setEmail(e.target.value)}} class=' w-full px-[1vw] py-[1.5vh] bg-[#EAF0FF] rounded-lg outline-none'/>
                  {
                      Email.length==0?
                      <AiOutlineCloseCircle size='1.9rem' color='#d10000'/>
                      :
                      <AiOutlineCheckCircle size='1.9rem' color='green'/>
                  }
              </div>
          </div>
          <div class='w-[30%] z-10 flex justify-between'>
              <button onClick={()=>{window.location.replace('/form3')}} class='px-[2vw] py-[1.5vh] rounded-lg border-[1px] border-black'>Back</button>
              <button onClick={SubmitResume} class='px-[2vw] py-[1.5vh] rounded-lg bg-[#167FFC] text-white'>Continue</button>
          </div>
        
        
        <div class='absolute top-[50vh] left-0 flex items-start'>
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

export default UploadPage