import React, { useEffect, useState } from 'react'
import { habitData } from '../constants';
import moment from "moment"
const HabitBuilder = () => {
    const [task, setTask] = useState(null);
    const [isScratched, setIsScratched] = useState(false);

    useEffect(() => {
        const canvasElement = document.getElementById("scratch");
        const canvasContext = canvasElement.getContext("2d");
        let isDragging = false;

        const initializeCanvas = () => {
            const gradient = canvasContext.createLinearGradient(0, 0, 300, 300);
            gradient.addColorStop(0, "#d63031");
            gradient.addColorStop(1, "#fdcb6e");
            canvasContext.fillStyle = gradient;
            canvasContext.fillRect(0, 0, 300, 300);

            // Randomly select a task
            const randomTask = habitData[Math.floor(Math.random() * habitData.length)];
            setTask(randomTask);
        };

        const scratch = (x, y) => {
            canvasContext.globalCompositeOperation = "destination-out";
            canvasContext.beginPath();
            canvasContext.arc(x, y, 20, 0, 2 * Math.PI);
            canvasContext.fill();
        };

        const getMouseCoordinates = (event) => {
            const rect = canvasElement.getBoundingClientRect();
            const x = (event.pageX || event.touches[0].pageX) - rect.left;
            const y = (event.pageY || event.touches[0].pageY) - rect.top;
            return { x, y };
        };

        const handleMouseDown = (event) => {
            isDragging = true;
            const { x, y } = getMouseCoordinates(event);
            scratch(x, y);
        };

        const handleMouseMove = (event) => {
            if (isDragging) {
                event.preventDefault();
                const { x, y } = getMouseCoordinates(event);
                scratch(x, y);
            }
        };

        const handleMouseUp = () => {
            isDragging = false;
            setIsScratched(true);
        };

        canvasElement.addEventListener("mousedown", handleMouseDown);
        canvasElement.addEventListener("mousemove", handleMouseMove);
        canvasElement.addEventListener("mouseup", handleMouseUp);

        initializeCanvas();

        // Cleanup
        return () => {
            canvasElement.removeEventListener("mousedown", handleMouseDown);
            canvasElement.removeEventListener("mousemove", handleMouseMove);
            canvasElement.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return (
        <div className='w-full h-screen z-[999] snap bg-black sticky top-0
        group bg-gradient-to-br from-blue-900/50 to-black p-6  hover:border-blue-500/50 transition-all
        '>
            <div className="scratch-container">
            <header>
                <h1>Tiny Tiny Habits can take you to your goals</h1>
                <p>Become 1% better every day</p>
            </header>
            <div className="scratch-card">
                {!isScratched ? (
                    <canvas className="scratchCanvas" id="scratch"></canvas>
                ) : (
                    <div className="task-reveal">
                        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400">{task?.title}</h2>
                        <p>{task?.description}</p>
                        <div className="date bg-gradient-to-r from-yellow-400 to-red-400 rounded-lg text-[#e2e2e2]">{moment(new Date().toLocaleDateString()).format('LL')}</div>
                    </div>
                )}
            </div>
            <footer className="relative">{"( Scratch the card to reveal today's task )"}</footer>
        </div>
        </div>
    );
}

export default HabitBuilder