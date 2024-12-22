import React, { useEffect, useState } from 'react';
import { saketAIData } from "../constants/index.js";
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const SaketAISection4 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger only once when in view
    threshold: 0.2,  // Trigger when 20% of the section is visible
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestionIndex(
        (prevIndex) => (prevIndex + 1) % saketAIData.firGpt.questions.length
      );
    }, 2000); // Change question every 2 seconds
    return () => clearInterval(interval);
  }, []);

  // Animation variants for reveal mask
  const revealMask = {
    hidden: { y: "100%" },
    visible: (i) => ({
      y: "0%",
      transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: i * 0.02 },
    }),
  };

  const splitText = (text) => text.split(" ").map((word, i) => (
    <div key={i} className="overflow-hidden inline-block">
      <motion.div
        className="inline-block ml-1"
        variants={revealMask}
        custom={i}
        initial="hidden"
        animate={controls}
      >
        {word}
      </motion.div>
    </div>
  ));

  const handleRedirect = ()=>{
    navigate("/saketai/hcal");
  }

  return (
    <section
      ref={ref}
      className="w-full h-screen sticky top-0 flex justify-center items-center z-30 bg-black"
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-100">
        <video
          className="w-full h-full object-cover saketAIVideo"
          src="https://res.cloudinary.com/dmjswpxjb/video/upload/v1734717679/1220_1_alt5gn.mp4"
          autoPlay
          loop
          muted
        />
      </div>

      <div
        className={`relative w-full section3Content z-100 flex flex-col items-center justify-center h-full duration-500`}
      >
        <div className="leftContentFit">
          <div className="overflow-hidden calculatorWidth">
            <motion.div
              className="gradient-text saketAITitle2 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400"
              initial="hidden"
              animate={controls}
              custom={0}
              variants={revealMask}
            >
              Health
            </motion.div>
          </div>
          <div className="overflow-hidden calculatorWidth">
            <motion.div
              className="gradient-text saketAITitle2 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400"
              initial="hidden"
              animate={controls}
              custom={0}
              variants={revealMask}
            >
              Calculator
            </motion.div>
          </div>

          <div className="text-gray-200 saketAISubtitle mobDesc mt-5 text-center">
          {splitText(
            saketAIData.healthCalculator.description
          )}
          </div>

          <div 
          onClick={handleRedirect} className="calculatorBtn mt-5 cursor-pointer bg-gradient-to-r from-yellow-400 to-red-400 text-black p-3 rounded-md font-medium">
            Calculate Now
          </div>
        </div>

        <div className="absolute top-[22%] right-[10%] cardsMob">
        <div className="grid gap-8 max-w-xl">
        {saketAIData.healthCalculator.questions.map((item, index) => (
          <div
            key={index}
            className="relative cardAI group border-4 rounded-lg p-6 cursor-pointer"
            style={{
              borderImage: "linear-gradient(to right, yellow, red) 1",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === index ? (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-90">
                <video
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                  src={item.video}
                  autoPlay
                  loop
                  muted
                />
                <p className="text-white saketAISubtitle2 ml-4 mt-2 mb-4 font-medium relative z-20">
                  {item.description}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400">
                  {item.title}
                </h2>
              </div>
            )}
          </div>
        ))}
      </div>
        </div>
        
      </div>

      
    </section>
  );
};

export default SaketAISection4;