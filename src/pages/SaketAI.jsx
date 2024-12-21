import React, { useEffect, useState } from 'react';
import { saketAIData } from "../constants/index.js";
import { motion } from 'framer-motion';
import BackBtn from '../components/BackBtn.jsx';
import SaketAISection1 from '../components/SaketAISection1.jsx';
import SaketAISection2 from '../components/SaketAISection2.jsx';
import SaketAISection3 from '../components/SaketAISection3.jsx';
import SaketAISection4 from '../components/SaketAISection4.jsx';

const SaketAI = () => {

  
  return (
    <main className="w-full sai h-full overflow-auto">
     <BackBtn />
      <SaketAISection1 />
      <SaketAISection2 />
      <SaketAISection3 />
      <SaketAISection4 />
    </main>
  );
};

export default SaketAI;
