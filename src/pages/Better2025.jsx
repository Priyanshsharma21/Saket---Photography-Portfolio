import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BackBtn, Loader } from '../components';

const Better2025 = () => {
    const [showResult, setShowResult] = useState(false);
    const [response, setResponse] = useState('');
    const [goal, setGoal] = useState('');
    const [loading, setLoading] = useState(false);

    const formatResponse = (text) => {
        const lines = text.split("\n"); // Split response into lines
        const formattedLines = [];
    
        lines.forEach((line, index) => {
            // Handle main headings (e.g., # Introduction)
            if (line.startsWith("# ")) {
                formattedLines.push(
                    <h1 key={`h1-${index}`} className="text-2xl font-bold mb-2 sabHead calcHead">
                        {line.replace("# ", "")}
                    </h1>
                );
            }
            // Handle sub-headings (e.g., ## Day 1: Push)
            else if (line.startsWith("## ")) {
                formattedLines.push(
                    <h2 key={`h2-${index}`} className="text-xl font-semibold mb-2 sabHead calcSubHead">
                        {line.replace("## ", "")}
                    </h2>
                );
            }
            // Handle smaller sub-headings (e.g., ### Meal 1 (Breakfast - 7:00 AM))
            else if (line.startsWith("### ")) {
                formattedLines.push(
                    <h3 key={`h3-${index}`} className="text-lg font-medium mb-2 sabHead calcSubHead2">
                        {line.replace("### ", "")}
                    </h3>
                );
            }
            // Handle bold headings (e.g., **1. Goal Breakdown:**)
            else if (line.startsWith("**") && line.endsWith("**")) {
                formattedLines.push(
                    <h3 key={`bold-h3-${index}`} className="text-lg font-bold mb-2 sabHead">
                        {line.replace(/\*\*/g, "").trim()}
                    </h3>
                );
            }
            // Handle bullet points (e.g., * Run 3 times a week)
            else if (line.startsWith("* ")) {
                formattedLines.push(
                    <li key={`li-${index}`} className="list-disc ml-5 mb-2 normalText">
                        {line.replace("* ", "").trim()}
                    </li>
                );
            }
            // Handle strong text (e.g., **word** for emphasis)
            else if (line.includes("**")) {
                formattedLines.push(
                    <p key={`strong-${index}`} className="mb-2 normalText">
                        {line.replace(/\*\*(.*?)\*\*/g, "")}
                    </p>
                );
            }
            // Handle regular text wrapped in <p> tag
            else {
                formattedLines.push(
                    <p key={`text-${index}`} className="mb-2 normalText">
                        {line.trim()}
                    </p>
                );
            }
        });
    
        return formattedLines
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = `
            You are the world’s most skilled and empathetic life coach and career consultant. I want to design a customized daily routine from the ground up to achieve a specific goal within the next six months. Here’s my goal: ${goal}. Please use your expertise to craft a routine that is practical, actionable, and perfectly aligned with my aspirations. Ensure the following elements are addressed:

            1. Goal Breakdown: Break my goal into detailed, achievable milestones and actionable steps. Prioritize these based on importance, urgency, and impact.
            2. Structured Routine: Design a daily schedule divided into clear time blocks (morning, afternoon, evening) that maximize productivity, focus, and alignment with my natural energy levels.
            3. Habits and Strategies: Suggest evidence-based habits, mindset shifts, and strategies to build consistency and maintain motivation throughout the process.
            4. Balance and Well-being: Include time for rest, relaxation, and self-care while allowing for flexibility to adapt to unforeseen challenges.
            5. Review Process: Propose a structured weekly review and reflection practice to track progress, celebrate wins, and refine the routine as needed.
            6. Personalization: Consider my personality, preferences, lifestyle, and any challenges or constraints I've shared'.
            
            The routine should be realistic yet ambitious, with measurable steps to ensure consistent progress toward my goal while fostering growth, balance, and resilience.
            `;

            const result = await model.generateContent(prompt);

            console.log(result.response.text())

                const formattedResponse = formatResponse(result.response.text() || "Couldn't fetch a response. Try again later.");
                setResponse(formattedResponse);
                setGoal("")
                setShowResult(true)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
                setShowResult(false)
            }finally{
                setLoading(false)
            }
        };

    const handleGenerateAgain = () => {
        setResponse('');
        setShowResult(false);
        setGoal('');
    };

    return (
        <div className="w-full h-screen z-[9999] bg-black group bg-gradient-to-br from-pink-900/50 to-black p-6 rounded-xl border border-pink-500/20 hover:border-pink-500/50">

        <div className="w-full p-4">
            <BackBtn />
        </div>

        {loading ? (
            <div className="w-full h-screen flex justify-center items-center">
                <Loader />
            </div>
        ): (
            <>
                {response.length > 0 ? (
                    <>
                    <div className="w-full h-screen flex justify-center items-start mt-6 responseTree">
                        <div className="w-[95vw] h-[80vh] p-5 bg-[#3d3d3da4] rounded-xl overflow-scroll overflow-x-auto
                        ">
                                <ul className="list-disc pl-5">{response}</ul>
                            </div>
                    </div>

                    <button
                        type="button"
                        className="bg-blue-500 fixed bottom-5 right-5 text-black px-4 py-2 rounded bg-gradient-to-r from-blue-400 to-pink-400"
                        onClick={handleGenerateAgain}
                    >
                        Try Again
                    </button>
                    </>
                ):(
                    <div className="flex flex-col items-center justify-center w-full h-full">
                    <label htmlFor="goal" className="text-white text-xl mb-4 labelML">
                        Enter Your Goal + Preferences/Constraints :
                    </label>
                    <textarea
                        id="goal"
                        value={goal}
                        required
                        onChange={(e) => setGoal(e.target.value)}
                        placeholder="Improve my mindset and become best version of myself."
                        className="w-[90%] max-h-[300px] md:w-[50%] p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500 bg-[#12121200] border-pink-500/100 hover:border-pink-500/50"
                        rows="4"
                    ></textarea>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-blue-400 to-pink-400 text-black px-6 py-3 mt-4 rounded-lg text-lg gradBtn25"
                    >
                        {loading ? 'Generating...' : 'Generate Routine'}
                    </button>
                </div>
                )}
            </>
        )}
        </div>
    );
};

export default Better2025;
