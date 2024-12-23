import React, { useState } from 'react';
import { BackBtn, Loader } from '../components';
import { gptsPrompt, promptStructure } from '../constants';
import { GoogleGenerativeAI } from "@google/generative-ai";


const fields = [
  { name: 'fitnessLevel', label: 'Fitness Level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], placeholder: '' },
  { name: 'height', label: 'Height', type: 'text', placeholder: 'e.g., 5 feet 11 inch' },
  { name: 'weight', label: 'Weight', type: 'text', placeholder: 'e.g., 74kg' },
  { name: 'goalWeight', label: 'Goal Weight', type: 'text', placeholder: 'e.g., 70kg' },
  { name: 'age', label: 'Age', type: 'number', placeholder: 'e.g., 25' },
  { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Others'], placeholder: '' },
  { name: 'howManyWorkouts', label: 'Workouts per Week', type: 'range', min: 1, max: 7, placeholder: '' },
  { name: 'whereWorkout', label: 'Workout Location', type: 'select', options: ['Gym', 'Home Workout'], placeholder: '' },
  { name: 'topGymGoal', label: 'Primary Goal', type: 'select', options: ['Lose weight', 'Gain weight', 'Body recomposition', 'Lean and tone body'], placeholder: '' },
  { name: 'secondGymGoal', label: 'Secondary Goal', type: 'select', options: ['Lose weight', 'Gain weight', 'Body recomposition', 'Lean and tone body'], placeholder: '' },
  { name: 'sleep', label: 'Sleep', type: 'text', placeholder: 'e.g., 7-8 hours' },
  { name: 'medicalHistory', label: 'Medical History', type: 'textarea', placeholder: 'e.g., Diabetes, Hypertension' },
  { name: 'stressLevel', label: 'Stress Level', type: 'range', min: 0, max: 5, placeholder: '' },
  { name: 'bodyType', label: 'Body Type', type: 'select', options: ['Ectomorph (Low fat, skinny)', 'Mesomorph (Muscular, well-built)', 'Endomorph (High fat, rounded)'], placeholder: '' },
  { name: 'dietaryPreference', label: 'Dietary Preference', type: 'select', options: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Ovo Vegetarian (Veg + Egg)'], placeholder: '' },
  { name: 'location', label: 'Location', type: 'text', placeholder: 'e.g., Bangalore, India' },
  { name: 'allergies', label: 'Allergies (if any)', type: 'textarea', placeholder: 'e.g., Milk, Curd' },
  { name: 'waterIntake', label: 'Water Intake', type: 'text', placeholder: 'e.g., 2.5 liters' },
  { name: 'mealFrequency', label: 'Meal Frequency', type: 'text', placeholder: 'e.g., 3 meals per day' },
  { name: 'favoriteFood', label: 'Food You Can’t Live Without', type: 'textarea', placeholder: 'e.g., Pizza, Mango' },
  { name: 'activityLevel', label: 'Activity Level', type: 'select', options: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'], placeholder: '' },
  { name: 'supplementUsage', label: 'Do you use supplements?', type: 'select', options: ['Yes', 'No'], placeholder: '' },
];

const stressDescriptions = {
    0: 'Low Stress',
    1: 'Mild stress',
    2: 'Moderate Stress',
    3: 'High Stress',
    4: 'Extremely Stress',
    5: 'Complete Breakdown',
  };

const HealthCalculator = () => {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(0);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = () => {
    if (step < fields.length - 1) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1);
  };

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
  
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
      ${promptStructure}
       User Information:
      Fitness Level: ${formData.fitnessLevel}
      Height: ${formData.height}
      Weight: ${formData.weight}
      Goal Weight: ${formData.goalWeight}
      Age: ${formData.age}
      Gender: ${formData.gender}
      Workout Frequency: ${formData.howManyWorkouts}
      Workout Location: ${formData.whereWorkout}
      Primary Goal: ${formData.topGymGoal}
      Secondary Goal: ${formData.secondGymGoal}
      Sleep: ${formData.sleep}
      Medical History: ${formData.medicalHistory}
      Stress Level: ${formData.stressLevel}
      Body Type: ${formData.bodyType}
      Dietary Preference: ${formData.dietaryPreference}
      Location: ${formData.location}
      Allergies: ${formData.allergies}
      Water Intake: ${formData.waterIntake}
      Meal Frequency: ${formData.mealFrequency}
      Favorite Food: ${formData.favoriteFood}
      Activity Level: ${formData.activityLevel}
      Supplement Usage: ${formData.supplementUsage}
      Supplement Details: ${formData.supplementsDetails}
      `;

      const result = await model.generateContent(prompt);

      const formattedResponse = formatResponse(result.response.text() || "Couldn't fetch a response. Try again later.");
      setResponse(formattedResponse);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse([<p>Error fetching response.</p>]);
    } finally {
      setLoading(false);
    }
  };
  


  const handleCopyAndRedirect = (destination) => {
    const prompt = `
    ${gptsPrompt}    
    User Information:
      Fitness Level: ${formData.fitnessLevel}
      Height: ${formData.height}
      Weight: ${formData.weight}
      Goal Weight: ${formData.goalWeight}
      Age: ${formData.age}
      Gender: ${formData.gender}
      Workout Frequency: ${formData.howManyWorkouts}
      Workout Location: ${formData.whereWorkout}
      Primary Goal: ${formData.topGymGoal}
      Secondary Goal: ${formData.secondGymGoal}
      Sleep: ${formData.sleep}
      Medical History: ${formData.medicalHistory}
      Stress Level: ${formData.stressLevel}
      Body Type: ${formData.bodyType}
      Dietary Preference: ${formData.dietaryPreference}
      Location: ${formData.location}
      Allergies: ${formData.allergies}
      Water Intake: ${formData.waterIntake}
      Meal Frequency: ${formData.mealFrequency}
      Favorite Food: ${formData.favoriteFood}
      Activity Level: ${formData.activityLevel}
      Supplement Usage: ${formData.supplementUsage}
      Supplement Details: ${formData.supplementsDetails}
    `;

    navigator.clipboard.writeText(prompt).then(() => {
      if (destination === 'gemini') {
        window.open('https://gemini.google.com/', '_blank');
      } else if (destination === 'gpt') {
        window.open('https://chat.openai.com/', '_blank');
      }
    });
  };



const handleGenerateAgain = ()=>{
    setResponse([])
}


  const currentField = fields[step];
  const showSupplementQuestion = formData.supplementUsage === 'Yes';

  return (
    <div className="w-full h-cal">
      <div className="w-full p-4">
        <BackBtn />
      </div>
     <div>
        {loading ? (
            <div className="w-full h-screen flex justify-center items-center">
            <Loader />
            </div>
        ):(
            <>
            {response.length > 0 ? (
        <>
           <div className="w-full h-screen flex justify-center items-center responseTree">
           <div className="w-[95vw] h-[80vh] p-5 bg-[#3d3d3da4] rounded-xl overflow-scroll overflow-x-auto
           ">
                <ul className="list-disc pl-5">{response}</ul>
            </div>
           </div>

            <button type="button" 
              className="bg-blue-500 fixed bottom-5 right-5 text-black px-4 py-2 rounded bg-gradient-to-r from-blue-400 to-pink-400"
            onClick={handleGenerateAgain}>
              Generate Again
            </button>
        </>
      ):(
        <>
        <div
          className="gradient-text absolute top-10 saketAITitle2 saketAICalculator text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 w-full to-red-400"
        >
          Health Calculator
        </div>
      <form className="p-6 w-full h-screen flex flex-col items-center justify-center" onSubmit={handleSubmit}>
        
        <div className="mb-6 flex flex-col">
          <label className="calculatorLable">{currentField.label}:</label>
          {currentField.type === 'select' && (
            <select
              name={currentField.name}
              value={formData[currentField.name] || ''}
              onChange={handleChange}
              className="inputCalculator"
            >
              <option value="">Select</option>
              {currentField.options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {currentField.type === 'textarea' && (
            <textarea
              name={currentField.name}
              value={formData[currentField.name] || ''}
              onChange={handleChange}
              placeholder={currentField.placeholder}
              className="inputCalculator max-h-[200px]"
            />
          )}
          {(currentField.type === 'number' || currentField.type === 'text') && (
            <input
              type={currentField.type}
              name={currentField.name}
              value={formData[currentField.name] || ''}
              onChange={handleChange}
              placeholder={currentField.placeholder}
              className="inputCalculator"
            />
          )}
          {currentField.type === 'range' && (
            <div>
              <input
                type="range"
                name={currentField.name}
                min={currentField.min}
                max={currentField.max}
                value={formData[currentField.name] || currentField.min}
                onChange={handleChange}
              />
              <div className="mt-2">
                {currentField.name === 'howManyWorkouts' && (
                  <span>{formData[currentField.name] || currentField.min} day</span>
                )}
                {currentField.name === 'stressLevel' && (
                  <span>Stress Level: {stressDescriptions[formData[currentField.name]] || 'Low Stress'}</span>
                )}
              </div>
            </div>
          )}
        </div>
        {currentField.name === 'supplementUsage' && showSupplementQuestion && (
          <div className="mb-6 flex flex-col">
            <label className="calculatorLable">Enter all supplements you use:</label>
            <input
              type="text"
              name="supplementsDetails"
              value={formData.supplementsDetails || ''}
              onChange={handleChange}
              placeholder="e.g., Whey protein, Vitamin D"
              className="inputCalculator"
            />
          </div>
        )}
        <div className="flex justify-between items-center w-full absolute bottom-10 px-10 buttonsCalc">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={step === 0}
            className="bg-gray-400 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {step === fields.length - 1 ? (
            <>
           
            <button type="button" 
              className="bg-blue-500 text-black px-4 py-2 rounded bg-gradient-to-r from-green-400 to-red-400"
            onClick={()=>handleCopyAndRedirect("gpt")}>
              Ctrl + V at ChatGPT
            </button>

            <button type="button" 
              className="bg-blue-500 text-black px-4 py-2 rounded bg-gradient-to-r from-blue-400 to-pink-400"
            onClick={()=>handleCopyAndRedirect("gemini")}>
              Ctrl + V at Gemini
            </button>

            <button
              type="submit"
              className="bg-blue-500 text-black px-4 py-2 rounded bg-gradient-to-r from-yellow-400 to-red-400"
            >
              Submit
            </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-black px-4 py-2 rounded bg-gradient-to-r from-yellow-400 to-red-400"
            >
              Next
            </button>
          )}
        </div>
      </form>
        </>
      )}
            </>
        )}
     </div>
    </div>
  );
};

export default HealthCalculator;
