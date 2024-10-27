import React, { useEffect, useState } from 'react'
import line from '../assets/FormPage/Line 9.png'
import plane from '../assets/FormPage/icons8-paperplane-64 1.png'
import cloud1 from '../assets/FormPage/Group 102.png'
import cloud2 from '../assets/FormPage/Group 104.png'
import cloud3 from '../assets/FormPage/Group 100.png'
import cloud4 from '../assets/FormPage/Group 101.png'
import cloud5 from '../assets/FormPage/Group 103.png'
import analysispic from '../assets/image 22.png'
import filepic from '../assets/image 21.png'
import folder from '../assets/icon3.png'
import { AiOutlineCheck, AiOutlineClose, AiOutlineLoading } from 'react-icons/ai'

import load1 from '../assets/icon11.png'
import load2 from '../assets/icon10.png'

import com1 from '../assets/com1 - Copy.png'
import com2 from '../assets/com2 - Copy.png'
import com3 from '../assets/com3 - Copy.png'
import com4 from '../assets/com4 - Copy.png'
import com5 from '../assets/com5 - Copy.png'
import StripeCheckout from 'react-stripe-checkout'
import { ToastContainer, toast } from 'react-toastify'
import { PiSignOut } from 'react-icons/pi'
import { RxDashboard } from 'react-icons/rx'
import supabase from '../config/supabase'

function ResultPage() {
    
    const [content,setcontent]=useState([])
    const [PageCount,setPageCount]=useState(0)
    const [Type,setType]=useState('')

    const [Personal,setPersonal]=useState([])
    const [ExtractedPersonal,setExtractedPersonal]=useState({})
    const [check,setcheck]=useState(false)

    const [check2,setcheck2]=useState(false)
    const [Cliched,setCliched]=useState([])
    const [ExtractedCliched,setExtractedCliched]=useState([])

    const [check3,setcheck3]=useState(false)
    const [Grammer,setGrammer]=useState([])
    const [ExtractedGrammer,setExtractedGrammer]=useState([])

    const [check4,setcheck4]=useState(false)
    const [ATS,setATS]=useState([])
    const [ExtractedATS,setExtractedATS]=useState({text:'',score:0})

    const [check5,setcheck5]=useState(false)
    const [SentenceS,setSentenceS]=useState([])
    const [ExtractedSentenceS,setExtractedSentenceS]=useState([])

    const [check6,setcheck6]=useState(false)
    const [ContentAnalysis,setContentAnalysis]=useState([])
    const [ExtractedContentAnalysis,setExtractedContentAnalysis]=useState([])

    const [check7,setcheck7]=useState(false)
    const [KeywordAnalysis,setKeywordAnalysis]=useState([])
    const [ExtractedKeywordAnalysis,setExtractedKeywordAnalysis]=useState([])

    useEffect(()=>{
        const items=JSON.parse(localStorage.getItem('ResumeText'))    
        if(items)
        {
            setcontent(items)
        }

        const count=JSON.parse(localStorage.getItem('PageCount'))    
        if(count)
        {
          setPageCount(count)
        }

        const type=JSON.parse(localStorage.getItem('FileType'))    
        if(type)
        {
          setType(type)
        }
    },[])


  async function GeneratePost()
  {
    const res=await fetch('https://resumeanalysis-backend.onrender.com/chat',{
      method:'POST',
      body:JSON.stringify({chatarr:Personal}),
      headers: {
          'Content-Type': 'application/json',
      },
    })

    const sol = await res.json()
    ExtractPersonalInformation(sol.text.content)
    setPersonal(obj=>[...obj,sol.text])
    setcheck(true)
  }

  function ExtractPersonalInformation(info)
  {
    const p1=info.indexOf('\n')
    const name=info.substring(0,p1)

    const p2=info.indexOf('\n',p1+1)
    const employer=info.substring(p1+1,p2)

    const p3=info.indexOf('\n',p2+1)
    const position=info.substring(p2+1,p3)

    const p4=info.indexOf('\n',p3+1)
    const contact=info.substring(p3+1,p4)

    const p5=info.indexOf('\n',p4+1)
    const location=info.substring(p4+1,p5)

    const p6=info.indexOf('\n',p5+1)
    const experience=info.substring(p5+1,p6)

    const education=info.substring(p6+1,info.length)

    const temp=name.indexOf(':')
    const name2=name.substring(temp+1,name.length)

    const temp2=employer.indexOf(':')
    const employer2=employer.substring(temp2+1,employer.length)

    const temp3=position.indexOf(':')
    const position2=position.substring(temp3+1,position.length)

    const temp4=contact.indexOf(':')
    const contact2=contact.substring(temp4+1,contact.length)

    const temp5=location.indexOf(':')
    const location2=location.substring(temp5+1,location.length)

    const temp6=experience.indexOf(':')
    const experience2=experience.substring(temp6+1,experience.length)

    const temp7=education.indexOf(':')
    const education2=education.substring(temp7+1,education.length)

    const obj={name:name2,employer:employer2,position:position2,contact:contact2,location:location2,experience:experience2,education:education2}
    setExtractedPersonal(obj)
    console.log(obj)
}

function ExtractClichedWords(info)
{
  var arr=[]
  var current=''
  for(var i=0;i<info.length;i++)
  {
    if(info[i]=='\n' || i==info.length-1)
    {
        arr.push(current)
        current=''
    }
    else
    {
        current=current+info[i]
    }
  }
  console.log(arr)
  setExtractedCliched(arr)
}

  async function GeneratePost2()
  {
    const res=await fetch('https://resumeanalysis-backend.onrender.com/chat',{
      method:'POST',
      body:JSON.stringify({chatarr:Cliched}),
      headers: {
          'Content-Type': 'application/json',
      },
    })

    const sol = await res.json()
    ExtractClichedWords(sol.text.content)
    setCliched(obj=>[...obj,sol.text])
    setcheck2(true)
  }

  function ExtractGrammarWords(info)
{
  var arr=[]
  var current=''
  for(var i=0;i<info.length;i++)
  {
    if(info[i]=='\n' || i==info.length-1)
    {
        if(i==info.length-1)
        {
            current=current+info[i]
        }
        arr.push(current)
        current=''
    }
    else
    {
        current=current+info[i]
    }
  }
  console.log(arr)
  setExtractedGrammer(arr)
}

  async function GeneratePost3()
  {
    const res=await fetch('https://resumeanalysis-backend.onrender.com/chat',{
      method:'POST',
      body:JSON.stringify({chatarr:Grammer}),
      headers: {
          'Content-Type': 'application/json',
      },
    })

    const sol = await res.json()
    ExtractGrammarWords(sol.text.content)
    setGrammer(obj=>[...obj,sol.text])
    setcheck3(true)
  }

  async function GeneratePost4()
  {
    const res=await fetch('https://resumeanalysis-backend.onrender.com/chat',{
      method:'POST',
      body:JSON.stringify({chatarr:ATS}),
      headers: {
          'Content-Type': 'application/json',
      },
    })

    const sol = await res.json()
    var input=''
    if(sol.text.content.includes('SCORE:'))
    {
      input=sol.text.content
      var start=input.indexOf('SCORE:')
      var end=input.indexOf('\n',start)
      var TotalScore=input.slice(start,end)
      var ActualScore=ExtractScoreFromString(TotalScore)
      input=input.replace(TotalScore,'')

      setExtractedATS({text:input,score:ActualScore})
    }
    setATS(obj=>[...obj,sol.text])
    setcheck4(true)
  }

  function ExtractScoreFromString(ScoreString)
  {
    var pos1=ScoreString.indexOf('/')
    var temp=pos1
    while(ScoreString[temp]!=' ')
    {
      temp=temp-1
    }
    var ActualScore=ScoreString.slice(temp+1,pos1)
    return ActualScore
  }

  async function GeneratePost5()
  {
    const res=await fetch('https://resumeanalysis-backend.onrender.com/chat',{
      method:'POST',
      body:JSON.stringify({chatarr:SentenceS}),
      headers: {
          'Content-Type': 'application/json',
      },
    })

    const sol = await res.json()
    setExtractedSentenceS(sol.text.content)
    setSentenceS(obj=>[...obj,sol.text])
    setcheck5(true)
  }

  async function GeneratePost6()
  {
    const res=await fetch('https://resumeanalysis-backend.onrender.com/chat',{
      method:'POST',
      body:JSON.stringify({chatarr:ContentAnalysis}),
      headers: {
          'Content-Type': 'application/json',
      },
    })

    const sol = await res.json()
    setExtractedContentAnalysis(sol.text.content)
    setContentAnalysis(obj=>[...obj,sol.text])
    setcheck6(true)
  }

  async function GeneratePost7()
  {
    const res=await fetch('https://resumeanalysis-backend.onrender.com/chat',{
      method:'POST',
      body:JSON.stringify({chatarr:KeywordAnalysis}),
      headers: {
          'Content-Type': 'application/json',
      },
    })

    const sol = await res.json()
    setExtractedKeywordAnalysis(sol.text.content)
    setKeywordAnalysis(obj=>[...obj,sol.text])
    setcheck7(true)
  }

//   async function GeneratePost3()
//   {
//     const res=await fetch('http://localhost:3001/chat',{
//       method:'POST',
//       body:JSON.stringify({chatarr:GrammerArr}),
//       headers: {
//           'Content-Type': 'application/json',
//       },
//     })

//     const sol = await res.json()
//     setGrammerCheck(true)
//     setGrammerArr(obj=>[...obj,sol.text])
//   }


  useEffect(()=>{
    if(content.length>0 )
    {
      setPersonal(obj=>[...obj,{role:'user',content:`Extract the following information from provided resume. \n Format: [Full Name]\n[Most Recent Employer]\n[Most Recent Professional Profession]\m[Contact Information]\n[Location]\n[Years of Experience]\n[Most Recent Education] \n Use this resume Information : ${JSON.stringify(content)}. `}])
      setCliched(obj=>[...obj,{role:'user',content:`Extract cliched words from the following resume. The words should be commonly repeated words. IMPORTANT: THE WORDS SHOULD BE A SINGLE WORD AND NOT A GROUP OF WORDS.\n Format: 1.[Cliched word 1]\n2.[Cliched word 2]\n3.[Cliched word 3]\nn.[Cliched word n] \n Use this resume Information : ${JSON.stringify(content)}`}])
      setGrammer(obj=>[...obj,{role:'user',content:`Extract grammar or spelling mistakes from the following resume. The mistakes found should be simple.\n IMPORTANT: THE MISTAKES SHOULD NOT BE REPEATED  \nFormat: 1.Mistake: Mistake1 , Solution: Solution1 \n 2.Mistake: Mistake2 , Solution: Solution2\nN.Mistake: MistakeN , Solution: SolutionN \n Use this resume Information : ${JSON.stringify(content)}`}])
      setATS(obj=>[...obj,{role:'user',content:`This is a resume: ${JSON.stringify(content)}. Please analyze it for ATS (Applicant Tracking Systems) compatibility. Evaluate the use of relevant keywords, the format of the resume, and the clarity of the information presented. Give a score out of 100 and recommend changes that will make the resume more ATS compatible. Be as detailed as possible. \n IMPORTANT, Write the score in the following format: SCORE: 80/100. Always show score in the beginning`}])
      setSentenceS(obj=>[...obj,{role:'user',content:`This is a resume: ${JSON.stringify(content)}. Please analyze its sentence structure. Specifically, evaluate the clarity and coherence of the sentences, the use of active vs passive voice, and the grammatical correctness. Be as detailed as possible`}])
      setContentAnalysis(obj=>[...obj,{role:'user',content:`This is a resume:  ${JSON.stringify(content)}. Please analyze its content. Specifically, evaluate the relevance of the skills and experiences. the clarity of the job descriptions, and the overall impact of the content. Be as detailed as possible`}])
      setKeywordAnalysis(obj=>[...obj,{role:'user',content:`This is a resume: ${JSON.stringify(content)}. Please analyze it for keyword usage. Specifically, identify the most frequently used keywords and suggest any missing keywords that could improve the resume. Be as detailed as possible.`}])
    }
  },[content])

  useEffect(()=>{
    if(Personal.length>0 && Personal[Personal.length-1].role=='user' && check ==false)
    {
      GeneratePost()
    }
  },[Personal])

  useEffect(()=>{
    if(Cliched.length>0 && Cliched[Cliched.length-1].role=='user' && check2 ==false)
    {
      GeneratePost2()
    }
  },[Cliched])

  useEffect(()=>{
    if(Grammer.length>0 && Grammer[Grammer.length-1].role=='user' && check3 ==false)
    {
      GeneratePost3()
    }
  },[Grammer])

  useEffect(()=>{
    if(ATS.length>0 && ATS[ATS.length-1].role=='user' && check4 ==false)
    {
      GeneratePost4()
    }
  },[ATS])

  useEffect(()=>{
    if(SentenceS.length>0 && SentenceS[SentenceS.length-1].role=='user' && check5 ==false)
    {
      GeneratePost5()
    }
  },[SentenceS])

  useEffect(()=>{
    if(ContentAnalysis.length>0 && ContentAnalysis[ContentAnalysis.length-1].role=='user' && check6 ==false)
    {
      GeneratePost6()
    }
  },[ContentAnalysis])

  useEffect(()=>{
    if(KeywordAnalysis.length>0 && KeywordAnalysis[KeywordAnalysis.length-1].role=='user' && check7 ==false)
    {
      GeneratePost7()
    }
  },[KeywordAnalysis])


  const [ShowDiv,setShowDiv]=useState(false)
  const [ShowDiv2,setShowDiv2]=useState(false)

  useEffect(()=>{
    if(check==true)
    {
      setShowDiv(true);

    // Set a timer to hide the div after a certain amount of time (e.g., 2 seconds)
      setTimeout(() => {
        setShowDiv(false);
        setShowDiv2(true)
      }, 3000);
    }
  },[check])

  const [TickCounter, setTickCounter] = useState(0);

  useEffect(() => {
    if (ShowDiv2 === true && check2 === true && check3 === true&&check4==true&&check5==true&&check6==true&&check7==true) {
      let intervalId;
      var tick = 0;
  
      const incrementTick = () => {
        setTickCounter(tick);
        tick += 1;
      };
  
      intervalId = setInterval(incrementTick, 1000);
  
      setTimeout(() => {
        clearInterval(intervalId);
        setShowDiv2(false);
        setLoadingScreen(true)
      }, 12000);
    }
  }, [ShowDiv2,check2,check3,check4,check5,check6,check7]);
  

  const [username,setusername]=useState('')
  useEffect(()=>{
    const item=JSON.parse(localStorage.getItem('name'))
    if(item)
    {
      setusername(item)
    }
  },[])

  const [LoadingScreen,setLoadingScreen]=useState(false)
  const [UserData,setUserData]=useState({Email:'',OneTime_Analysis:false,Subscription_Analysis:false,OneTime_Writing:false,Verified:true,stripe_customer_id:'',plan:0})

  async function CheckPlanType()
  {
    const res=await fetch('https://resumeanalysis-backend.onrender.com/FetchUsers',{
        method:'POST',
        body:JSON.stringify({Email:User.user.email}),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const sol = await res.json()
    console.log(sol)
    if(sol.status=='success')
    {
      setUserData(sol.data[0])
      if(sol.data[0].OneTime_Analysis==true)
      {
        await OneTime_Finish()
      }
    }
    setLoadingScreen(false)
  }

  useEffect(()=>{
    if(LoadingScreen==true)
    {
      CheckPlanType()
    }
  },[LoadingScreen])

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

  const OneTime_Finish = async () => {
    const res=await fetch('https://resumeanalysis-backend.onrender.com/OneTime_Finish',{
        method:'POST',
        body:JSON.stringify({Email:User.user.email}),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const sol = await res.json()
    if(sol.status=='success')
    {
      toast.success('One Time Resume Analysis Used')
    }
    else
    {
      console.log('Error: ',sol.error)
    }
  }



  return (
    <div class='w-full min-h-screen font-Poppins'>
        <ToastContainer/>
        <div class='w-full flex flex-col items-center space-y-[5vh]'>
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
          {
            check==true&&check2==true&&check3==true&&ShowDiv==false&&ShowDiv2==false&&LoadingScreen==false?
            <div class='w-[60%] min-h-screen flex flex-col space-y-[5vh] bg-white rounded-3xl border-t-[2px] border-x-[2px] px-[2vw] py-[5vh]'>
                <div class='w-full flex items-center justify-between'>
                    <div class='w-fit flex flex-col text-[#167FFC] '>
                        <text>{username}'s</text>
                        <text class='font-semibold text-[1.7vw]'>Resume Analysis</text>
                    </div>
                    <img src={analysispic} class='w-[6vw]'/>
                </div>
                <div class='w-full flex items-center space-x-[3vw]'>
                  <div class='w-full h-[0.5vh] bg-[#167FFC]'></div>
                  <text class='w-full text-center text-[1.3vw] font-semibold text-[#167FFC]'>Here is what we found from your Resume</text>
                  <div class='w-full h-[0.5vh] bg-[#167FFC]'></div>
                </div>
                <div class='w-full flex flex-col '>
                  <div class='w-full flex  border-[2px] border-b-[1px]'>
                    <div class='w-1/2 flex flex-col p-[3vh] space-y-[1.5vh] border-r-[2px]'>
                      <text class='font-mono text-gray-500'>Full Name</text>
                      <text >{ExtractedPersonal.name}</text>
                    </div>
                    <div class='w-1/2 flex flex-col p-[3vh] space-y-[1.5vh]'>
                      <text class='font-mono text-gray-500'>Most Recent Employer</text>
                      <text>{ExtractedPersonal.employer}</text>
                    </div>
                  </div>
                  <div class='w-full flex border-[2px] border-y-[1px]'>
                    <div class='w-1/2 flex flex-col p-[3vh] space-y-[1.5vh] border-r-[2px]'>
                      <text class='font-mono text-gray-500'>Most Recent Professional Position</text>
                      <text>{ExtractedPersonal.position}</text>
                    </div>
                    <div class='w-1/2 flex flex-col p-[3vh] space-y-[1.5vh]'>
                      <text class='font-mono text-gray-500'>Contact Info</text>
                      <text>{ExtractedPersonal.contact}</text>
                    </div>
                  </div>
                  <div class='w-full flex border-[2px] border-y-[1px]'>
                    <div class='w-1/2 flex flex-col p-[3vh] space-y-[1.5vh] border-r-[2px]'>
                      <text class='font-mono text-gray-500'>Location</text>
                      <text>{ExtractedPersonal.location}</text>
                    </div>
                    <div class='w-1/2 flex flex-col p-[3vh] space-y-[1.5vh]'>
                      <text class='font-mono text-gray-500'>Experience</text>
                      <text>{ExtractedPersonal.experience}</text>
                    </div>
                  </div>
                  <div class='w-full flex border-[2px] border-t-[1px]'>
                    <div class='w-1/2 flex flex-col p-[3vh] space-y-[1.5vh] border-r-[2px]'>
                      <text class='font-mono text-gray-500'>Most Recent Education</text>
                      <text>{ExtractedPersonal.education}</text>
                    </div>
                    <div class='w-1/2 flex flex-col p-[3vh] space-y-[1.5vh]'>
                      <text class='font-mono text-gray-500'>Management Score</text>
                      <text>0/100</text>
                    </div>
                  </div>
                </div>
                <div class='w-full flex flex-col border-[2px] border-[#167FFC] bg-[#F2F5FF] rounded-2xl p-[1vw] space-y-[1.5vh]'>
                    <div class='flex items-center space-x-[0.5vw]'>
                        <text class='font-semibold'>Number of Pages</text>
                        <img src={filepic} class='w-[3vw]'/>
                    </div>
                    {
                      PageCount===1?
                      <ul class='space-y-[2vh]'>
                        <li>. A one-page format provides a clear and concise presentation of your qualifications, ensuring that every detail is relevant to the job you're pursuing.</li>
                        <li>. {username}, with a one-page resume, you can quickly capture the attention of recruiters and hiring managers who often have limited time to review each application.</li>
                        <li>. It showcases your strengths, education, and potential, making it an excellent choice if you're just starting your career journey or aiming for a focused and impactful presentation.</li>
                        <li>. Your one-page resume maintains a visually appealing and uncluttered format, enhancing its readability and making it more likely to leave a positive impression. While concise, it's essential to structure the content effectively, ensuring that each section optimally highlights your qualifications.</li>
                        <li>. We're here to assist you in crafting a compelling one-page resume that aligns with your career aspirations.</li>
                      </ul>
                      :
                      [
                        PageCount===2?
                        <ul class='space-y-[2vh]'>
                          <li>. Dear {username} If you find yourself with 5 to 10 years of professional experience, you're in a unique position to benefit from a two-page resume. This format provides you with the space needed to comprehensively detail your career journey, achievements, and skills.</li>
                          <li>. It's an excellent choice if you want to present a more in-depth picture of your qualifications to potential employers.</li>
                          <li>. {username}, with a two-page resume, you can showcase your career progression, delve into your accomplishments with specificity, and emphasize the skills that make you a strong candidate. Additionally, you have the flexibility to tailor your resume for each job application, ensuring that it aligns perfectly with the specific requirements of the role.</li>
                          <li>. Remember that while a two-page resume offers these advantages, it's crucial to maintain a clear and organized format. Ensure that the content remains relevant, focused, and easy to navigate. </li>
                          <li>. As always, we're here to support you in crafting the most effective resume for your job search.</li>
                        </ul>
                        :
                        <ul class='space-y-[2vh]'>
                          <li>. {username}, Opting for a resume that extends to three or more pages is a strategic choice that reflects your extensive career and accomplishments. A 3 or more-page resume is particularly suited for individuals with significant experience in specialized fields, senior leadership roles, or academia and research.</li>
                          <li>. It's an excellent choice if you want to present a more in-depth picture of your qualifications to potential employers.</li>
                          <li>. Your decision to embrace a longer resume allows you to provide a comprehensive and detailed account of your career journey.</li>
                          <li>. It showcases the depth and breadth of your expertise, making it clear why your extensive experience is a valuable asset. This format is well-suited for professionals who have multifaceted roles and substantial contributions in their chosen fields. </li>
                          <li>. While your resume spans multiple pages, it's essential to ensure that each section remains highly relevant and well-structured. Every page should emphasize your qualifications effectively, leaving no doubt about the significance of your accomplishments. We're here to support you in crafting an impressive extended resume that aligns seamlessly with your career trajectory.</li>
                        </ul>
                      ]
                    }
                    <text></text>
                </div>
                <div class='w-full flex flex-col border-[2px] border-[#167FFC] bg-[#F2F5FF] rounded-2xl p-[1vw] space-y-[1.5vh]'>
                    <div class='flex items-center space-x-[0.5vw]'>
                        <text class='font-semibold'>File Format</text>
                        <img src={filepic} class='w-[3vw]'/>
                    </div>
                    {
                      Type=='PDF'?
                      <ul class='space-y-[2vh]'>
                        <li>. Great work {username}, you picked the perfect file format for your resume. PDFs are universally accepted, and they maintain consistent formatting across different devices and operating systems.</li>
                        <li>. This makes them an excellent choice for professional documents like resumes. Uploading your resume in PDF format ensures that it appears the same way to all viewers, whether they're using a computer, tablet, or smartphone.</li>
                        <li>. It's highly recommended for job applications as it's ATS-friendly and easily downloadable by recruiters.</li>
                      </ul>
                      
                      :
                      [
                        Type=='DOCX'?
                        <ul class='space-y-[2vh]'>
                          <li>. While word documents are widely used for resume creation and offer flexibility in terms of editing and formatting, they can sometimes display differently due to variations in software and fonts.</li>
                          <li>. So {username}, be mindful of formatting issues, especially when sharing electronically.</li>
                          <li>. Saving your resume as a PDF for final submission instead can help maintain consistent appearance to recruiters, whether they're using a computer, tablet, or smartphone. PDFs are highly recommended for job applications as it's ATS-friendly and easily downloadable by recruiters.</li>
                        </ul>
                        :
                        <ul class='space-y-[2vh]'>
                          <li>. {username}, you went with an unconventional file format. If your intent is creative or industry-specific purposes, then your use may be justified.</li>
                          <li>. You should have a clear purpose. If you are going to use this format, ensure that recipients can easily access and view the content.</li>
                          <li>. It's also wise to include a traditional resume format alongside unconventional ones when applying for jobs.</li>
                          <li>Otherwise, consider using a PDF format. PDFs are universally accepted, and they maintain consistent formatting across different devices and operating systems. This makes them an excellent choice for professional documents like resumes. Uploading your resume in PDF format ensures that it appears the same way to all viewers, whether they're using a computer, tablet, or smartphone. It's highly recommended for job applications as it's ATS-friendly and easily downloadable by recruiters.</li>
                        </ul>
                      ]
                    }
                </div>
                <div class='w-full flex flex-col border-[2px] border-[#167FFC] bg-[#F2F5FF] rounded-2xl p-[1vw] space-y-[1.5vh]'>
                    <div class='flex items-center space-x-[0.5vw]'>
                        <text class='font-semibold'>Your Name</text>
                        <img src={filepic} class='w-[3vw]'/>
                    </div>
                    <text class='font-medium text-[#167FFC]'>(Use a larger font for this title)</text>
                    <ul class='space-y-[2vh]'>
                      <li>· Your name is the first thing recruiters and hiring managers see on your resume, and it should stand out prominently at the top of the page.</li>
                      <li>· Ensure that your name is in a larger and bolder font compared to the rest of the text. This makes it easily identifiable and memorable.</li>
                      <li>· Use your full legal name as it appears on official documents. Avoid using nicknames or initials unless they are widely recognized in your professional field.</li>
                      <li>· Double-check for any spelling errors in your name, as it's critical to get this detail right.</li>
                    </ul>
                </div>
                <div class='w-full flex flex-col border-[2px] border-[#167FFC] bg-[#F2F5FF] rounded-2xl p-[1vw] space-y-[1.5vh]'>
                    <div class='flex items-center space-x-[0.5vw]'>
                        <text class='font-semibold'>Contact Information</text>
                        <img src={filepic} class='w-[3vw]'/>
                    </div>
                    <text class='font-medium text-[#167FFC]'>(Use a larger font for this title)</text>
                    <ul class='space-y-[2vh]'>
                      <li>.	Make sure you include essential contact information such as your phone number and location. Including a professional-looking LinkedIn profile is also recommended.</li>
                      <li>.	Ensure that your phone number is current and operational. It should be a number where you can reliably receive calls and messages.</li>
                      <li>.	Specify your location, including the city and state (or region/country if applying internationally). This helps recruiters determine your geographical proximity to the job location.</li>
                      <li>.	Consider adding a professional-looking LinkedIn profile URL if you have one. Make sure your LinkedIn profile aligns with the information on your resume.</li>
                    </ul>
                </div>
                <div class='w-full flex flex-col border-[2px] border-[#167FFC] bg-[#F2F5FF] rounded-2xl p-[1vw] space-y-[1.5vh]'>
                    <div class='flex items-center space-x-[0.5vw]'>
                        <text class='font-semibold'>Cliched Words</text>
                        <img src={filepic} class='w-[3vw]'/>
                    </div>
                    <text>While going through your resume, we found the following cliched words:</text>
                    <div class='flex flex-col'>
                    {
                      ExtractedCliched.map((obj,index)=>
                        index<3?
                        <text>{obj}</text>
                        :
                        [
                          UserData.OneTime_Analysis==true || UserData.Subscription_Analysis==true ?
                          <text>{obj}</text>
                          :
                          <></>
                        ]
                      )
                    }
                    </div>
                    <text>{username}, cliched words may seem like convenient descriptors, but they can have a detrimental impact on your resume. They are often vague and lack specificity, failing to provide concrete evidence of your skills and achievements. To make your resume truly compelling and memorable, consider replacing cliches with specific examples and quantifiable results. Showcase your abilities through real accomplishments, demonstrating how you've made a difference in your previous roles. Additionally, tailor your resume for each job application by incorporating relevant keywords and phrases from the job description.</text>
                </div>
                <div class='flex flex-col -space-y-[5vh]'>
                  <div class='w-full flex flex-col border-[2px] border-[#167FFC] bg-[#F2F5FF] rounded-2xl p-[1vw] space-y-[1.5vh]'>
                      <div class='flex items-center space-x-[0.5vw]'>
                          <text class='font-semibold'>Grammar and Spelling Check</text>
                          <img src={filepic} class='w-[3vw]'/>
                      </div>
                      <text>Spelling errors may automatically take you off the applicant pool. To ensure a polished and professional presentation, take a moment to review your resume for any grammar and spelling errors. For instance, we found the following spelling errors:</text>
                      <div class='flex flex-col'>
                        {
                          ExtractedGrammer.map((obj,index)=>
                            index<3?
                            <text>{obj}</text>
                            :
                            [
                              UserData.OneTime_Analysis==true || UserData.Subscription_Analysis==true ?
                              <text>{obj}</text>
                              :
                              <></>
                            ]
                          )
                        }
                      </div>
                      <text>Thorough proofreading, using spell check, or seeking feedback from a trusted friend can make a significant difference. Correcting these errors will enhance your resume's impact and create a more favorable impression on potential employers.</text>
                  </div>
                  {
                    UserData.OneTime_Analysis==true || UserData.Subscription_Analysis==true ?
                    <></>
                    :
                    <div class='w-full flex justify-between px-[2vw] h-fit bg-gradient-to-b from-white/60 to-transparent pt-[10vh]'>
                      <div class='flex flex-col space-y-[5vh]'>
                        <button onClick={()=>{window.location.replace('/PayAnalysis')}} class='w-[20vw] h-[30vh] bg-[#1B5BFF]  flex flex-col justify-center items-center p-[2vw] text-white text-center font-semibold rounded-lg'>
                          Complete In-Depth Resume Analysis
                        </button>
                      </div>
                      <div class='flex flex-col space-y-[5vh]'>
                      
                        <button onClick={()=>{window.location.replace('/WriteResume')}} class='w-[20vw] h-[30vh] bg-[#FE9526]  flex flex-col justify-center items-center p-[2vw] text-white text-center font-semibold rounded-lg'>
                          Get a professional to Write Your Resume
                        </button> 
                      </div>
                    </div>
                  }
                </div>
                
                {
                  UserData.OneTime_Analysis==true || UserData.Subscription_Analysis==true ?
                  <div class='w-full flex flex-col border-[2px] border-[#21eb80] bg-[#def7ee] rounded-2xl p-[1vw] space-y-[1.5vh]'>
                      <div class='flex items-center space-x-[0.5vw]'>
                          <text class='font-semibold'>Sentence Structure</text>
                          <img src={filepic} class='w-[3vw]'/>
                      </div>
                      <text class='whitespace-pre-wrap'>{ExtractedSentenceS}</text>
                  </div>
                  :
                  <></>
                }
                {
                  UserData.OneTime_Analysis==true || UserData.Subscription_Analysis==true ?
                  <div class='w-full flex flex-col border-[2px] border-[#21eb80] bg-[#def7ee] rounded-2xl p-[1vw] space-y-[1.5vh]'>
                      <div class='flex items-center space-x-[0.5vw]'>
                          <text class='font-semibold'>Content Analysis</text>
                          <img src={filepic} class='w-[3vw]'/>
                      </div>
                      <text class='whitespace-pre-wrap'>{ExtractedContentAnalysis}</text>
                  </div>
                  :
                  <></>
                }
                {
                  UserData.OneTime_Analysis==true || UserData.Subscription_Analysis==true ?
                  <div class='w-full flex flex-col border-[2px] border-[#21eb80] bg-[#def7ee] rounded-2xl p-[1vw] space-y-[1.5vh]'>
                    <div class='flex items-center space-x-[0.5vw]'>
                        <text class='font-semibold'>Keyword Analysis</text>
                        <img src={filepic} class='w-[3vw]'/>
                    </div>
                    <text class='whitespace-pre-wrap'>{ExtractedKeywordAnalysis}</text>
                  </div>
                  :
                  <></>
                }
                {
                  UserData.OneTime_Analysis==true || UserData.Subscription_Analysis==true ?
                    <div class='flex flex-col -space-y-[5vh]'>
                      <div class='w-full flex flex-col border-[2px] border-[#21eb80] bg-[#def7ee] rounded-2xl p-[1vw] space-y-[1.5vh]'>
                          <div class='flex items-center space-x-[0.5vw]'>
                              <text class='font-semibold'>Applicant Tracking System</text>
                              <img src={filepic} class='w-[3vw]'/>
                          </div>
                          <text class={`text-[3vw] font-bold ${ExtractedATS.score>=90?'text-green-500':[ExtractedATS.score>=80?'text-yellow-300':[ExtractedATS.score>=70?'text-orange-400':'text-red-600']]}`}>Score: {ExtractedATS.score} / 100</text>
                          <text>ATS is a technology used by many employers to manage and streamline the recruitment process. ATS is single-handedly responsible for weeding out up to 60% of job seekers. </text>
                          <text class='whitespace-pre-wrap'>{ExtractedATS.text}</text>
                      </div>
                      {/* <div class='w-full flex justify-between px-[2vw] h-fit bg-gradient-to-b from-white/60 to-transparent pt-[10vh]'>
                        <div class='flex flex-col space-y-[5vh]'>
                          <button onClick={()=>{window.location.replace('/PayAnalysis')}} class='w-[20vw] h-[30vh] bg-[#1B5BFF]  flex flex-col justify-center items-center p-[2vw] text-white text-center font-semibold rounded-lg'>
                            Complete In-Depth Resume Analysis
                          </button>
                        </div>
                        <div class='flex flex-col space-y-[5vh]'>
                        
                          <button onClick={()=>{window.location.replace('/WriteResume')}} class='w-[20vw] h-[30vh] bg-[#FE9526]  flex flex-col justify-center items-center p-[2vw] text-white text-center font-semibold rounded-lg'>
                            Get a professional to Write Your Resume
                          </button> 
                        </div>
                      </div> */}
                    </div>
                  :
                  <></>
                }
                
                
               
                
                
            </div>
            :
            [
              ShowDiv==true?
              <div class='w-full flex flex-col items-center space-y-[8vh]'>
                  <div class='w-full flex flex-col items-center space-y-[2vh]'>
                    <text class='text-[2vw] font-semibold'>Upload your resume</text>
                    <text>Motto line, brand line, brand line, brand line</text>
                    <div className="file-upload">
                        <img src={folder} alt="upload" className='w-[8vw] h-fit border-[1px] border-blue-500 rounded-full p-[1vh]' />
                        <text class='font-semibold text-[1.2vw]'>Upload completed successfully</text>
                    </div>
                  </div>
                  <div class='flex flex-col items-center space-y-[2vh]'>
                    <text class='font-semibold text-[#167FFC]'>Some companies where our users have found jobs</text>
                    <div class='flex space-x-[1vw] items-center'>
                      <img src={com1} class='2vw'/>
                      <img src={com2} class='2vw'/>
                      <img src={com3} class='2vw'/>
                      <img src={com4} class='2vw'/>
                      <img src={com5} class='2vw'/>
                    </div>
                  </div>
              </div>
              :
              [
                check==false?
                  <div class='w-full flex flex-col items-center space-y-[8vh]'>
                      <div class='w-full flex flex-col items-center space-y-[2vh]'>
                        <text class='text-[2vw] font-semibold'>Upload your resume</text>
                        <text>Motto line, brand line, brand line, brand line</text>
                        <div className="file-upload">
                            <img src={folder} alt="upload" className='w-[8vw] h-fit border-[1px] border-[#FE9526] rounded-full p-[1vh]' />
                            <text class='font-semibold text-[1.2vw]'>Upload your resume here</text>
                            <p>DOC, DOCX, PDF, TXT, smaller than 5MB</p>
                        </div>
                      </div>
                      <div class='flex flex-col items-center space-y-[2vh]'>
                        <text class='font-semibold text-[#167FFC]'>Some companies where our users have found jobs</text>
                        <div class='flex space-x-[1vw] items-center'>
                          <img src={com1} class='2vw'/>
                          <img src={com2} class='2vw'/>
                          <img src={com3} class='2vw'/>
                          <img src={com4} class='2vw'/>
                          <img src={com5} class='2vw'/>
                        </div>
                      </div>
                  </div>
                :
                [
                  LoadingScreen==false?
                    <div className='w-full flex flex-col space-y-[3vh] items-center'>
                      <div class='w-fit relative flex space-x-[2vw]'>
                        <img src={load1} class='2vw'/>
                        <text>Running Analysis</text>
                      </div>
                      <div class='flex flex-col space-y-[1vh] items-center'>
                        <div class='flex relative space-x-[1vw] items-center'>
                          {
                            TickCounter>0?
                            <AiOutlineCheck size='2rem' class='absolute left-0 ml-[1vw] mb-[1vh] '/>
                            :
                            <></>
                          }
                          <img src={load2} class='2vw'/>
                          <text>Number of pages</text>
                        </div>
                        <div class='flex relative space-x-[1vw] items-center'>
                          {
                            TickCounter>1?
                            <AiOutlineCheck size='2rem' class='absolute left-0 ml-[1vw] mb-[1vh] '/>
                            :
                            <></>
                          }
                          <img src={load2} class='2vw'/>
                          <text>File Format</text>
                        </div>
                        <div class='flex relative space-x-[1vw] items-center'>
                          {
                            TickCounter>2?
                            <AiOutlineCheck size='2rem' class='absolute left-0 ml-[1vw] mb-[1vh] '/>
                            :
                            <></>
                          }
                          <img src={load2} class='2vw'/>
                          <text>Your Information</text>
                        </div>
                        <div class='flex relative space-x-[1vw] items-center'>
                          {
                            TickCounter>3?
                            <AiOutlineCheck size='2rem' class='absolute left-0 ml-[1vw] mb-[1vh] '/>
                            :
                            <></>
                          }
                          <img src={load2} class='2vw'/>
                          <text>Cliched Words</text>
                        </div>
                        <div class='flex relative space-x-[1vw] items-center'>
                          {
                            TickCounter>4?
                            <AiOutlineCheck size='2rem' class='absolute left-0 ml-[1vw] mb-[1vh] '/>
                            :
                            <></>
                          }
                          <img src={load2} class='2vw'/>
                          <text>Grammar and Spelling Check</text>
                        </div>
                        <div class='flex relative space-x-[1vw] items-center'>
                          {
                            TickCounter>5?
                            <AiOutlineCheck size='2rem' class='absolute left-0 ml-[1vw] mb-[1vh] '/>
                            :
                            <></>
                          }
                          <img src={load2} class='2vw'/>
                          <text>Sentence Structure</text>
                        </div>
                        <div class='flex relative space-x-[1vw] items-center'>
                          {
                            TickCounter>6?
                            <AiOutlineCheck size='2rem' class='absolute left-0 ml-[1vw] mb-[1vh] '/>
                            :
                            <></>
                          }
                          <img src={load2} class='2vw'/>
                          <text>ATS Compatibility</text>
                        </div>
                        <div class='flex relative space-x-[1vw] items-center'>
                          {
                            TickCounter>7?
                            <AiOutlineCheck size='2rem' class='absolute left-0 ml-[1vw] mb-[1vh] '/>
                            :
                            <></>
                          }
                          <img src={load2} class='2vw'/>
                          <text>Content Analysis</text>
                        </div>
                        <div class='flex relative space-x-[1vw] items-center'>
                          {
                            TickCounter>8?
                            <AiOutlineCheck size='2rem' class='absolute left-0 ml-[1vw] mb-[1vh] '/>
                            :
                            <></>
                          }
                          <img src={load2} class='2vw'/>
                          <text>Keyword Analysis</text>
                        </div>
                      </div>
                    </div>
                    :
                    <div class='w-full h-[70vh] flex items-center justify-center '>
                      <AiOutlineLoading size='4rem' class='animate-spin' color='blue'/>
                    </div>
                ] 
              ]
            ]
           
          }
        </div>
       
        <div class='absolute top-[50vh] flex items-start'>
            <img src={line} class='mt-[4vw] w-[8vw]'/>
            <img src={plane} class='w-[4vw]'/>
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

export default ResultPage