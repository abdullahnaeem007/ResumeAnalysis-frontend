import React, { useEffect, useState } from 'react'
import { FaHome } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import { AiOutlineFileDone, AiOutlineLoading } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { Chart } from "react-google-charts";
import supabase from '../config/supabase';
import Swal from 'sweetalert2';
import { toast,ToastContainer } from 'react-toastify';


function AdminDashboard() {
    const [Customers,setCustomers]=useState([
        {Email:'desmond110a@gmail.com',Price:'10$',status:'Pending'},
        {Email:'abdullahnaeem0914@gmail.com',Price:'10$',status:'Pending'},
        {Email:'l200914@lhr.nu.edu.pk',Price:'10$',status:'Pending'},
    ])

    const [dataPie,setdata] = useState([
        ["Task", "Hours per Day"],
        ["Completed", 0],
        ["Pending", 0],
      ]);

    const [CustomerType,setCustomerType]=useState('All')
    const [TotalCustomer,setTotalCustomer]=useState(0)
    const [PendingCustomer,setPendingCustomer]=useState(0)
    const [CompletedCustomer,setCompletedCustomer]=useState(0)
    const [Loading,setLoading]=useState(false)
    const [Loading2,setLoading2]=useState(false)

    async function OneTimeWriting_Finish(email)
    {
        const response=await fetch('https://resumeanalysis-backend.onrender.com/OneTimeWriting_Finish',{
            method:'POST',
            body:JSON.stringify({Email:email}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
  
        const sol= await response.json()
        if(sol.status=='success')
        {
            return true   
        }
        else
        {
            return false
        }
    }

    async function SavePDFFileinSupabase(e,email)
    {
        let file=e.target.files[0]

        Swal.fire({
            title: `Do you want to upload ${file.name} ?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Upload",
            denyButtonText: `Cancel`
        }).then(async(result) => {
        if (result.isConfirmed) {
            
            const {data,error} = await supabase
            .storage
            .from('OneTimeResumePDF')
            .upload(email+'/WrittenResume/'+file.name,file)

            if(error)
            {
                toast.error(error.message)
            }
            else
            {
                const FinishCheck=await OneTimeWriting_Finish(email)
                if(FinishCheck==true)
                {
                    const updatedCustomers = Customers.map((customer) => {
                        if (customer.Email === email) {
                          return { ...customer, status: 'Completed' };
                        }
                        return customer;
                      });
                    setCustomers(updatedCustomers);
                    setdata([
                        ["Task", "Hours per Day"],
                        ["Completed", CompletedCustomer+1],
                        ["Pending", PendingCustomer-1],
                    ]) 
                    setPendingCustomer(PendingCustomer-1)
                    setCompletedCustomer(CompletedCustomer+1)
                    toast.success('File Uploaded Successfully')
                }
                else
                {
                    toast.error('Error while submitting file')
                }
            }
        } 
        else if (result.isDenied) {
            toast.error('File not uploaded')
        }
        });
        e.target.value=null
    }

    async function ReadPDFFileinSupabase(email)
    {   
        setLoading(true)
        const {data,error} = await supabase
        .storage
        .from('OneTimeResumePDF')
        .list(email+'/Requirements/')

        if(data.length==0||error)
        {
            toast.error('Requirements File not found')
        }
        else
        {
            DownloadFileFromSupabase(email,data[0].name)
        }
        setLoading(false)
    }

    async function DownloadFileFromSupabase(email,filename)
    {
        const {data,error} = await supabase
        .storage
        .from('OneTimeResumePDF')
        .download(email+'/Requirements/'+filename)

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
        
    }

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
            toast.error('Admin not logged in',{
                onClose: ()=>{window.location.replace('/')}
            })
        }
        else if(!error)
        {
            await FetchAllOrders()
        }   
    }

    async function FetchAllOrders()
    {
        const res=await fetch('https://resumeanalysis-backend.onrender.com/FetchAllUsers',{
          method:'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      })
  
      const sol = await res.json()
      if(sol.status=='success' && sol.data.length>0)
      {
        var Orders=[]
        for(var i=0;i<sol.data.length;i++)
        {
            if(sol.data[i].OneTime_Writing==true)
            {
                Orders.push({Email:sol.data[i].Email,Price:'75$',status:'Pending'})
            }
        }
        if(Orders.length>0)
        {
            setCustomers(Orders)
            setTotalCustomer(Orders.length)
            setPendingCustomer(Orders.length)
            setdata([
                ["Task", "Hours per Day"],
                ["Completed", CompletedCustomer],
                ["Pending", Orders.length],
              ])   
        }

      }
      else if(sol.status=='success' && sol.data.length==0)
      {
        toast.info('No Users Found in database.')
      }
      else if(sol.status=='failure')
      {
        toast.error('Error while fetching users data.',{
            onClose: ()=>{window.location.reload()}
        })
      }
      setLoadingScreen(false)
    }
    
    const [LoadingScreen,setLoadingScreen]=useState(true)
    const [User,setUser]=useState(null)

    useEffect(()=>{
        const userSession= JSON.parse(sessionStorage.getItem('session'))
        if(userSession==null)
        {
            window.location.replace('/login')
        }
        setUser(userSession)
        CheckAdminLogin(userSession)
    },[])

  return (
    <div class='w-full min-h-screen flex flex-col bg-[#EAF0FF] font-Poppins'>
        <ToastContainer/>
        <div class='w-full flex flex-col space-y-[7vh] px-[3vw] py-[4vh]'>
            <div class='w-full flex items-center justify-between'>
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
                LoadingScreen==true?
                <div class='w-full h-[70vh] flex items-center justify-center '>
                    <AiOutlineLoading size='4rem' class='animate-spin' color='blue'/>
                </div>
                :
                <div class='w-full flex flex-col space-y-[7vh]'>
                    <div class='w-full flex space-x-[2vw] items-center'>
                        <div class='w-[25vw] h-[15vh] shadow-md flex justify-between items-center p-[1vw] bg-white border-l-[0.5vw] border-[#167FFC] rounded-xl'>
                            <div class='flex flex-col justify-center'>
                                <text class='text-[1.1vw] text-[#167FFC]'>Total Customers</text>
                                <text class='text-[2.1vw] font-semibold'>{TotalCustomer}</text>
                            </div>
                            <FaPeopleGroup size='2.5vw' color='gray'/>   
                        </div>
                        <div class='w-[25vw] h-[15vh] shadow-md flex justify-between items-center p-[1vw] bg-white border-l-[0.5vw] border-[#167FFC] rounded-xl'>
                            <div class='flex flex-col justify-center'>
                                <text class='text-[1.1vw] text-[#167FFC]'>Pending Resumes</text>
                                <text class='text-[2.1vw] font-semibold'>{PendingCustomer}</text>
                            </div>
                            <MdOutlinePendingActions size='2.5vw' color='gray'/>   
                        </div>
                        <div class='w-[25vw] h-[15vh] shadow-md flex justify-between items-center p-[1vw] bg-white border-l-[0.5vw] border-[#167FFC] rounded-xl'>
                            <div class='flex flex-col justify-center'>
                                <text class='text-[1.1vw] text-[#167FFC]'>Completed Resumes</text>
                                <text class='text-[2.1vw] font-semibold'>{CompletedCustomer}</text>
                            </div>
                            <AiOutlineFileDone size='2.5vw' color='gray'/>   
                        </div>
                        
                    </div>
                    <div class='w-full h-fit flex space-x-[2vw]'>
                        <div class='w-[70vw] min-h-[50vh] px-[1vw] py-[2vh] space-y-[8vh] flex flex-col bg-white rounded-xl shadow-md'>
                            <div class='w-full flex justify-between  rounded-t-xl '>
                                <text class='text-[1.2vw] font-semibold'>Order Status</text>
                                <select onChange={(e)=>{setCustomerType(e.target.value)}} class='border-[1px] rounded-xl border-black px-[1vh] py-[0.5vh]'>
                                    <option>All</option>
                                    <option>Pending</option>
                                    <option>Completed</option>
                                </select>
                            </div>
                            <div class='w-full h-full flex flex-col text-[1vw]'>
                                <div class='w-full bg-gray-200 space-x-[1vw] px-[1vw] py-[1vh] font-medium rounded-lg flex justify-between'>
                                    <text class='w-[25%]'>Email</text>
                                    <text class='w-[25%] flex justify-center'>Price</text>
                                    <text class='w-[25%]'>Status</text>
                                    <text class='w-[25%] flex justify-center'>Requirements</text>
                                </div>
                                {
                                    Customers.map(obj=>
                                        obj.status==CustomerType?
                                        <div class='w-full px-[1vw] text-[0.95vw] py-[1.5vh] border-b-[2px] border-gray-200  flex justify-between'>
                                            <text class='min-w-[25%]'>{obj.Email}</text>
                                            <text class='w-[25%] flex justify-center'>{obj.Price}</text>
                                            <text class='w-[25%] flex'>
                                                    {
                                                        obj.status=='Pending'?
                                                        <input type='file' accept='.pdf,.docx' onChange={(e)=>SavePDFFileinSupabase(e,obj.Email)} class={`w-fit flex space-x-[0.5vw] items-center px-[1vw] py-[0.5vh] rounded-lg text-white ${obj.status=='Pending'?'bg-red-400':'bg-green-400'} `}>
                                                        
                                                        </input>
                                                        :
                                                        <button class={`w-fit flex space-x-[0.5vw] items-center px-[1vw] py-[0.5vh] rounded-lg text-white ${obj.status=='Pending'?'bg-red-400':'bg-green-400'} `}>
                                                            <text>{obj.status}</text>
                                                        </button>
                                                    } 
                                            </text>
                                            <div class='w-[25%] flex justify-center'>
                                                <button onClick={()=>ReadPDFFileinSupabase(obj.Email)} class='w-fit flex justify-center items-center bg-black/60 px-[1vw] py-[0.5vh] rounded-lg text-white'>
                                                    {
                                                        Loading==true?
                                                        <AiOutlineLoading class='animate-spin' color='white'/>
                                                        :
                                                        <text>Details</text>
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                        :
                                        [
                                            CustomerType=='All'?
                                            <div class='w-full px-[1vw] text-[0.95vw] space-x-[1vw] py-[1.5vh] border-b-[2px] border-gray-200  flex justify-between'>
                                                <text class='min-w-[25%] '>{obj.Email}</text>
                                                <text class='w-[25%] flex justify-center'>{obj.Price}</text>
                                                <text class='w-[25%] flex'>
                                                        {
                                                            obj.status=='Pending'?
                                                            <input type='file' accept='.pdf,.docx' onChange={(e)=>SavePDFFileinSupabase(e,obj.Email)} class={`w-fit flex space-x-[0.5vw] items-center px-[1vw] py-[0.5vh] rounded-lg text-white ${obj.status=='Pending'?'bg-red-400':'bg-green-400'} `}>
                                                            
                                                            </input>
                                                            :
                                                            <button class={`w-fit flex space-x-[0.5vw] items-center px-[1vw] py-[0.5vh] rounded-lg text-white ${obj.status=='Pending'?'bg-red-400':'bg-green-400'} `}>
                                                                <text>{obj.status}</text>
                                                            </button>
                                                        } 
                                                </text>
                                                <div class='w-[25%] flex justify-center'>
                                                    <button onClick={()=>ReadPDFFileinSupabase(obj.Email)} class='w-fit flex justify-center items-center bg-black/60 px-[1vw] py-[0.5vh] rounded-lg text-white'>
                                                    {
                                                        Loading==true?
                                                        <AiOutlineLoading class='animate-spin' color='white'/>
                                                        :
                                                        <text>Details</text>
                                                    }
                                                    </button>
                                                </div>
                                            </div>
                                            :
                                            <></>
                                        ]
                                    )
                                }
                            </div>
                        </div>
                        <div class='w-[30vw] h-fit flex flex-col bg-white rounded-xl shadow-md'>
                            <div class='w-full flex justify-between px-[1vw] py-[2vh]  rounded-t-xl '>
                                <text class='text-[1.1vw] font-semibold'>Traffic</text>
                            </div>
                            <div class='w-full flex justify-center items-center px-[1vw] py-[1vh]'>
                            <Chart
                            chartType="PieChart"
                            data={dataPie}
                            width='30vw'
                            height='30vh'
                            />
                            </div>
                        </div>
                    </div>
                </div>
            }
            
            
        </div>
    </div>
  )
}

export default AdminDashboard