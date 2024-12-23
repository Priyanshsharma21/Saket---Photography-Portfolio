import { useEffect, useRef, useState } from 'react';
import { Preloader } from './components';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AskSaket, Calm, HealthCalculator, Home, SaketAI, WorkDetails } from './pages';
import Snowfall from 'react-snowfall';


const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pathName = useLocation();
  const audioRef = useRef(null);
  const [color, setColor] = useState("white");

  useEffect(() => {
    setIsLoading(true);

    const loadContent = async () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        window.scrollTo(0, 0);
      }, 2000);
    };

    loadContent();
  }, []);


  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://res.cloudinary.com/dfuketdb1/video/upload/v1730567304/My%20Manu%2011:11/travel/xc3n5o5wo2ec4xgoghua_1_dwdwfm.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.7;
      audioRef.current.play();
    } else {
      const currentPath = pathName.pathname.split("/")[2];
      const prevPath = pathName.pathname.split("/")[1];

      
      if (currentPath === 'chronicles' && prevPath==="gallerie") {
        setColor("white");
        audioRef.current.src = 'https://res.cloudinary.com/dmjswpxjb/video/upload/v1734941803/Sparkle_-_movie_ver._rjmrxf.mp3';

      } else if (currentPath === 'bodybuilding' && prevPath==="gallerie") {
        setColor("white");
        audioRef.current.src = 'https://res.cloudinary.com/dmjswpxjb/video/upload/v1734941758/Dream_lantern_p41upa.mp3';
      } else if (currentPath === 'impressionen' && prevPath==="gallerie") {
        setColor("white");
        audioRef.current.src = 'https://res.cloudinary.com/dmjswpxjb/video/upload/v1734941758/Frank_Tedesco_Roots_of_Hope_Original_t051jb.mp3';
      }else{
        setColor("#F98B57");
        audioRef.current.src = '';
      }

      audioRef.current.play().catch(error => console.error("Error playing audio:", error));
    }
  }, [pathName]);

  return (
    <>
        <AnimatePresence mode='wait'>
              {isLoading && <Preloader />}
          </AnimatePresence>
          <>
          <Snowfall
            style={{
              position: 'fixed',
              width: '100vw',
              height: '100vh',
              zIndex: 9999999
            }}
            snowflakeCount={11}
            color={color}
          />
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="/gallerie/:id" element={<WorkDetails />} />
              <Route path="/saketai" element={<SaketAI />} />
              <Route path="/saketai/asksaket" element={<AskSaket />} />
              <Route path="/saketai/hcal" element={<HealthCalculator />} />
              <Route path="/saketai/calm" element={<Calm />} />
            </Routes>
          </>
    </>
  );
};

export default App;
