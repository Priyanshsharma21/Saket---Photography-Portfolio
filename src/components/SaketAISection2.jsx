import React, { useEffect } from 'react';
import { saketAIData } from "../constants/index.js";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SaketAISection2 = () => {
  const revealMask = {
    hidden: { y: "100%" },
    visible: (i) => ({
      y: "0%",
      transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: i * 0.1 },
    }),
  };

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger only once when in view
    threshold: 0.2, // Trigger when 20% of the section is visible
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const splitText = (text) =>
    text.split(" ").map((word, i) => (
      <div key={i} className="overflow-hidden inline-block text-center">
        <motion.div
          className="inline-block ml-1 sai_description text-center"
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
      className="w-full bg-black snap sticky top-0 flex flex-col justify-center items-center h-screen saketGlass z-10
      
      "
    >
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
        src="https://res.cloudinary.com/dmjswpxjb/video/upload/v1734717679/1220_1_alt5gn.mp4"
        autoPlay
        loop
        muted
      />
      {saketAIData.heroBanner.description.split("\n").map((sentence, i) => (
        <div key={i} className="w-full text-center overflow-hidden">
          {splitText(sentence)}
        </div>
      ))}
    </section>
  );
};

export default SaketAISection2;
