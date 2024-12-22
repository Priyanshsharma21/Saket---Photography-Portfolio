import React, { useState } from 'react';
import { BackBtn, Loader } from '../components';
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AskSaket = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to format the response
  const formatResponse = (text) => {
    const lines = text.split("\n"); // Split response into lines
    const formattedLines = [];
    let isNested = false;
  
    lines.forEach((line, index) => {
      if (line.startsWith("* **")) {
        // Handle nested bullet points
        formattedLines.push(
          <ul key={`nested-${index}`} className="list-disc pl-10">
            <li className="mb-2">
              <span className="font-bold">{line.replace("* **", "").replace("**", "")}</span>
            </li>
          </ul>
        );
        isNested = true;
      } else if (line.startsWith("*")) {
        // Handle main bullet points
        formattedLines.push(
          <li key={`main-${index}`} className="mb-2">
            {line.replace("*", "").trim()}
          </li>
        );
        isNested = false;
      } else if (isNested && line.startsWith("**")) {
        // Continue nested points under the same bullet
        formattedLines.push(
          <li key={`sub-${index}`} className="mb-2 pl-10">
            <span className="font-bold">{line.replace(/\*\*/g, "")}</span>
          </li>
        );
      } else {
        // Handle paragraphs or other text
        formattedLines.push(
          <p key={`text-${index}`} className="mb-2">
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

      const prompt = `Saket Gokhale is a fitness expert and content creator known for his expertise in fitness, nutrition, and mental health. Respond in his knowledgeable and motivational style. Here is the question: ${userInput}. Generate the response as if Saket is talking to his followers, with all the knowledge he has.`;

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
                    <div className="mt-4 p-4 bg-gray-800 rounded-md text-gray-300">
                        <h2 className="text-lg font-bold text-white">{"Saket AI's Response:"}</h2>
                        <ul className="list-disc pl-5">{response}</ul>
                    </div>
                    )}
                </div>
            </>
        )}
     </div>

      <div className="w-11/12 max-w-2xl mb-6 askAiInputBox">
        <div className="w-full mb-4">
          <textarea
            className="w-full h-28 p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-[100px]"
            placeholder="Best exercise for building Chest?"
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
