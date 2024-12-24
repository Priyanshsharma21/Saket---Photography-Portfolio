import React, { useEffect, useState } from 'react';
import { BackBtn, Loader } from '../components';
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { aiQuestions } from '../constants';
import { motion } from "framer-motion"
const AskSaket = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestionIndex(
        (prevIndex) => (prevIndex + 1) % aiQuestions.length
      );
    }, 2000); // Change question every 2 seconds
    return () => clearInterval(interval);
  }, []);

  // Function to format the response
  const formatResponse = (text) => {
    const lines = text.split("\n"); // Split response into lines
    const formattedLines = [];
    
    let isNested = false;
  
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
      // Handle bullet points with italic and colored part (like *Pizza (1 slice, once a week):**)
      else if (line.startsWith("*")) {
        const boldText = line.match(/\*\*(.*?)\*\*/); // Find text inside **
        let formattedText = line.replace("*", "").trim();
  
        if (boldText) {
          formattedText = formattedText.replace(boldText[0], `<strong>${boldText[1]}</strong>`);
        }
  
        // Handle italic and color for parts like *Pizza (1 slice, once a week):**
        const italicAndColorText = formattedText.match(/^(.*?)(\*\*.*\*\*)$/);
  
        if (italicAndColorText) {
          // Apply italic and color only to the part like Pizza (1 slice, once a week):
          const partToItalicize = italicAndColorText[1];
          const restOfTheText = italicAndColorText[2];
  
          formattedText = `${partToItalicize} <span class="italic text-blue-500">${restOfTheText.replace(/\*\*/g, "")}</span>`;
        }
  
        formattedLines.push(
          <li key={`main-${index}`} className="mb-2 normalText" dangerouslySetInnerHTML={{ __html: formattedText }} />
        );
        isNested = false;
      }
      // Handle nested bullet points under main bullet points (e.g., * **Bench Press:** 3 sets of 8-12 reps, 60-90 sec rest)
      else if (line.startsWith("* **")) {
        formattedLines.push(
          <ul key={`nested-${index}`} className="list-disc pl-10">
            <li className="mb-2">
              <span className="font-bold normalText">
                {line.replace("* **", "").replace("**", "")}
              </span>
            </li>
          </ul>
        );
        isNested = true;
      }
      // Handle nested bullet points under the same list item (e.g., **word**)
      else if (isNested && line.startsWith("**")) {
        formattedLines.push(
          <ul key={`nested-item-${index}`} className="pl-10">
            <li className="mb-2">
              <span className="font-bold normalText">{line.replace(/\*\*/g, "")}</span>
            </li>
          </ul>
        );
      }
      // Handle strong text (e.g., **word** for emphasis)
      else if (line.includes("**")) {
        formattedLines.push(
          <p key={`strong-${index}`} className="mb-2 normalText">
            {line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}
          </p>
        );
      }
      // Handle regular text wrapped in <p> tag
      else {
        formattedLines.push(
          <p key={`text-${index}`} className="mb-2 normalText">
            {line}
          </p>
        );
      }
    });
  
    return formattedLines;
  };
  
  // Function to handle API call
  const handleQuery = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Saket Gokhale is a fitness expert and content creator known for his expertise in fitness, nutrition, and mental health. Respond in his knowledgeable and motivational style. Here is the question: ${userInput}. Generate the response as if Saket is talking to his followers, with all the knowledge he has.
      Now I'll tell you more about saket Gokhale, He always says his audience as dosto which means Friends. 
      He tries to explain things with example and in very simple words so it can be understand by even children, but also gives very detail explaination. you will generate a response which is like a friend talking to them and explaining them, casual tone but this should be in english so that it can be understand by whole world. Again the question is - ${userInput}
      `;

      const result = await model.generateContent(prompt);

      const formattedResponse = formatResponse(result.response.text() || "Couldn't fetch a response. Try again later.");
      setResponse(formattedResponse);
      setUserInput("")
      setLoading(false)
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse([<p>Error fetching response.</p>]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full overflow-auto flex flex-col justify-between items-center bg-gray-900 text-white">
      <div className="askSaket w-full p-4">
        <BackBtn />
      </div>

     <div className="w-full h-screen flex justify-center items-start absolute top-0">
        {loading ? (
            <Loader />
        ) : (
            <>
                <div className="aiResponse">
                    {response.length > 0 && (
                   <>
                   <div className="mt-4 p-4 bg-gray-800 rounded-md text-gray-300">
                        <ul className="list-disc pl-5">{response}</ul>
                    </div>


                    <motion.div 
                initial={{ x: "100%" }} // Start position (off-screen to the right)
                animate={{ x: 0 }} // Final position (original position)
                transition={{
                  type: "spring", // Smooth spring animation
                  stiffness: 100, // Adjust for speed
                  damping: 10, // Adjust for bounciness
                }}
                className='absolute bottom-0 right-2 mobileStyleImg'>
                  <img src="https://res.cloudinary.com/dmjswpxjb/image/upload/v1735044536/file_1_jhiygp.png" alt="" className="askSaketAIImg"/>
                </motion.div>
                   </>
                    )}
                </div>

                
            </>
        )}
     </div>

      <div className="w-11/12 max-w-2xl mb-6 askAiInputBox">
        <div className="w-full mb-4">
          <textarea
            className="w-full h-28 p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-[100px]"
            placeholder={aiQuestions[currentQuestionIndex]}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>

        <button
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium"
          onClick={handleQuery}
          disabled={loading}
        >
          {loading ? "Generating response..." : "Ask Saket"}
        </button>
      </div>
    </div>
  );
};

export default AskSaket;
