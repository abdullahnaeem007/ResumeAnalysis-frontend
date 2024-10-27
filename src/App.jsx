import { Fragment, useEffect, useState } from 'react'
import './App.css'
import StripeCheckout from 'react-stripe-checkout'
import PizZip from 'pizzip'
import { DOMParser } from "@xmldom/xmldom";
import mammoth from 'mammoth';
import Navbar from './Components/Navbar';
import Homepage from './Pages/Homepage';
import Footer from './Components/Footer';
import Form from './Pages/Form';
import Form2 from './Pages/Form2';
import Form3 from './Pages/Form3';
import UploadPage from './Pages/UploadPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResultPage from './Pages/ResultPage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CompleteResume from './Pages/CompleteResume';
import WriteResume from './Pages/WriteResume';
import AdminDashboard from './Pages/AdminDashboard';
import UserDashboard from './Pages/UserDashboard';

function App() {

  // const [Product,setProduct]=useState({
  //   name:'Watch',
  //   price:250,
  //   description:'Smart Apple watch with features'
  // })

  // const [InfoArr,setInfoArr]=useState([])
  // const [InfoCheck,setInfoCheck]=useState(false)

  // const [ClichedArr,setClichedArr]=useState([])
  // const [ClichedCheck,setClichedCheck]=useState(false)

  // const [GrammerArr,setGrammerArr]=useState([])
  // const [GrammerCheck,setGrammerCheck]=useState(false)

  // const StripeAmount=Product.price*100

  // const public_key='pk_test_51NzduCChmFSf0SILSbkomFxaiWXvgaEn6xt2KKBZ76RFr6CbXrfucH00lTQXyoYq7VbDVt1C5HcCLlOIIYfxaaQj001N5VbGZT'

  // async function handleToken(token,addresses){
  //   try{
  //     const response=await fetch('http://localhost:3001/payment',{
  //       method:'POST',
  //       body:JSON.stringify({token:token,product:Product}),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })

  //     const result=await response.json()
  //     console.log(result)
  //   }
  //   catch(error){

  //   }
  // }

  // const [InputFile,setInputFile]=useState(null)
  // const [paragraphs,setparagraphs] = useState([]);
  // const [PageCount,setPageCount]=useState(0)

  // function str2xml(str) {
  //   if (str.charCodeAt(0) === 65279) {
  //     // BOM sequence
  //     str = str.substr(1);
  //   }
  //   return new DOMParser().parseFromString(str, "text/xml");
  // }

  // function getParagraphs(content) {
  //   const zip = new PizZip(content);
  //   const xml = str2xml(zip.files["word/document.xml"].asText());
  //   const paragraphsXml = xml.getElementsByTagName("w:p");
  //   const paragraphs = [];
  
  //   for (let i = 0, len = paragraphsXml.length; i < len; i++) {
  //     let fullText = "";
  //     const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
  //     for (let j = 0, len2 = textsXml.length; j < len2; j++) {
  //       const textXml = textsXml[j];
  //       if (textXml.childNodes) {
  //         fullText += textXml.childNodes[0].nodeValue;
  //       }
  //     }
  //     if (fullText) {
  //       paragraphs.push(fullText);
  //     }
  //   }
  //   return paragraphs;
  // }

  // function ResumeParserForDOCX(){
  //   const reader = new FileReader()
  //   reader.onload=(e)=>{
  //     const content = e.target.result
  //     const paragraphs=getParagraphs(content)
  //     setparagraphs(paragraphs)
  //   }

  //   reader.readAsBinaryString(InputFile)

  //   mammoth.extractRawText({ arrayBuffer: InputFile })
  //   .then(result => {
  //     const text = result.value;
  //     const estimatedPageCount = estimatePageCount(text);
  //     setPageCount(estimatedPageCount);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });

  // }

  // const estimatePageCount = (text) => {
  //   const charactersPerPage = 1800; // Adjust this value based on your content.
  //   const pageCount = Math.ceil(text.length / charactersPerPage);
  //   return pageCount;
  // }

  // async function ResumeParserForPDF(){
  //   const response = await fetch('http://localhost:3001/pdfParser', {
  //     method:'POST',
  //     body:InputFile,
  //     headers: 
  //     {
  //       'Content-Type': 'application/pdf',
  //     },
  //   });

  //   const sol = await response.json()
  //   setparagraphs(obj=>[...obj,sol.text])
  //   setPageCount(sol.pages)
  // }

  // async function GeneratePost()
  // {
  //   const res=await fetch('http://localhost:3001/chat',{
  //     method:'POST',
  //     body:JSON.stringify({chatarr:InfoArr}),
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //   })

  //   const sol = await res.json()
  //   setInfoCheck(true)
  //   setInfoArr(obj=>[...obj,sol.text])
  // }

  // async function GeneratePost2()
  // {
  //   const res=await fetch('http://localhost:3001/chat',{
  //     method:'POST',
  //     body:JSON.stringify({chatarr:ClichedArr}),
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //   })

  //   const sol = await res.json()
  //   setClichedCheck(true)
  //   setClichedArr(obj=>[...obj,sol.text])
  // }

  // async function GeneratePost3()
  // {
  //   const res=await fetch('http://localhost:3001/chat',{
  //     method:'POST',
  //     body:JSON.stringify({chatarr:GrammerArr}),
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //   })

  //   const sol = await res.json()
  //   setGrammerCheck(true)
  //   setGrammerArr(obj=>[...obj,sol.text])
  // }

  // async function SubmitResume(){
  //   setClichedArr([])
  //   setInfoArr([])
  //  if(InputFile.type=="application/pdf")
  //  {
  //   ResumeParserForPDF()
  //  }
  //  else
  //  {
  //   ResumeParserForDOCX()
  //  }
  
  // }

  // useEffect(()=>{
  //   if(paragraphs.length>0 && InfoCheck==false)
  //   {
  //     setInfoArr(obj=>[...obj,{role:'user',content:`Extract the following information from provided resume. \n Format: [Full Name]\n[Most Recent Employer]\n[Most Recent Professional Profession]\m[Contact Info]\n[Location]\n[Years of Experience]\n[Most Recent Education]\n[Management Score] \n Use this resume Information : ${JSON.stringify(paragraphs)}. `}])
  //     setClichedArr(obj=>[...obj,{role:'user',content:`Extract cliched words from the following resume. \n Use this resume Information : ${JSON.stringify(paragraphs)}`}])
  //     setGrammerArr(obj=>[...obj,{role:'user',content:`Extract grammar or spelling mistakes from the following resume. \nFormat: [Mistake 1],[Correction 1] \n [Mistake 2],[Correction 2] ... \n Use this resume Information : ${JSON.stringify(paragraphs)}`}])
  //   }
  // },[paragraphs])

  // useEffect(()=>{
  //   if(InfoArr.length>0 && InfoArr[InfoArr.length-1].role=='user' && InfoCheck==false)
  //   {
  //     GeneratePost()
  //   }
  // },[InfoArr])

  // useEffect(()=>{
  //   if(ClichedArr.length>0 && ClichedArr[ClichedArr.length-1].role=='user' && ClichedCheck==false)
  //   {
  //     GeneratePost2()
  //   }
  // },[ClichedArr])

  // useEffect(()=>{
  //   if(GrammerArr.length>0 && GrammerArr[GrammerArr.length-1].role=='user' && GrammerCheck==false)
  //   {
  //     GeneratePost3()
  //   }
  // },[GrammerArr])

  return (
    <div class='w-full min-h-screen'>
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route path='/' Component={Homepage}/>
            <Route path='/form1' Component={Form}/>
            <Route path='/form2' Component={Form2}/>
            <Route path='/form3' Component={Form3}/>
            <Route path='/upload' Component={UploadPage}/>
            <Route path='/result' Component={ResultPage}/>
            <Route path='/login' Component={Login}/>
            <Route path='/register' Component={Register}/>
            <Route path='/PayAnalysis' Component={CompleteResume}/>
            <Route path='/WriteResume' Component={WriteResume}/>
            <Route path='/AdminDashboard' Component={AdminDashboard}/>
            <Route path='/UserDashboard' Component={UserDashboard}/>
          </Routes>
        </Fragment>
      </BrowserRouter>
    </div>
  )
}

export default App


{/* <StripeCheckout
          stripeKey={public_key}
          label='Pay now'
          name='Pay with credit card'
          billingAddress
          shippingAddress
          amount={StripeAmount}
          description={`Your Amount is ${Product.price}`}
          token={handleToken}
        />
        <input type='file' accept='.docx,.pdf' onChange={(e)=>{setInputFile(e.target.files[0])}} />
        <button onClick={SubmitResume}>Submit</button>
        {/* {
          paragraphs.map(obj=>
            <text class='text-xs'>{obj}</text>
          )
        } */}
        // {PageCount}
        // {
        //   InfoArr.map((obj,index)=>
        //     index>0?
        //     <text class='whitespace-pre-wrap'>{obj.content}</text>  
        //     :
        //     <></>
        //   )
        // }
        // {
        //   ClichedArr.map((obj,index)=>
        //     index>0?
        //     <text class='whitespace-pre-wrap'>{obj.content}</text>  
        //     :
        //     <></>
        //   )
        // }
        // {
        //   GrammerArr.map((obj,index)=>
        //     index>0?
        //     <text class='whitespace-pre-wrap'>{obj.content}</text>  
        //     :
        //     <></>
        //   )
        // } */}