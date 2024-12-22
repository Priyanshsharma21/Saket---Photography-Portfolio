import React, { useEffect, useState } from 'react';
import { saketAIData } from "../constants/index.js";
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const SaketAISection3 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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

  const handleClick = () => {
    navigate("/saketai/asksaket");
  };

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

  return (
    <section
      ref={ref}
      className="w-full h-screen sticky top-0 flex section3 justify-center items-center z-30 bg-black"
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-100 saketAIVideo">
        <video
          className="w-full h-full object-cover"
          src="https://res.cloudinary.com/dmjswpxjb/video/upload/v1734715474/1220_iyvuqv.mp4"
          autoPlay
          loop
          muted
        />
      </div>

      <div
        className={`relative w-full section3Content z-100 flex flex-col items-center justify-center h-full duration-500`}
      >
        <div className="leftContentFit">
          <div className="overflow-hidden">
            <motion.div
              className="gradient-text saketAITitle text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-red-400"
              initial="hidden"
              animate={controls}
              custom={0}
              variants={revealMask}
            >
              {saketAIData.firGpt.title || "FitGPT"}
            </motion.div>
          </div>

          <div className="text-gray-200 mobDesc saketAISubtitle mt-1 text-center">
            {splitText(
              saketAIData.firGpt.subtitle || "Ask Saket AI Anything About Health & Fitness"
            )}
          </div>

          <div className="text-gray-200 saketAISubtitle mt-1 text-center mobileText">
          {splitText(
            saketAIData.firGpt.description ||
              "Need expert advice on fitness, nutrition, or mental health? Meet FitGPT – your personalized AI fitness mentor. Ask questions, get instant answers, and start your health journey with trusted AI-powered guidance."
          )}
        </div>
        </div>

        <div className="absolute top-[22%] desktopText right-[10%] saketAISubtitle leading-relaxed">
          {splitText(
            saketAIData.firGpt.description ||
              "Need expert advice on fitness, nutrition, or mental health? Meet FitGPT – your personalized AI fitness mentor. Ask questions, get instant answers, and start your health journey with trusted AI-powered guidance."
          )}
        </div>

        <div className="mt-auto mb-16 flex flex-col items-center inoutMain">
          <div
            className="relative w-96 bg-[#262324c9] text-gray-300 text-lg py-2 px-4 rounded-lg border border-gray-500 shadow-lg text-center showInput"
          >
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.5 }}
              className='inputChange'
            >
              {saketAIData.firGpt.questions[currentQuestionIndex]}
            </motion.div>
          </div>

          <button
            onClick={handleClick}
            className="mt-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:from-green-500 hover:to-green-700"
          >
            Ask Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default SaketAISection3;