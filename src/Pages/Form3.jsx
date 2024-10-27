import React, { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineDelete, AiOutlineLoading, AiOutlinePlus, AiOutlineRight } from 'react-icons/ai'
import cloud1 from '../assets/FormPage/Group 102.png'
import cloud2 from '../assets/FormPage/Group 104.png'
import cloud3 from '../assets/FormPage/Group 100.png'
import cloud4 from '../assets/FormPage/Group 101.png'
import cloud5 from '../assets/FormPage/Group 103.png'

import plane from '../assets/icon8.png'
import bulb from '../assets/icon9.png'

import Sec1 from '../assets/Form3/Sec1.png'
import Sec2 from '../assets/Form3/Sec2.png'
import Sec3 from '../assets/Form3/Sec3.png'
import Sec4 from '../assets/Form3/Sec4.png'
import Sec5 from '../assets/Form3/Sec5.png'
import Sec6 from '../assets/Form3/Sec6.png'
import Sec7 from '../assets/Form3/Sec7.png'
import { ToastContainer, toast } from 'react-toastify'

import { Document, Packer, Paragraph } from 'docx'
import { saveAs } from 'file-saver'
import supabase from '../config/supabase'

function Form3() {

    const [Customer,setCustomer]=useState(null)

    const [Sections,setSections]=useState([
        {name:'Volunteer Work & Internship',check:false,icon:Sec1},
        {name:'Awards & Honors',check:false,icon:Sec6},
        {name:'Projects & Publications',check:false,icon:Sec4},
        {name:'Memberships',check:false,icon:Sec3},
        {name:'Languages',check:false,icon:Sec7},
        {name:'References',check:false,icon:Sec5},
        {name:'Hobbies',check:false,icon:Sec2},
    ])

    const [Summary,setSummary]=useState({text:'',length:0})
    const [Experience,setExperience]=useState({title:'',company:'',start:'',end:'',city:'',description:'',length:0})
    const [Education,setEducation]=useState({degree:'',institute:'',start:'',end:'',city:'',description:'',length:0})
    const [Skill,setSkill]=useState('')
    const [VolunteerWork,setVolunteerWork]=useState({title:'',workplace:'',start:'',end:'',city:'',description:'',length:0})
    const [Award,setAward]=useState({name:'',institute:'',date:''})
    const [Projects,setProjects]=useState({name:'',link:'',start:'',end:''})
    const [Membership,setMembership]=useState({name:'',institute:'',start:'',end:''})
    const [Language,setLanguage]=useState({name:'',level:''})
    const [Reference,setReference]=useState({name:'',company:'',email:'',phone:''})
    
    const [hobby,sethobby]=useState('')
    const [AllExperiences,setAllExperiences]=useState([])
    const [AllEducations,setAllEducations]=useState([])
    const [AllSkills,setAllSkills]=useState([])
    const [AllVolunteerWork,setAllVolunteerWork]=useState([])
    const [AllAwards,setAllAwards]=useState([])
    const [AllProjects,setAllProjects]=useState([])
    const [AllMembership,setAllMembership]=useState([])
    const [AllLanguages,setAllLanguages]=useState([])
    const [AllReference,setAllReference]=useState([])

    function ToggleSections(index){
        const newSections=[...Sections]
        newSections[index].check=!newSections[index].check
        setSections(newSections)
    }


    function AddExperience()
    {
        if(Experience.city!=''&&Experience.company!=''&&Experience.description!=''&&Experience.start!=''&&Experience.end!=''&&Experience.title!='')
        {
            setAllExperiences(obj=>[...obj,Experience])
            //setExperience({title:'',company:'',start:'',end:'',city:'',description:'',length:0})
            toast.success('Info. added successcully')
        }
        else
        {
            toast.error('Kindly fill all fields')
        }     
    }

    function AddEducation()
    {
        if(Education.city!=''&&Education.institute!=''&&Education.degree!=''&&Education.start!=''&&Education.end!=''&&Education.description!='')
        {
            setAllEducations(obj=>[...obj,Education])
            //setEducation({degree:'',institute:'',start:'',end:'',city:'',description:'',length:0})
            toast.success('Info. added successcully')
        }
        else
        {
            toast.error('Kindly fill all fields')
        }     
    }

    function AddVolunteerWork()
    {
        if(VolunteerWork.city!=''&&VolunteerWork.description!=''&&VolunteerWork.end!=''&&VolunteerWork.start!=''&&VolunteerWork.title!=''&&VolunteerWork.workplace!='')
        {
            setAllVolunteerWork(obj=>[...obj,VolunteerWork])
            //setVolunteerWork({title:'',workplace:'',start:'',end:'',city:'',description:'',length:0})
            toast.success('Info. added successcully')
        }
        else
        {
            toast.error('Kindly fill all fields')
        }     
    }

    function AddAward()
    {
        if(Award.date!=''&&Award.institute!=''&&Award.name!='')
        {
            setAllAwards(obj=>[...obj,Award])
            //setAward({name:'',institute:'',date:''})
            toast.success('Info. added successcully')
        }
        else
        {
            toast.error('Kindly fill all fields')
        }     
    }

    function AddProject()
    {
        if(Projects.name!=''&&Projects.link!=''&&Projects.start!=''&&Projects.end!='')
        {
            setAllProjects(obj=>[...obj,Projects])
            //setProjects({name:'',institute:'',date:''})
            toast.success('Info. added successcully')
        }
        else
        {
            toast.error('Kindly fill all fields')
        }     
    }

    function AddMembership()
    {
        if(Membership.name!=''&&Membership.institute!=''&&Membership.start!=''&&Membership.end!='')
        {
            setAllMembership(obj=>[...obj,Membership])
            //setProjects({name:'',institute:'',date:''})
            toast.success('Info. added successcully')
        }
        else
        {
            toast.error('Kindly fill all fields')
        }     
    }

    function AddLanguage()
    {
        if(Language.name!=''&&Language.level!='')
        {
            setAllLanguages(obj=>[...obj,Language])
            //setProjects({name:'',institute:'',date:''})
            toast.success('Info. added successcully')
        }
        else
        {
            toast.error('Kindly fill all fields')
        }     
    }

    function AddReference()
    {
        if(Reference.name!=''&&Reference.company!=''&&Reference.email!=''&&Reference.phone!='')
        {
            setAllReference(obj=>[...obj,Reference])
            //setProjects({name:'',institute:'',date:''})

            toast.success('Info. added successcully')
        }
        else
        {
           toast.error('Kindly fill all fields')
        }   
    }

    function GenerateCustomerRequirementsDOCX()
    {
        if(Summary.text!=''&&AllExperiences.length>0&&AllEducations.length>0&&AllSkills.length>0)
        {
            let Doc = new Document()

            Doc.createParagraph(`Email: ${Customer.user.email}`)
            Doc.createParagraph(``)
            Doc.createParagraph(``)

            if(Summary.text!='')
            {
                Doc.createParagraph(`Summary:`)
                Doc.createParagraph(`${Summary.text}`)
                Doc.createParagraph(``)
            }
            
            if(AllExperiences.length>0)
            {
                Doc.createParagraph(`All Experiences of Customer:`)
                for(var i=0;i<AllExperiences.length;i++)
                {
                    Doc.createParagraph(`${i+1}. title: ${AllExperiences[i].title}, Company: ${AllExperiences[i].company}, Start Date: ${AllExperiences[i].start}, End Date: ${AllExperiences[i].end}, City: ${AllExperiences[i].city}, Description: ${AllExperiences[i].description}`)
                }
                Doc.createParagraph(``)
            }
            
            if(AllEducations.length>0)
            {
                Doc.createParagraph(`All Educations of Customer:`)
                for(var i=0;i<AllEducations.length;i++)
                {
                    Doc.createParagraph(`${i+1}. Degree: ${AllEducations[i].degree}, Institute: ${AllEducations[i].institute}, Start Date: ${AllEducations[i].start}, End Date: ${AllEducations[i].end}, City: ${AllEducations[i].city}, Description: ${AllEducations[i].description}`)
                }
                Doc.createParagraph(``)
            }
            
            if(AllSkills.length>0)
            {
                Doc.createParagraph(`All Skills of Customer:`)
                for(var i=0;i<AllSkills.length;i++)
                {
                    Doc.createParagraph(`${i+1}. ${AllSkills[i]}`)
                }
                Doc.createParagraph(``)
            }
            
            if(AllVolunteerWork.length>0)
            {
                Doc.createParagraph(`All Volunteer Works/Internships of Customer:`)
                for(var i=0;i<AllVolunteerWork.length;i++)
                {
                    Doc.createParagraph(`${i+1}. title: ${AllVolunteerWork[i].title}, Workplace: ${AllVolunteerWork[i].workplace}, Start Date: ${AllVolunteerWork[i].start}, End Date: ${AllVolunteerWork[i].end}, City: ${AllVolunteerWork[i].city}, Description: ${AllVolunteerWork[i].description}`)
                }
                Doc.createParagraph(``)
            }
            
            if(AllAwards.length>0)
            {
                Doc.createParagraph(`All Awards of Customer:`)
                for(var i=0;i<AllAwards.length;i++)
                {
                    Doc.createParagraph(`${i+1}. Name: ${AllAwards[i].name}, Institute: ${AllAwards[i].institute}, Date: ${AllAwards[i].date}`)
                }
                Doc.createParagraph(``)
            }
            
            if(AllProjects.length>0)
            {
                Doc.createParagraph(`All Publications/Projects of Customer:`)
                for(var i=0;i<AllProjects.length;i++)
                {
                    Doc.createParagraph(`${i+1}. Name: ${AllProjects[i].name}, Link: ${AllProjects[i].link}, Start Date: ${AllProjects[i].start}, End Date: ${AllProjects[i].end}`)
                }
                Doc.createParagraph(``)
            }
            
            if(AllMembership.length>0)
            {
                Doc.createParagraph(`All Memberships of Customer:`)
                for(var i=0;i<AllMembership.length;i++)
                {
                    Doc.createParagraph(`${i+1}. Name: ${AllMembership[i].name}, Institute: ${AllMembership[i].institute}, Start Date: ${AllMembership[i].start}, End Date: ${AllMembership[i].end}`)
                }
                Doc.createParagraph(``)
            }
            
            if(AllLanguages.length>0)
            {
                Doc.createParagraph(`All Languages of Customer:`)
                for(var i=0;i<AllLanguages.length;i++)
                {
                    Doc.createParagraph(`${i+1}. Name: ${AllLanguages[i].name}, Level: ${AllLanguages[i].level}`)
                }
                Doc.createParagraph(``)
            }
            
            if(AllReference.length>0)
            {
                Doc.createParagraph(`All References of Customer:`)
                for(var i=0;i<AllReference.length;i++)
                {
                    Doc.createParagraph(`${i+1}. Name: ${AllReference[i].name}, Company: ${AllReference[i].company}, Email: ${AllReference[i].email}, Phone: ${AllReference[i].phone}`)
                }
                Doc.createParagraph(``)
            }
            
            if(hobby.length>0)
            {
                Doc.createParagraph(`Hobbies of Customer:`)
                Doc.createParagraph(`${hobby}`)
                Doc.createParagraph(``)
            }
            console.log(Doc)
            saveDocumentFileDOCX(Doc,'Requirements.docx')

        }
        else
        {
            toast.error('Kindly fill the required sections (Summary, Experience, Education, Skills)')   
        }
    }

    function saveDocumentFileDOCX(doc,filename)
    {  
        const packer= new Packer()
        const mimeType='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        packer.toBlob(doc).then(blob=>{
            const DocBlob=blob.slice(0,blob.size,mimeType)
            // saveAs(DocBlob,filename)
            saveDocumentFileDOCXInSupabase(DocBlob)
        })
    }

    async function saveDocumentFileDOCXInSupabase(file)
    {
        const {data,error} = await supabase
        .storage
        .from('OneTimeResumePDF')
        .upload(Customer.user.email+'/Requirements/'+Customer.user.email+'_CustomerDetails.docx',file,{
            upsert:true
        })

        if(error)
        {
            toast.error(error.message)
        }
        else
        {
            toast.success('Requirements/Details submitted successfully')
        }   
    }

    useEffect(()=>{
        const userSession= JSON.parse(sessionStorage.getItem('session'))
        if(userSession==null)
        {
            window.location.replace('/login')
        }
        setCustomer(userSession)
        CheckPlanType(userSession)
    },[])

    const [Loading,setLoading]=useState(true)

    async function ReadPDFFileinSupabase(email)
    {   
        const {data,error} = await supabase
        .storage
        .from('OneTimeResumePDF')
        .list(email+'/Requirements/')

        if(data.length==0)
        {
            return true
        }
        else
        {
            toast.error('Requirements File already submitted',{
                onClose: ()=>{window.location.replace('/UserDashboard')}
            })
        }
    }

    async function CheckPlanType(User)
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
        if(sol.data[0].OneTime_Writing==true)
        {
            const ReqCheck = await ReadPDFFileinSupabase(User.user.email)
            if(ReqCheck==true)
            {
                setLoading(false)
            }  
        }
        else
        {
            toast.error('You donot have access to the page.',{
                onClose: ()=>{window.location.replace('/')}
            })
        }
      }
      else
      {
        toast.error('Error while loading page.',{
            onClose: ()=>{window.location.replace('/')}
        })
      }
    }

  return (
    <div class='w-full min-h-screen flex flex-col items-center space-y-[6vh] font-Poppins'>
        <ToastContainer/>
        <div class='w-full flex justify-between text-[1.2vw]  z-[999]  px-[3vw] py-[3vh]'>
            <text class='font-semibold'>ResumeAnalysis.<text class='text-[#1B5BFF]'>ai</text></text>
            <div class='flex space-x-[1vw] items-center text-base text-[#DEE4EC]'>
                <div class='h-[2vw] w-[2vw] rounded-full flex justify-center items-center text-white bg-[#167FFC]'>1</div>
                <text class='text-black'>Enter Details</text>
                <text>----</text>
                <div class='h-[2vw] w-[2vw] rounded-full flex justify-center items-center bg-[#1B5BFF] text-white'>2</div>
                <text class='text-black'>Tell Us More</text>
                <text>----</text>
                <div class='h-[2vw] w-[2vw] rounded-full flex justify-center items-center bg-[#DEE4EC] text-[#8CA1BA]'>3</div>
                <text>View Resume</text>
            </div>
            <AiOutlineClose color='#98A3BF'/>
        </div>

        {
            Loading==true?
                <div class='w-full h-[70vh] flex items-center justify-center '>
                    <AiOutlineLoading size='4rem' class='animate-spin' color='blue'/>
                </div>
            :
            <div class='w-[60%] min-h-screen flex flex-col space-y-[5vh] bg-white rounded-3xl border-[2px] px-[2vw] py-[5vh]'>
                <div class='w-full flex items-start justify-between'>
                    {/* <button onClick={()=>{window.location.replace('/upload')}} class='w-fit hover:bg-gray-100 p-[1vw] rounded-lg flex items-start space-x-[0.7vw]'>
                        <button class='p-[0.3vw] rounded-full border-[#8C98B5] border-[2px]'>
                            <AiOutlinePlus color='#8C98B5'/>
                        </button>
                        <text class='text-[#8C98B5]'>Add Resume</text>
                    </button> */}
                    <div class='w-fit'></div>
                    <div class='w-fit flex flex-col items-center space-y-[0.5vh]'>
                        <text class='font-semibold'>Abdullah Naeem</text>
                        {
                            Customer!=null?
                            <text class='text-[0.95vw]'>{Customer.user.email}</text>
                            :
                            <></>
                        }
                    </div>
                    <button onClick={GenerateCustomerRequirementsDOCX} class=' rounded-lg hover:bg-[#EAF0FF] p-[1vh] w-fit flex space-x-[1vw] items-center py-[2vh]'>
                        <text class='text-[#1B5BFF] font-medium text-[1.3vw]'>Continue</text>
                        <AiOutlineRight color='#1B5BFF'/>
                    </button>
                </div>
                <div class='flex flex-col w-full space-y-[2vh]'>
                    <div class='w-full flex items-center -space-x-[0.5vw]'>
                        <div class='w-[34%]'></div>
                        <div class='bg-[#1B5BFF] text-[0.9vw] text-white p-[0.5vh] rounded-lg'>34%</div>
                    </div>
                    <div class='w-full h-[2vh] flex -space-x-[1vw] items-center rounded-full bg-[#EFF4FF]'>
                        <div class='w-[34%] h-full flex bg-[#8DADFF] rounded-l-full'></div>
                        <img src={plane} class='w-[3.2vw]'/>
                    </div>
                </div>
                <div class='w-full flex items-center space-x-[2vw] px-[1vw] py-[3vh] rounded-lg bg-[#FAF9FF] border-[2px]'>
                    <img src={bulb} class='w-[4vw]'/>
                    <div class='h-full space-y-[1vh] flex flex-col'>
                        <text class='font-medium'><text class='text-[#4628A4]'>Pro Tip: </text>Use our expert guidlines to increase your chances of getting hired by 100% </text>
                        <text class='font-light text-[#98A3BF] text-[0.9vw]'>78% of recruiters use ATS to hire which our guidelines help easily bypass.</text>
                    </div>
                </div>
                <div class='flex flex-col space-y-[1.5vh]'>
                    <text class='font-semibold text-[1.3vw]'>Career Summary</text>
                    <text class='text-[#98A3BF] text-[0.9vw]'>Write a brief description about your career goals and the type of job you are seeking:</text>
                    <textarea maxLength='100' onChange={(e)=>{setSummary({text:e.target.value,length:e.target.value.length})}} rows={8} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[2vh]'/>
                    <div class='w-full flex justify-end'>{Summary.length}/100</div>
                </div>
                <div class='flex flex-col space-y-[1.5vh]'>
                    <text class='font-semibold text-[1.3vw]'>Professional Experience</text>
                    <text class='text-[#98A3BF] text-[0.9vw]'>Tell us a brief history of your experience in the workplace. Mention your responsibilities and achievements for each role.</text>
                    <div class='flex flex-col space-y-[1vh]'>
                        {
                            AllExperiences.map((obj,index)=>
                                <div class='w-full flex flex-col space-y-[0.5vh] font-semibold rounded-lg bg-[#EAF0FF] border-[1px] p-[1vh]'>
                                    <div class='w-full flex justify-between'>
                                        <div class='w-[2vw] h-[2vw] flex justify-center items-center bg-white rounded-full mb-[1vw]'>{index+1}</div>
                                        <AiOutlineDelete onClick={()=>{setAllExperiences(AllExperiences.filter(current=>current!=obj))}} color='red' size='1.2rem' class='cursor-pointer hover:bg-gray-200'/>
                                    </div>
                                    <text>Title: <text class='font-normal'>{obj.title}</text></text>
                                    <text>Company: <text class='font-normal'>{obj.company}</text></text>
                                    <text>Start date: <text class='font-normal'>{obj.start}</text></text>
                                    <text>End date: <text class='font-normal'>{obj.end}</text></text>
                                    <text>City: <text class='font-normal'>{obj.city}</text></text>
                                    <text>Description: <text class='font-normal'>{obj.description}</text></text>
                                </div>
                            )
                        }
                    </div>
                    <div class='w-full flex flex-col space-y-[3vh] p-[2.5vh] border-[2px] rounded-lg'>
                        <div class='w-full flex justify-between items-center'>
                            <text class='text-[1.1vw] font-medium'>Untitled</text>
                            <AiOutlineDelete color='#BCCCF2' size='1.2rem'/>
                        </div>
                        <div class='w-full flex space-x-[2.5vw]'>
                            <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                <text class='text-[#98A3BF] text-[0.9vw]'>Job title</text>
                                <input value={Experience.title} onChange={(e)=>{setExperience({title:e.target.value,company:Experience.company,start:Experience.start,end:Experience.end,city:Experience.city,description:Experience.description,length:Experience.length})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                            </div>
                            <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                <text class='text-[#98A3BF] text-[0.9vw]'>Company</text>
                                <input value={Experience.company} onChange={(e)=>{setExperience({title:Experience.title,company:e.target.value,start:Experience.start,end:Experience.end,city:Experience.city,description:Experience.description,length:Experience.length})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                            </div>
                        </div>
                        <div class='w-full flex space-x-[2.5vw]'>
                            <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                <text class='text-[#98A3BF] text-[0.9vw]'>Start & End Date</text>
                                <div class='w-full flex space-x-[1vw]'>
                                    <input value={Experience.start} maxLength='5' onChange={(e)=>{setExperience({title:Experience.title,company:Experience.company,start:e.target.value,end:Experience.end,city:Experience.city,description:Experience.description,length:Experience.length})}} placeholder='MM/YY' class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                    <input value={Experience.end} maxLength='5' onChange={(e)=>{setExperience({title:Experience.title,company:Experience.company,start:Experience.start,end:e.target.value,city:Experience.city,description:Experience.description,length:Experience.length})}} placeholder='MM/YY' class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                </div>
                            </div>
                            <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                <text class='text-[#98A3BF] text-[0.9vw]'>City</text>
                                <input value={Experience.city} onChange={(e)=>{setExperience({title:Experience.title,company:Experience.company,start:Experience.start,end:Experience.end,city:e.target.value,description:Experience.description,length:Experience.length})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                            </div>
                        </div>
                        <div class='w-full flex flex-col space-y-[1vh]'>
                            <text class='text-[#98A3BF] text-[0.9vw]'>Description</text>
                            <textarea value={Experience.description} onChange={(e)=>{setExperience({title:Experience.title,company:Experience.company,start:Experience.start,end:Experience.end,city:Experience.city,description:e.target.value,length:e.target.value.length})}} rows={8} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[2vh]'/>
                        </div>
                        <div class='w-full flex justify-end'>{Experience.length}/100</div>
                    </div>
                    <button onClick={AddExperience} class=' rounded-lg hover:bg-[#EAF0FF] p-[1vh] w-fit flex space-x-[1vw] items-center py-[2vh]'>
                        <AiOutlinePlus color='#167FFC' size='1.2rem'/>
                        <text class='text-[#167FFC] font-semibold'>Add More Experience</text>
                    </button>
                </div>
                <div class='flex flex-col space-y-[1.5vh]'>
                    <text class='font-semibold text-[1.3vw]'>Education</text>
                    <text class='text-[#98A3BF] text-[0.9vw]'>Provide a varied brief mention of your education and learnings that could help add value to your work at a job after being hired.</text>
                    <div class='flex flex-col space-y-[1vh]'>
                        {
                            AllEducations.map((obj,index)=>
                                <div class='w-full flex flex-col space-y-[0.5vh] font-semibold rounded-lg bg-[#EAF0FF] border-[1px] p-[1vh]'>
                                    <div class='w-full flex justify-between'>
                                        <div class='w-[2vw] h-[2vw] flex justify-center items-center bg-white rounded-full mb-[1vw]'>{index+1}</div>
                                        <AiOutlineDelete onClick={()=>{setAllEducations(AllEducations.filter(current=>current!=obj))}} color='red' size='1.2rem' class='cursor-pointer hover:bg-gray-200'/>
                                    </div>
                                    <text>Degree: <text class='font-normal'>{obj.degree}</text></text>
                                    <text>Institute: <text class='font-normal'>{obj.institute}</text></text>
                                    <text>Start date: <text class='font-normal'>{obj.start}</text></text>
                                    <text>End date: <text class='font-normal'>{obj.end}</text></text>
                                    <text>City: <text class='font-normal'>{obj.city}</text></text>
                                    <text>Description: <text class='font-normal'>{obj.description}</text></text>
                                </div>
                            )
                        }
                    </div>
                    <div class='w-full flex flex-col space-y-[3vh] p-[2.5vh] border-[2px] rounded-lg'>
                        <div class='w-full flex justify-between items-center'>
                            <text class='text-[1.1vw] font-medium'>Untitled</text>
                            <AiOutlineDelete color='#BCCCF2' size='1.2rem'/>
                        </div>
                        <div class='w-full flex space-x-[2.5vw]'>
                            <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                <text class='text-[#98A3BF] text-[0.9vw]'>Degree</text>
                                <input value={Education.degree} onChange={(e)=>{setEducation({degree:e.target.value,institute:Education.institute,start:Education.start,end:Education.end,city:Education.city,description:Education.description,length:Education.length})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                            </div>
                            <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                <text class='text-[#98A3BF] text-[0.9vw]'>Institute</text>
                                <input value={Education.institute} onChange={(e)=>{setEducation({degree:Education.degree,institute:e.target.value,start:Education.start,end:Education.end,city:Education.city,description:Education.description,length:Education.length})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                            </div>
                        </div>
                        <div class='w-full flex space-x-[2.5vw]'>
                            <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                <text class='text-[#98A3BF] text-[0.9vw]'>Start & End Date</text>
                                <div class='w-full flex space-x-[1vw]'>
                                    <input value={Education.start} maxLength='5' onChange={(e)=>{setEducation({degree:Education.degree,institute:Education.institute,start:e.target.value,end:Education.end,city:Education.city,description:Education.description,length:Education.length})}} placeholder='MM/YY' class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                    <input value={Education.end} maxLength='5' onChange={(e)=>{setEducation({degree:Education.degree,institute:Education.institute,start:Education.start,end:e.target.value,city:Education.city,description:Education.description,length:Education.length})}} placeholder='MM/YY' class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                </div>
                            </div>
                            <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                <text class='text-[#98A3BF] text-[0.9vw]'>City</text>
                                <input value={Education.city} onChange={(e)=>{setEducation({degree:Education.degree,institute:Education.institute,start:Education.start,end:Education.end,city:e.target.value,description:Education.description,length:Education.length})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                            </div>
                        </div>
                        <div class='w-full flex flex-col space-y-[1vh]'>
                            <text class='text-[#98A3BF] text-[0.9vw]'>Description</text>
                            <textarea value={Education.description} onChange={(e)=>{setEducation({degree:Education.degree,institute:Education.institute,start:Education.start,end:Education.end,city:Education.city,description:e.target.value,length:e.target.value.length})}} rows={8} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[2vh]'/>
                        </div>
                        <div class='w-full flex justify-end'>{Education.length}/100</div>
                    </div>
                    <button onClick={AddEducation} class='rounded-lg hover:bg-[#EAF0FF] p-[1vh] w-fit flex space-x-[1vw] items-center py-[2vh]'>
                        <AiOutlinePlus color='#167FFC' size='1.2rem'/>
                        <text class='text-[#167FFC] font-semibold'>Add More Education</text>
                    </button>
                </div>
                <div class='flex flex-col space-y-[1.5vh]'>
                    <text class='font-semibold text-[1.3vw]'>Skills</text>
                    <text class='text-[#98A3BF] text-[0.9vw]'>Write a brief description about your career goals and the type of job you are seeking:</text>
                    <div class='flex flex-wrap space-x-[1vw]'>
                        {
                            AllSkills.map(obj=>
                                <div class='w-fit flex py-[1vh] px-[2vw] font-medium rounded-lg border-[2px] border-black/70'>{obj}</div>
                            )   
                        }
                    </div>
                    <input value={Skill} onChange={(e)=>{setSkill(e.target.value)}} class='w-1/2 rounded-lg bg-[#EAF0FF] outline-none p-[2vh]'/>
                    <button onClick={()=>{if(Skill!=''){setAllSkills(obj=>[...obj,Skill]);setSkill('')}}} class='rounded-lg hover:bg-[#EAF0FF] p-[1vh] w-fit flex space-x-[1vw] items-center py-[2vh]'>
                        <AiOutlinePlus color='#167FFC' size='1.2rem'/>
                        <text class='text-[#167FFC] font-semibold'>Add More Skill</text>
                    </button>
                </div>
                {
                    Sections[0].check==true?
                    <div class='flex flex-col space-y-[1.5vh]'>
                        <text class='font-semibold text-[1.3vw]'>Volunteer Work & Internships</text>
                        <text class='text-[#98A3BF] text-[0.9vw]'>Tell us a brief history of your experience in the workplace. Mention your responsibilities and achievements for each role.</text>
                        <div class='flex flex-col space-y-[1vh]'>
                        {
                            AllVolunteerWork.map((obj,index)=>
                                <div class='w-full flex flex-col space-y-[0.5vh] font-semibold rounded-lg bg-[#EAF0FF] border-[1px] p-[1vh]'>
                                    <div class='w-full flex justify-between'>
                                        <div class='w-[2vw] h-[2vw] flex justify-center items-center bg-white rounded-full mb-[1vw]'>{index+1}</div>
                                        <AiOutlineDelete onClick={()=>{setAllVolunteerWork(AllVolunteerWork.filter(current=>current!=obj))}} color='red' size='1.2rem' class='cursor-pointer hover:bg-gray-200'/>
                                    </div>
                                    <text>Title: <text class='font-normal'>{obj.title}</text></text>
                                    <text>Workplace: <text class='font-normal'>{obj.workplace}</text></text>
                                    <text>Start date: <text class='font-normal'>{obj.start}</text></text>
                                    <text>End date: <text class='font-normal'>{obj.end}</text></text>
                                    <text>City: <text class='font-normal'>{obj.city}</text></text>
                                    <text>Description: <text class='font-normal'>{obj.description}</text></text>
                                </div>
                            )
                        }
                        </div>
                        <div class='w-full flex flex-col space-y-[3vh] p-[2.5vh] border-[2px] rounded-lg'>
                            <div class='w-full flex justify-between items-center'>
                                <text class='text-[1.1vw] font-medium'>Untitled</text>
                                <AiOutlineDelete color='#BCCCF2' size='1.2rem'/>
                            </div>
                            <div class='w-full flex space-x-[2.5vw]'>
                                <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                    <text class='text-[#98A3BF] text-[0.9vw]'>Work Title</text>
                                    <input onChange={(e)=>{setVolunteerWork({title:e.target.value,workplace:VolunteerWork.workplace,start:VolunteerWork.start,end:VolunteerWork.end,city:VolunteerWork.city,description:VolunteerWork.description,length:VolunteerWork.length})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                </div>
                                <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                    <text class='text-[#98A3BF] text-[0.9vw]'>Workplace/Event</text>
                                    <input onChange={(e)=>{setVolunteerWork({title:VolunteerWork.title,workplace:e.target.value,start:VolunteerWork.start,end:VolunteerWork.end,city:VolunteerWork.city,description:VolunteerWork.description,length:VolunteerWork.length})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                </div>
                            </div>
                            <div class='w-full flex space-x-[2.5vw]'>
                                <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                    <text class='text-[#98A3BF] text-[0.9vw]'>Start & End Date</text>
                                    <div class='w-full flex space-x-[1vw]'>
                                        <input onChange={(e)=>{setVolunteerWork({title:VolunteerWork.title,workplace:VolunteerWork.workplace,start:e.target.value,end:VolunteerWork.end,city:VolunteerWork.city,description:VolunteerWork.description,length:VolunteerWork.length})}} placeholder='MM/YY' class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                        <input onChange={(e)=>{setVolunteerWork({title:VolunteerWork.title,workplace:VolunteerWork.workplace,start:VolunteerWork.start,end:e.target.value,city:VolunteerWork.city,description:VolunteerWork.description,length:VolunteerWork.length})}} placeholder='MM/YY' class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                    </div>
                                </div>
                                <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                    <text class='text-[#98A3BF] text-[0.9vw]'>City</text>
                                    <input onChange={(e)=>{setVolunteerWork({title:VolunteerWork.title,workplace:VolunteerWork.workplace,start:VolunteerWork.start,end:VolunteerWork.end,city:e.target.value,description:VolunteerWork.description,length:VolunteerWork.length})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                </div>
                            </div>
                            <div class='w-full flex flex-col space-y-[1vh]'>
                                <text class='text-[#98A3BF] text-[0.9vw]'>Description</text>
                                <textarea onChange={(e)=>{setVolunteerWork({title:VolunteerWork.title,workplace:VolunteerWork.workplace,start:VolunteerWork.start,end:VolunteerWork.end,city:VolunteerWork.city,description:e.target.value,length:e.target.value.length})}} rows={8} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[2vh]'/>
                            </div>
                            <div class='w-full flex justify-end'>{VolunteerWork.length}/100</div>
                        </div>
                        <button onClick={AddVolunteerWork} class='rounded-lg hover:bg-[#EAF0FF] p-[1vh] w-fit flex space-x-[1vw] items-center py-[2vh]'>
                            <AiOutlinePlus color='#167FFC' size='1.2rem'/>
                            <text class='text-[#167FFC] font-semibold'>Add More Volunteer Work</text>
                        </button>
                    </div>
                    :
                    <></>
                }
                {
                    Sections[1].check==true?
                    <div class='flex flex-col space-y-[1.5vh]'>
                        <text class='font-semibold text-[1.3vw]'>Awards & Honors</text>
                        <text class='text-[#98A3BF] text-[0.9vw]'> Please provide me with the specific awards or achievements you'd like to mention.</text>
                        <div class='flex flex-col space-y-[1vh]'>
                        {
                            AllAwards.map((obj,index)=>
                                <div class='w-full flex flex-col space-y-[0.5vh] font-semibold rounded-lg bg-[#EAF0FF] border-[1px] p-[1vh]'>
                                    <div class='w-full flex justify-between'>
                                        <div class='w-[2vw] h-[2vw] flex justify-center items-center bg-white rounded-full mb-[1vw]'>{index+1}</div>
                                        <AiOutlineDelete onClick={()=>{setAllAwards(AllAwards.filter(current=>current!=obj))}} color='red' size='1.2rem' class='cursor-pointer hover:bg-gray-200'/>
                                    </div>
                                    <text>Name: <text class='font-normal'>{obj.name}</text></text>
                                    <text>Institute: <text class='font-normal'>{obj.institute}</text></text>
                                    <text>Date: <text class='font-normal'>{obj.date}</text></text>
                                </div>
                            )
                        }
                        </div>
                        <div class='w-full flex flex-col space-y-[3vh] p-[2.5vh] border-[2px] rounded-lg'>
                            <div class='w-full flex justify-between items-center'>
                                <text class='text-[1.1vw] font-medium'>Untitled</text>
                                <AiOutlineDelete color='#BCCCF2' size='1.2rem'/>
                            </div>
                            <div class='w-full flex space-x-[2.5vw]'>
                                <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                    <text class='text-[#98A3BF] text-[0.9vw]'>Award Name</text>
                                    <input onChange={(e)=>{setAward({name:e.target.value,institute:Award.institute,date:Award.date})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                </div>
                                <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                    <text class='text-[#98A3BF] text-[0.9vw]'>Awarding Institute</text>
                                    <input onChange={(e)=>{setAward({name:Award.name,institute:e.target.value,date:Award.date})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                </div>
                            </div>
                            <div class='w-full flex space-x-[2.5vw]'>
                                <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                    <text class='text-[#98A3BF] text-[0.9vw]'>Date Recieved</text>
                                    <div class='w-full flex space-x-[1vw]'>
                                        <input maxLength={5} onChange={(e)=>{setAward({name:Award.name,institute:Award.institute,date:e.target.value})}} placeholder='MM/YY' class='w-1/2 rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={AddAward} class='rounded-lg hover:bg-[#EAF0FF] p-[1vh] w-fit flex space-x-[1vw] items-center py-[2vh]'>
                            <AiOutlinePlus color='#167FFC' size='1.2rem'/>
                            <text class='text-[#167FFC] font-semibold'>Add More Award</text>
                        </button>
                    </div>
                    :
                    <></>
                }
                {
                    Sections[2].check==true?
                    <div class='flex flex-col space-y-[1.5vh]'>
                        <text class='font-semibold text-[1.3vw]'>Publications or Projects </text>
                        <text class='text-[#98A3BF] text-[0.9vw]'>Tell me about your publications or projects – I'd love to hear what you've been working on</text>
                        <div class='flex flex-col space-y-[1vh]'>
                        {
                            AllProjects.map((obj,index)=>
                                <div class='w-full flex flex-col space-y-[0.5vh] font-semibold rounded-lg bg-[#EAF0FF] border-[1px] p-[1vh]'>
                                    <div class='w-full flex justify-between'>
                                        <div class='w-[2vw] h-[2vw] flex justify-center items-center bg-white rounded-full mb-[1vw]'>{index+1}</div>
                                        <AiOutlineDelete onClick={()=>{setAllProjects(AllProjects.filter(current=>current!=obj))}} color='red' size='1.2rem' class='cursor-pointer hover:bg-gray-200'/>
                                    </div>
                                    <text>Name: <text class='font-normal'>{obj.name}</text></text>
                                    <text>Link: <text class='font-normal'>{obj.link}</text></text>
                                    <text>Start date: <text class='font-normal'>{obj.start}</text></text>
                                    <text>End date: <text class='font-normal'>{obj.end}</text></text>
                                </div>
                            )
                        }
                        </div>
                        <div class='w-full flex flex-col space-y-[3vh] p-[2.5vh] border-[2px] rounded-lg'>
                            <div class='w-full flex justify-between items-center'>
                                <text class='text-[1.1vw] font-medium'>Untitled</text>
                                <AiOutlineDelete color='#BCCCF2' size='1.2rem'/>
                            </div>
                            <div class='w-full flex space-x-[2.5vw]'>
                                <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                    <text class='text-[#98A3BF] text-[0.9vw]'>Project Name</text>
                                    <input onChange={(e)=>{setProjects({name:e.target.value,link:Projects.link,start:Projects.start,end:Projects.end})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                </div>
                                <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                    <text class='text-[#98A3BF] text-[0.9vw]'>Project Link</text>
                                    <input onChange={(e)=>{setProjects({name:Projects.name,link:e.target.value,start:Projects.start,end:Projects.end})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                </div>
                            </div>
                            <div class='w-full flex space-x-[2.5vw]'>
                                <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                    <text class='text-[#98A3BF] text-[0.9vw]'>Start & End Date</text>
                                    <div class='w-full flex space-x-[1vw]'>
                                        <input maxLength={5} onChange={(e)=>{setProjects({name:Projects.name,link:Projects.link,start:e.target.value,end:Projects.end})}} placeholder='MM/YY' class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                        <input maxLength={5} onChange={(e)=>{setProjects({name:Projects.name,link:Projects.link,start:Projects.start,end:e.target.value})}} placeholder='MM/YY' class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={AddProject} class='rounded-lg hover:bg-[#EAF0FF] p-[1vh] w-fit flex space-x-[1vw] items-center py-[2vh]'>
                            <AiOutlinePlus color='#167FFC' size='1.2rem'/>
                            <text class='text-[#167FFC] font-semibold'>Add More Projects</text>
                        </button>
                    </div>
                    :
                    <></>

                }
                {
                    Sections[3].check==true?
                    <div class='flex flex-col space-y-[1.5vh]'>
                        <text class='font-semibold text-[1.3vw]'>Memberships</text>
                        <text class='text-[#98A3BF] text-[0.9vw]'>Do you hold any memberships in industry associations or organizations? Please provide details of the groups you are part of.</text>
                        <div class='flex flex-col space-y-[1vh]'>
                        {
                            AllMembership.map((obj,index)=>
                                <div class='w-full flex flex-col space-y-[0.5vh] font-semibold rounded-lg bg-[#EAF0FF] border-[1px] p-[1vh]'>
                                    <div class='w-full flex justify-between'>
                                        <div class='w-[2vw] h-[2vw] flex justify-center items-center bg-white rounded-full mb-[1vw]'>{index+1}</div>
                                        <AiOutlineDelete onClick={()=>{setAllMembership(AllMembership.filter(current=>current!=obj))}} color='red' size='1.2rem' class='cursor-pointer hover:bg-gray-200'/>
                                    </div>
                                    <text>Name: <text class='font-normal'>{obj.name}</text></text>
                                    <text>Institute: <text class='font-normal'>{obj.institute}</text></text>
                                    <text>Start date: <text class='font-normal'>{obj.start}</text></text>
                                    <text>End date: <text class='font-normal'>{obj.end}</text></text>
                                </div>
                            )
                        }
                        </div>
                        <div class='w-full flex flex-col space-y-[3vh] p-[2.5vh] border-[2px] rounded-lg'>
                            <div class='w-full flex justify-between items-center'>
                                <text class='text-[1.1vw] font-medium'>Untitled</text>
                                <AiOutlineDelete color='#BCCCF2' size='1.2rem'/>
                            </div>
                            <div class='w-full flex space-x-[2.5vw]'>
                                <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                    <text class='text-[#98A3BF] text-[0.9vw]'>Membership Name</text>
                                    <input onChange={(e)=>{setMembership({name:e.target.value,institute:Membership.institute,start:Membership.start,end:Membership.end})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                </div>
                                <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                    <text class='text-[#98A3BF] text-[0.9vw]'>Institution/Organization</text>
                                    <input onChange={(e)=>{setMembership({name:Membership.name,institute:e.target.value,start:Membership.start,end:Membership.end})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                </div>
                            </div>
                            <div class='w-full flex space-x-[2.5vw]'>
                                <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                    <text class='text-[#98A3BF] text-[0.9vw]'>Start & End Date</text>
                                    <div class='w-full flex space-x-[1vw]'>
                                        <input maxLength={5} onChange={(e)=>{setMembership({name:Membership.name,institute:Membership.institute,start:e.target.value,end:Membership.end})}} placeholder='MM/YY' class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                        <input maxLength={5} onChange={(e)=>{setMembership({name:Membership.name,institute:Membership.institute,start:Membership.start,end:e.target.value})}} placeholder='MM/YY' class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={AddMembership} class='rounded-lg hover:bg-[#EAF0FF] p-[1vh] w-fit flex space-x-[1vw] items-center py-[2vh]'>
                            <AiOutlinePlus color='#167FFC' size='1.2rem'/>
                            <text class='text-[#167FFC] font-semibold'>Add More Membership</text>
                        </button>
                    </div>
                    :
                    <></>
                }
                {
                    Sections[4].check==true?
                    <div class='flex flex-col space-y-[1.5vh]'>
                        <text class='font-semibold text-[1.3vw]'>Languages</text>
                        <text class='text-[#98A3BF] text-[0.9vw]'> I'd like to inquire about the languages in which you are proficient.</text>
                        {
                            AllLanguages.map((obj,index)=>
                                <div class='w-full flex flex-col space-y-[0.5vh] font-semibold rounded-lg bg-[#EAF0FF] border-[1px] p-[1vh]'>
                                    <div class='w-full flex justify-between'>
                                        <div class='w-[2vw] h-[2vw] flex justify-center items-center bg-white rounded-full mb-[1vw]'>{index+1}</div>
                                        <AiOutlineDelete onClick={()=>{setAllLanguages(AllLanguages.filter(current=>current!=obj))}} color='red' size='1.2rem' class='cursor-pointer hover:bg-gray-200'/>
                                    </div>
                                    <text>Name: <text class='font-normal'>{obj.name}</text></text>
                                    <text>Level: <text class='font-normal'>{obj.level}</text></text>
                                </div>
                            )
                        }
                        <div class='w-full flex flex-col space-y-[3vh] p-[2.5vh] border-[2px] rounded-lg'>
                            <div class='w-full flex justify-between items-center'>
                                <text class='text-[1.1vw] font-medium'>Untitled</text>
                                <AiOutlineDelete color='#BCCCF2' size='1.2rem'/>
                            </div>
                            <div class='w-full flex space-x-[2.5vw]'>
                                <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                    <text class='text-[#98A3BF] text-[0.9vw]'>Language</text>
                                    <input onChange={(e)=>{setLanguage({name:e.target.value,level:Language.level})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                </div>
                                <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                    <text class='text-[#98A3BF] text-[0.9vw]'>Level</text>
                                    <select onChange={(e)=>{setLanguage({name:Language.name,level:e.target.value})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'>
                                        <option class='hidden' >select</option>
                                        <option>Basic</option>
                                        <option>Conversational</option>
                                        <option>Fluent</option>
                                        <option>Native</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button onClick={AddLanguage} class='rounded-lg hover:bg-[#EAF0FF] p-[1vh] w-fit flex space-x-[1vw] items-center py-[2vh]'>
                            <AiOutlinePlus color='#167FFC' size='1.2rem'/>
                            <text class='text-[#167FFC] font-semibold'>Add More Language</text>
                        </button>
                    </div>
                    :
                    <></>
                }
                {
                    Sections[5].check==true?
                    <div class='flex flex-col space-y-[1.5vh]'>
                        <text class='font-semibold text-[1.3vw]'>References</text>
                        <text class='text-[#98A3BF] text-[0.9vw]'>Please provide any references or sources you'd like us to consider</text>
                        {
                            AllReference.map((obj,index)=>
                                <div class='w-full flex flex-col space-y-[0.5vh] font-semibold rounded-lg bg-[#EAF0FF] border-[1px] p-[1vh]'>
                                    <div class='w-full flex justify-between'>
                                        <div class='w-[2vw] h-[2vw] flex justify-center items-center bg-white rounded-full mb-[1vw]'>{index+1}</div>
                                        <AiOutlineDelete onClick={()=>{setAllReference(AllReference.filter(current=>current!=obj))}} color='red' size='1.2rem' class='cursor-pointer hover:bg-gray-200'/>
                                    </div>
                                    <text>Name: <text class='font-normal'>{obj.name}</text></text>
                                    <text>Company: <text class='font-normal'>{obj.company}</text></text>
                                    <text>Email: <text class='font-normal'>{obj.email}</text></text>
                                    <text>Phone: <text class='font-normal'>{obj.phone}</text></text>
                                </div>
                            )
                        }
                        <div class='w-full flex flex-col space-y-[3vh] p-[2.5vh] border-[2px] rounded-lg'>
                            <div class='w-full flex justify-between items-center'>
                                <text class='text-[1.1vw] font-medium'>Untitled</text>
                                <AiOutlineDelete color='#BCCCF2' size='1.2rem'/>
                            </div>
                            <div class='w-full flex space-x-[2.5vw]'>
                                <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                    <text class='text-[#98A3BF] text-[0.9vw]'>Referent’s Full Name</text>
                                    <input onChange={(e)=>{setReference({name:e.target.value,company:Reference.company,email:Reference.email,phone:Reference.phone})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                </div>
                                <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                    <text class='text-[#98A3BF] text-[0.9vw]'>Company</text>
                                    <input onChange={(e)=>{setReference({name:Reference.name,company:e.target.value,email:Reference.email,phone:Reference.phone})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                </div>
                            </div>
                            <div class='w-full flex space-x-[2.5vw]'>
                                <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                    <text class='text-[#98A3BF] text-[0.9vw]'>Email</text>
                                    <input onChange={(e)=>{setReference({name:Reference.name,company:Reference.company,email:e.target.value,phone:Reference.phone})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                </div>
                                <div class='w-1/2 flex flex-col space-y-[1vh]'>
                                    <text class='text-[#98A3BF] text-[0.9vw]'>Phone</text>
                                    <input onChange={(e)=>{setReference({name:Reference.name,company:Reference.company,email:Reference.email,phone:e.target.value})}} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[1.5vh]'/>
                                </div>
                            </div>
                        </div>
                        <button onClick={AddReference} class='rounded-lg hover:bg-[#EAF0FF] p-[1vh] w-fit flex space-x-[1vw] items-center py-[2vh]'>
                            <AiOutlinePlus color='#167FFC' size='1.2rem'/>
                            <text class='text-[#167FFC] font-semibold'>Add More Reference</text>
                        </button>
                    </div>
                    :
                    <></>
                }
                {
                    Sections[6].check==true?
                    <div class='flex flex-col space-y-[1.5vh]'>
                        <text class='font-semibold text-[1.3vw]'>Hobbies</text>
                        <text class='text-[#98A3BF] text-[0.9vw]'>What do you like?</text>
                        <textarea onChange={(e)=>{sethobby(e.target.value)}} rows={8} class='w-full rounded-lg bg-[#EAF0FF] outline-none p-[2vh]'/>
                    </div>
                    :
                    <></>
                }
                
                <div class='flex flex-col space-y-[1.5vh]'>
                    <text class='font-semibold text-[1.3vw]'>Add Section</text>
                    <div class='flex flex-wrap'>
                        {
                            Sections.map((obj,index)=>
                                <button key={index} onClick={()=>ToggleSections(index)} class={`hover:bg-gray-200 rounded-lg w-1/3 flex items-center p-[2vh] space-x-[1vw] font-medium ${obj.check==true?'bg-green-200':''}`}>
                                    <img src={obj.icon} class='w-[3vw]'/>
                                    <text class='text-start'>{obj.name}</text>
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        }

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

export default Form3