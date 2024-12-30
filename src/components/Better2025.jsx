import React from 'react'
import { FiTarget } from "react-icons/fi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const Better2025 = () => {
    const navigate = useNavigate()

    const handleClick = ()=>{
        navigate("/saketai/better2025")
    }
    
  return (
    <div className='w-full h-screen snap z-[9999] bg-black sticky top-0
    group bg-gradient-to-br from-pink-900/50 to-black p-6 rounded-xl border border-pink-500/20 hover:border-pink-500/50 transition-all md:col-span-2 lg:col-span-2
    '>
        <div className="w-full h-screen flex justify-center items-center flex-col">
            <h3 className="to5">AIM 2025</h3>
            <p className="text-gray-400 mb-6 to5desc">Enter your goal, Get personalized 6 month structured roadmap to follow.</p>

            <div onClick={handleClick} className="tryNowBtn flex items-center bg-black sticky top-0
    group bg-gradient-to-br from-pink-900/50 to-black p-6 rounded-xl border border-pink-500/20 hover:border-pink-500/50">
                <div>
                Try Now
                </div>
                <FaLongArrowAltRight className='ml-2'/>
            </div>
        </div>
    </div>
  )
}

export default Better2025