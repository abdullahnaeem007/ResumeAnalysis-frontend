import React from 'react'
import {BiLogoFacebook, BiLogoInstagram, BiLogoLinkedin, BiLogoTwitter} from 'react-icons/bi'

function Footer() {
  return (
    <div class='w-full h-fit flex flex-col space-y-[5vh] items-center px-[8vw] pt-[8vh] pb-[5vh] shadow-2xl font-Poppins shadow-[#1B5BFF] rounded-2xl'>
        <div class='w-full h-fit flex'>
            <div class='w-1/4 flex flex-col space-y-[5vh]'>
                <text class='font-semibold text-[1.5vw]'>ResumeAnalysis.<text class='text-[#1B5BFF]'>ai</text></text>
                <text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</text>
                <text>@Lorem</text>
            </div>
            <div class='w-1/4 flex flex-col items-center space-y-[5vh]'>
                <text class='font-semibold text-[1.3vw]'>About Us</text>
                <div class='flex flex-col space-y-[1vh]  '>
                    <text>Lorem</text>
                    <text>Portfolio</text>
                    <text>Career</text>
                    <text>Contact us</text>
                </div>
            </div>
            <div class='w-1/4 flex flex-col space-y-[5vh]'>
                <text class='font-semibold text-[1.3vw]'>Contact Us</text>
                <div class='flex flex-col space-y-[1vh]  '>
                    <text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</text>
                    <text>+908 89097 890</text>
                </div>
            </div>
            <div class='w-1/4 flex space-x-[2vw]'>
                <div class='w-fit h-fit p-[1.5vh] rounded-full shadow-lg'>
                    <BiLogoFacebook size='1.2rem'/>
                </div>
                <div class='w-fit h-fit p-[1.5vh] rounded-full shadow-lg'>
                    <BiLogoInstagram size='1.2rem'/>
                </div>
                <div class='w-fit h-fit p-[1.5vh] rounded-full shadow-lg'>
                    <BiLogoTwitter size='1.2rem'/>
                </div>
                <div class='w-fit h-fit p-[1.5vh] rounded-full shadow-lg'>
                    <BiLogoLinkedin size='1.2rem'/>
                </div>
            </div>
        </div>
        <div class='w-full flex justify-center '>
            <div class='w-[65%] h-[0.8px] bg-[#D2D2D2]'>

            </div>
        </div>
        <text class='text-[#928D8D] text-[0.9vw]'>Copyright ® 2021 Lorem All rights Rcerved</text>
    </div>
  )
}

export default Footer