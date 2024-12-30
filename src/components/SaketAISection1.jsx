import React, { useEffect, useState } from 'react';
import { saketAIData } from "../constants/index.js";
import { motion } from 'framer-motion';

const SaketAISection1 = () => {
    const revealMask = {
        initial: { y: "100%" },
        animate: (i) => ({
          y: "0%",
          transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: i * 0.2 },
        }),
      };
  return (
    <section className="sai_banner snap sticky bg-black top-0 w-full h-screen">
    <video
      className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
      src="https://res.cloudinary.com/dmjswpxjb/video/upload/v1734444089/1217_kprmkm.mp4"
      autoPlay
      loop
      muted
    />

    <div
      className={`relative section1Content z-10 flex flex-col items-center justify-center h-full transition-opacity duration-500`}
    >
      <div className="w-full overflow-hidden">
        <motion.div
          custom={1}
          variants={revealMask}
          initial="initial"
          animate="animate"
        >
          <motion.h1 className="sai_hero_heading text-center">
            {saketAIData.heroBanner.title}
          </motion.h1>
        </motion.div>
      </div>

      <div className="w-full overflow-hidden">
        <motion.div
          custom={2}
          variants={revealMask}
          initial="initial"
          animate="animate"
        >
          <motion.p className="sai_hero_subheading text-center">
            {saketAIData.heroBanner.subtitle}
          </motion.p>
        </motion.div>
      </div>
    </div>
  </section>
  )
}

export default SaketAISection1