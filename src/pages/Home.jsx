import React, { useEffect, useRef } from 'react';
import withContainer from '../hof/Hof';
import { useAnimeContext } from '../context/animeContext';
import Tilt from "react-parallax-tilt";

const Home = () => {
  const { setPathName } = useAnimeContext();
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    setPathName('/');
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.src = 'https://cdn.sanity.io/images/s9olv7lh/production/2a4c97615001a7ba6aa5f77d405ea8d13c0e0bc8-2364x1330.png';

    img.onload = () => {
      imageRef.current = img;
      drawImageFitToCanvas(ctx, img, canvas.width, canvas.height);
    };

    const drawImageFitToCanvas = (ctx, img, canvasWidth, canvasHeight) => {
      const aspectRatio = img.width / img.height;
      let drawWidth, drawHeight;
      if (canvasWidth / aspectRatio < canvasHeight) {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / aspectRatio;
      } else {
        drawWidth = canvasHeight * aspectRatio;
        drawHeight = canvasHeight;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, (canvasWidth - drawWidth) / 2, (canvasHeight - drawHeight) / 2, drawWidth, drawHeight);
    };

    const circleRadius = 150; 
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    const easingFactor = 0.04; 

    let blurEffect = false;
    let lastSwitchTime = Date.now();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawImageFitToCanvas(ctx, img, canvas.width, canvas.height);

      ctx.globalAlpha = 0.9; 
      ctx.filter = 'blur(10px)';
      drawImageFitToCanvas(ctx, img, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.filter = 'none';

      const dx = targetX - mouseX;
      const dy = targetY - mouseY;
      mouseX += dx * easingFactor;
      mouseY += dy * easingFactor;

      if (Date.now() - lastSwitchTime >= (blurEffect ? 1000 : 2000)) {
        blurEffect = !blurEffect;
        lastSwitchTime = Date.now();
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, circleRadius, 0, 2 * Math.PI);
      ctx.clip();
      if (blurEffect) {
        ctx.filter = 'blur(3px)'; 
      } else {
        ctx.filter = 'none'; 
      }
      ctx.translate(mouseX, mouseY);
      const scale = blurEffect ? 1.05 : 1; 
      ctx.scale(scale, scale);
      ctx.translate(-mouseX, -mouseY);
      drawImageFitToCanvas(ctx, img, canvas.width, canvas.height);
      ctx.restore();

      requestAnimationFrame(draw);
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    draw();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="home overflow-hidden">
     {/* <Tilt
     tiltAxis={"y"}
          className="background-stripes track-on-window"
          tiltReverse={true}
          trackOnWindow={true}
          tiltMaxAngleX={4}  // Reduced tilt angle on X-axis
  tiltMaxAngleY={4}  // Reduced tilt angle on Y-axis
  transitionSpeed={1000} // Smooth transition speed (optional)
        > */}
           <div className="home-inner">
     
     <div className="mobile-main-bg" />
     <canvas
     className='canvas-main'
       ref={canvasRef}
       width={window.innerWidth}
       height={window.innerHeight}
       style={{
         touchAction: 'none',
         position: 'absolute',
         display: 'block',
         cursor: 'inherit',
         transition: 'transform 0.2s linear' 
       }}
     />
     <div className="canvasOverlay" style={{ opacity: 0 }} />
   </div>
        {/* </Tilt> */}
     
    </div>
  );
};

export default withContainer(Home);
