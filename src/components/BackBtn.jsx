import React from 'react';
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const BackBtn = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigates one step back in history
  };

  return (
    <div className="backBtnBox cursor-pointer z-[99] absolute top-4 left-3">
      <div className="btnBack" onClick={handleBackClick}>
        <MdOutlineArrowBack className='text-xl'/>
      </div>
    </div>
  );
};

export default BackBtn;
