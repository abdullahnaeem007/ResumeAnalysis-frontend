import React, { useEffect, useState } from 'react'
import { FaHome } from 'react-icons/fa'
import supabase from '../config/supabase'
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import pdfpic from '../assets/UserDashboard/pdf.png'
import docxpic from '../assets/UserDashboard/docx.png'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineLoading } from 'react-icons/ai';
import { MdPendingActions } from "react-icons/md";
import { RxValueNone } from "react-icons/rx";

function UserDashboard() {

    const [Customer,SetCustomer]=useState(null)
    const [CustomerFiles,setCustomerFiles]=useState([])
    const [Loading,setLoading]=useState(false)
    const [Loading2,setLoading2]=useState(true)
    const [LoadingScreen,setLoadingScreen]=useState(true)

    const [PaymentTypes,setPaymentTypes]=useState([
        {title:'Complete In-Depth Resume Analysis',type:'One-Time',price:'10$',Subscribed:false},
        {title:'Complete In-Depth Resume Analysis',type:'Subscription-based',price:'5$',Subscribed:false},
        {title:'Professional Resume Writing',type:'One-Time',price:'75$',Subscribed:false}
    ])

    function formatFileSize(bytes) {
        if (bytes < 1024) {
          return bytes + ' B';
        } else if (bytes < 1048576) { // Less than 1 MB
          return (bytes / 1024).toFixed(2) + ' KB';
        } else {
          return (bytes / 1048576).toFixed(2) + ' MB';
        }
      }

    async function LogoutUser()
    {
        const response = await supabase.auth.signOut()
        sessionStorage.clear()
        localStorage.clear()
        window.location.replace('/login')
    }

    async function DownloadFileFromSupabase(filename)
    {
        setLoading(true)
        const {data,error} = await supabase
        .storage
        .from('OneTimeResumePDF')
        .download(Customer.user.email+'/WrittenResume/'+filename)

        console.log(data.type)

        if(data.type=='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        {
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();
            window.URL.revokeObjectURL(link.href);
        }
        else if(data.type=='application/pdf')
        {
            const blob = new Blob([data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();
            window.URL.revokeObjectURL(link.href);
        }

        setLoading(false)
    }

    async function ReadPDFFileinSupabase(email)
    {   
        
        const {data,error} = await supabase
        .storage
        .from('OneTimeResumePDF')
        .list(email+'/WrittenResume/')
        
        if(error||data.length==0)
        {
            //toast.error('Written Resume is still pending')
        }
        else
        {
            console.log(data)
            setCustomerFiles(data)
        }
        setLoading2(false)
    }

    async function GetCustomerDetails(User)
    {
        const res=await fetch('https://resumeanalysis-backend.onrender.com/FetchUsers',{
            method:'POST',
            body:JSON.stringify({Email:User.user.email}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    
        const sol = await res.json()
        if(sol.status=='success')
        {
            const UserData=sol.data[0]
            const newPaymentTypes = PaymentTypes.map((obj,index)=>{
                return{
                    ...obj,
                    Subscribed:index==0?UserData.OneTime_Analysis : index==1 ? UserData.Subscription_Analysis : index==2? UserData.OneTime_Writing : obj.Subscribed 
                }
            }) 
            await ReadPDFFileinSupabase(User.user.email)
            setPaymentTypes(newPaymentTypes)
            setLoadingScreen(false)
        }
        else
        {
            toast.error('User not found',{
                onClose:()=>{window.location.replace('/')}
            })
        }
    }

    useEffect(()=>{
        const userSession= JSON.parse(sessionStorage.getItem('session'))
        if(userSession==null)
        {
            window.location.replace('/login')
        }
        console.log(userSession)
        SetCustomer(userSession)
        GetCustomerDetails(userSession)
    },[])


  return (
    <div class='w-full min-h-screen flex flex-col bg-[#EAF0FF] font-Poppins'>
        <ToastContainer/>
        <div class='w-full h-screen flex flex-col items-center pb-[3vh] space-y-[7vh]'>
            <div class='w-full flex items-center justify-between px-[3vw] py-[3vh] bg-white shadow-md'>
                <div class='w-full flex space-x-[2vw] items-center'>
                    <div class='w-[5vh] h-[5vh] bg-[#167FFC] shadow-md p-[1vh] rounded-xl'>
                        <FaHome  color='white' class='w-full h-full' />
                    </div>
                    <text class='text-[1.4vw] font-medium'>Dashboard</text>
                </div>
                <button onClick={LogoutUser} class='w-fit flex px-[2vw] py-[1vh] text-white rounded-xl bg-[#167FFC]'>
                    Logout
                </button>
            </div>
            {
                Customer!=null?
                <div class='w-full h-full flex space-x-[3vw] px-[2vw]'>
                    <div class='w-[60%] h-full flex flex-col space-y-[5vh]'>
                        <div class='w-full flex flex-col space-y-[1vh]'>
                            <text class='text-[1.3rem] font-medium'>Payment Settings</text>
                            <div class='w-full border-b-[1px] border-b-black/50'>
                                <button class='border-b-[2px] border-b-black/80 py-[1vh]'>Overview</button>
                            </div>
                        </div>
                        {
                            LoadingScreen==true?
                            <div class='w-full h-full flex  justify-center items-center'>
                                <AiOutlineLoading class='animate-spin' size='2rem'/>
                            </div>
                            :
                            <div class='w-full flex space-x-[1vw]'>  
                                {
                                    PaymentTypes.map(obj=>
                                        <div class='w-full h-fit flex flex-col shadow-md space-y-[2vh] items-center p-[1vw] rounded-lg bg-white'>
                                            <text class='min-h-[8vh] text-center border-b-[2px] text-[0.9rem] font-medium'>{obj.title}</text>
                                            <text class='text-[2.5rem] font-bold text-[#167FFC]'>{obj.price}</text>
                                            <text class='w-full text-right text-[0.8rem] font-light'>({obj.type})</text>
                                            <button onClick={()=>{if(obj.price=='75$'&&obj.Subscribed==false){window.location.replace('/WriteResume')}else if(obj.Subscribed==false){window.location.replace('/PayAnalysis')}}} class={`w-full py-[1vh] ${obj.Subscribed==true?'bg-[#167FFC]/40':'bg-[#167FFC] hover:bg-[#167FFC]/70'}  text-white rounded-lg`}>
                                                {
                                                    obj.Subscribed==true?
                                                    <text>Subscribed</text>
                                                    :
                                                    <text>Subscribe</text>
                                                }
                                            </button>
                                            {
                                                obj.Subscribed==true?
                                                <button onClick={()=>{if(obj.price=='75$'&&obj.Subscribed==true){window.location.replace('/form3')}else if(obj.Subscribed==true){window.location.replace('/Upload')}}} class='w-full py-[1vh] bg-black rounded-lg text-white'>Use</button>
                                                :
                                                <></>
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        }
                        
                    </div>

                    <div class='w-[40%] h-full flex flex-col space-y-[5vh] bg-white rounded-lg  shadow-lg shadow-[#167FFC]/30 px-[2vw] py-[3vh]'>
                        <div class='flex items-center border-b-[2px] space-x-[1vw]'>
                            <IoPersonCircleOutline color='#167FFC' size='2.5vw'/>
                            <text class='font-semibold'>{Customer.user.email}</text>
                        </div>
                        <div class='w-full h-[60vh] flex flex-col items-center space-y-[3vh]'>
                            {
                                CustomerFiles.length>0&&PaymentTypes[2].Subscribed==false?
                                    CustomerFiles.map(obj=>
                                        <div class='w-full flex justify-between items-center'>
                                            <div class='flex space-x-[1vw] items-center'>
                                                {
                                                    obj.metadata.mimetype=='application/pdf'?
                                                    <img src={pdfpic} class='w-[3vw]'/>
                                                    :
                                                    <img src={docxpic} class='w-[3vw]'/>
                                                }
                                                <div class='flex flex-col text-sm space-y-[0.5vh]'>
                                                    <text class='font-medium'>{obj.name}</text>
                                                    <text>{formatFileSize(obj.metadata.size)}</text>
                                                </div>
                                            </div>
                                            <button onClick={()=>DownloadFileFromSupabase(obj.name)} class='w-fit flex space-x-[0.5vw] hover:bg-[#167FFC]/70 items-center justify-center px-[1vw] py-[1vh] text-white rounded-xl bg-[#167FFC]'>
                                                {
                                                    Loading==false?
                                                    <div class='flex space-x-[0.5vw] items-center'>
                                                        <IoMdDownload color='white'/>
                                                        <text>Download</text>
                                                    </div>
                                                    :
                                                    <AiOutlineLoading class='animate-spin' color='white'/>
                                                }
                                            </button>
                                        </div> 
                                    )
                                :
                                [
                                    CustomerFiles.length==0&&PaymentTypes[2].Subscribed==false&&Loading2==false?
                                    <div class='w-full h-full  flex flex-col space-y-[2vh] justify-center items-center'>
                                        <RxValueNone size='7rem' color='red'/>
                                        <text class='text-[1.2rem] font-medium'> No Order placed </text>
                                        <text class='font-light'>Subscribe to get a custom written resume</text>
                                    </div>
                                    :
                                    [
                                        Loading2==true?
                                            <div class='w-full h-full flex  justify-center items-center'>
                                                <AiOutlineLoading class='animate-spin' size='2rem'/>
                                            </div>
                                        :
                                        [   
                                            PaymentTypes[2].Subscribed==true && (CustomerFiles.length==0||CustomerFiles.length>0)?
                                            <div class='w-full h-full  flex flex-col space-y-[2vh] justify-center items-center'>
                                                <MdPendingActions size='7rem' color='#167FFC'/>
                                                <div class='flex space-x-[1vw] items-center'>
                                                    <text class='text-[1.2rem] font-medium'> Status: </text>
                                                    <text class='text-[1rem] font-medium bg-red-400 px-[1vw] py-[0.5vh] text-white rounded-lg'>Pending</text>
                                                </div>
                                                <text class='font-light'>The written resume will be available soon</text>
                                            </div>
                                            :
                                            <></>
                                        ]
                                        
                                    ]
                                ]
                            }
                        </div>
                    </div>
                </div>
                
                :
                <></>
            }
        </div>
    </div>
  )
}

export default UserDashboard