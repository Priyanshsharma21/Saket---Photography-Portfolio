import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { logo } from '../assets';
import { navItems } from '../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { Drawer } from 'antd';
import { About } from '../components'
import { motion } from 'framer-motion'



const Interface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState("/");
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const menuItems = document.querySelectorAll('.menuitem');
    const email = document.querySelector('.email');
    const aboutMenu = document.querySelector('.aboutmenu');

    const handleMouseEnter = (item) => {
      gsap.fromTo(
        item.children,
        { rotateY: 0 },
        {
          rotateY: 360,
          duration: 0.5,
          ease: 'power1.inOut',
          stagger: 0.1,
        }
      );
      menuItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.add('nonHovered');
          otherItem.classList.remove('hovered');
        } else {
          otherItem.classList.add('hovered');
          otherItem.classList.remove('nonHovered');
        }
      });
    };

    const handleMouseLeave = () => {
      menuItems.forEach((otherItem) => {
        otherItem.classList.remove('nonHovered');
        otherItem.classList.remove('hovered');
      });
    };

    menuItems.forEach((item) => {
      item.addEventListener('mouseenter', () => handleMouseEnter(item));
      item.addEventListener('mouseleave', handleMouseLeave);
    });

    email.addEventListener('mouseenter', () => {
      gsap.to('.emailline', {
        opacity: 1,
        scaleX: 1,
        duration: 0.5,
        ease: 'power1.inOut',
      });
    });

    email.addEventListener('mouseleave', () => {
      gsap.to('.emailline', {
        opacity: 0,
        scaleX: 0,
        duration: 0.5,
        ease: 'power1.inOut',
      });
    });

    aboutMenu.addEventListener('mouseenter', () => {
      gsap.to('.aboutline', {
        opacity: 1,
        scaleX: 1,
        duration: 0.5,
        ease: 'power1.inOut',
      });
    });

    aboutMenu.addEventListener('mouseleave', () => {
      gsap.to('.aboutline', {
        opacity: 0,
        scaleX: 0,
        duration: 0.5,
        ease: 'power1.inOut',
      });
    });

    return () => {
      menuItems.forEach((item) => {
        item.removeEventListener('mouseenter', () => handleMouseEnter(item));
        item.removeEventListener('mouseleave', handleMouseLeave);
      });
      email.removeEventListener('mouseenter', () => {});
      email.removeEventListener('mouseleave', () => {});
      aboutMenu.removeEventListener('mouseenter', () => {});
      aboutMenu.removeEventListener('mouseleave', () => {});
    };
  }, []);

  useEffect(() => {
    const saketAI = document.querySelector('.phone');
  
    saketAI.addEventListener('mouseenter', () => {
      gsap.to('.saketailine', {
        opacity: 1,
        scaleX: 1,
        duration: 0.5,
        ease: 'power1.inOut',
      });
    });
  
    saketAI.addEventListener('mouseleave', () => {
      gsap.to('.saketailine', {
        opacity: 0,
        scaleX: 0,
        duration: 0.5,
        ease: 'power1.inOut',
      });
    });
  
    return () => {
      saketAI.removeEventListener('mouseenter', () => {});
      saketAI.removeEventListener('mouseleave', () => {});
    };
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setPath("/");
    } else {
      setPath(location.pathname.toString().split("/")[2]);
    }
  }, [location.pathname]);

  const handleRedirect = (path) => {
    navigate(path);
  };

  const handleClick = ()=>{
    navigate("/saketai")
  }

  

  return (
    <div className="interface">
      <div
        className="logo"
        style={{ opacity: 1, transform: 'matrix(1, 0, 0, 1, 0, 0)' }}
      >
        <motion.div className="logo-main cursor-pointer" onClick={() => handleRedirect("/")}
        >
          <img src={logo} alt="logo" />
        </motion.div>
      </div>
      <nav className="navi">
        <div className="menu">
          <div className="menu-inner">
            {navItems.map((item) => (
              <div
                onClick={() => handleRedirect(`/gallerie/${item.path}`)}
                key={item.id}
                className={`menuitem ${path === item.path ? "active" : path === "/" ? "active" : "inactive"}`}
              >
                {item.title.split('').map((char, i) => (
                  <span key={i}>{char}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </nav>
      <div className="aboutmenu_wrapper" onClick={showDrawer}>
        <div
          className="aboutmenu font-semibold"
          style={{ opacity: 1, transform: 'matrix(1, 0, 0, 1, 0, 0)' }}
        >
          <div className="aboutword font-semibold">
            About &amp; {"に関しては"}
            <div className="aboutline" style={{ opacity: 0, transform: 'scaleX(0)', transformOrigin: 'center' }} />
          </div>
        </div>
      </div>

      <div className="aboutmenu_wrapper saketAIMobile" onClick={handleClick}>
        <div
          className="aboutmenu font-semibold"
        >
          <div className="aboutword font-semibold">
            Saket AI
            <div className="aboutline" style={{ opacity: 0, transform: 'scaleX(0)', transformOrigin: 'center' }} />
          </div>
        </div>
      </div>
      <a
        target="_blank"
        href="mailto:saket@monk-e.in"
        className="email font-semibold"
        style={{ opacity: 1, transform: 'matrix(1, 0, 0, 1, 0, 0)' }}
      >
        saket@monk-e.in
        <div className="emailline" style={{ opacity: 0, transform: 'scaleX(0)', transformOrigin: 'center' }} />
      </a>
      <div
  className="phoneWrapper"
  style={{ opacity: 1, transform: 'matrix(1, 0, 0, 1, 0, 0)' }}
>
  <div className="phone font-semibold cursor-pointer" onClick={handleClick}>
    Saket AI
    <div className="saketailine" style={{ opacity: 0, transform: 'scaleX(0)', transformOrigin: 'center' }} />
  </div>
</div>
      <div
        className="slogan"
        style={{ opacity: 1, transform: 'matrix(1, 0, 0, 1, 0, 0)' }}
      >
        <span className="font-normal">{"「心と体を映し出す、真の美しさを求めて」"}</span>
      </div>

      <Drawer 
      onClose={onClose} 
      open={open}
      width='100%'
      height='100%'
      >
        <About setOpen={setOpen}/>
      </Drawer>
    </div>
  );
};

export default Interface;
