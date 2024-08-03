import { motion } from 'framer-motion';
import { slideUp } from '../utils/index.js';
import { s } from '../assets';

const Preloader = () => {

  return (
    <motion.div 
      variants={slideUp} 
      initial="initial" 
      exit="exit" 
      className="preloader-introduction w-full h-screen flex justify-center items-center"
    >
      <motion.div className="preloader-img">
        <img src={s} alt="preloader" className="preloader-img-main" />
      </motion.div>
    </motion.div>
  );
}

export default Preloader;
