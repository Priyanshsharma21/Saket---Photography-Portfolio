import React, { useEffect, useRef, useState } from 'react';
import { lofiArray } from '../constants';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { BackBtn } from '../components';
import { Modal } from 'antd';
import "./Calm.css"

const Calm = () => {
    const audioRefs = useRef([]);
    const [volumes, setVolumes] = useState(Array(lofiArray.length).fill(0.5));
    const [activeCards, setActiveCards] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
    const navigate = useNavigate();

    // Show modal after 1 second
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsModalVisible(true);
        }, 1000);

        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, []);

    const togglePlay = (index) => {
        const audio = audioRefs.current[index];

        if (audio.paused) {
            audio.play();
            setActiveCards([...activeCards, index]);
        } else {
            audio.pause();
            setActiveCards(activeCards.filter((cardIndex) => cardIndex !== index));
        }
    };

    const changeVolume = (index, value) => {
        const audio = audioRefs.current[index];
        audio.volume = value;
        const newVolumes = [...volumes];
        newVolumes[index] = value;
        setVolumes(newVolumes);
    };

    const handleVolumeClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="calm-overview overflow-auto">
            <div className="w-full p-4">
                <BackBtn />
            </div>

            {/* Ant Design Modal */}
            <Modal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                className='w-[100vw] h-[50vh]'
            >
                <div className="modalContent">
                    <div className="meditateWithMe flex justify-center gradient-text  text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400 ">
                        Meditate With Me
                    </div>
                    <div className='note_description w-full text-center'>
                        Each card contains relaxing nature sounds. You can play multiple sounds at once to create a custom meditative and relaxing environment for yourself and adjust the volume of each sound. Example - 
                    </div>
                    <div className="flex justify-center">
                        <span className="node_description2 rounded-sm text-[#121212]">
                            Rain + Bird + Ocean + Flute
                        </span>
                    </div>
                </div>
            </Modal>

            <div className="calm-overview-outer">
                <div className="flex flex-wrap justify-center items-center main_lofi">
                    {lofiArray?.map((item, index) => (
                        <div
                            key={item.id}
                            meratitle={item.title}
                            onClick={() => togglePlay(index)}
                            className={`m-10 loficard flex flex-col justify-center items-center w-[300px] h-[300px] relative ${
                                activeCards.includes(index) ? `active${index}` : ''
                            }`}
                        >
                            <img
                                src={item.pic}
                                alt="images"
                                className="w-full h-full object-cover rounded-xl cursor-pointer img_main"
                            />
                            <audio
                                ref={(ref) => (audioRefs.current[index] = ref)}
                                src={item.music}
                                loop
                                onPause={() => console.log(`Audio ${index} paused`)}
                                onEnded={() => console.log(`Audio ${index} ended`)}
                            />
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                className="absolute custom-range"
                                value={volumes[index]}
                                onChange={(e) => changeVolume(index, parseFloat(e.target.value))}
                                onClick={handleVolumeClick}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calm;
