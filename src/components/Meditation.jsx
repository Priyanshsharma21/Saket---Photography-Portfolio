import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../pages/Calm.css"

const Meditation = () => {
    const navigate = useNavigate()

    const handleRedirect = ()=>{
        navigate("/saketai/calm");
    }
  return (
    <div className='w-full h-screen snap z-[9999] bg-black sticky top-0'>
     <div className="absolute top-0 left-0 w-full h-full opacity-100">
        <video
          className="w-full h-full object-cover saketAIVideo meditationVideo"
          src="https://res.cloudinary.com/dmjswpxjb/video/upload/v1734965132/209313_tiny_ojogpi.mp4"
          autoPlay
          loop
          muted
        />
      </div>

      <div
        className={`relative w-full section3Content z-100 flex flex-col items-center justify-center h-full duration-500`}
      >
        <div className='w-full h-screen flex flex-col items-end justify-center text-right meditateWithSaket'>
          <h1>Meditate</h1>
          <h1>With</h1>
          <h1>Saket</h1>
        </div>
        <div onClick={handleRedirect} className="calculatorBtn mt-5 cursor-pointer bg-gradient-to-r from-yellow-400 to-red-400 text-black p-3 rounded-md font-medium uppercase absolute bottom-10 right-10">Start Now</div>
      </div>
    </div>
  )
}

export default Meditation