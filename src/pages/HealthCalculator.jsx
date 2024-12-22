import React, { useState } from 'react';
import { BackBtn } from '../components';
import { promptStructure } from '../constants';
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    // setLoading(true)
    //     const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // const result = await model.generateContent(prompt);
    copyToClipboardAndRedirect()
  };
  


  const copyToClipboardAndRedirect = () => {
    const prompt = `
    Create a personalized workout and nutrition plan based on the following user information. Format the response with clear headings, subheadings, and bullet points for easy parsing in a React application. Use markdown formatting where appropriate (e.g., # for headings, * for bullet points).
    
    **User Information:**
    *   **Fitness Level:** ${formData.fitnessLevel}
    *   **Height:** ${formData.height}
    *   **Weight:** ${formData.weight}
    *   **Goal Weight:** ${formData.goalWeight}
    *   **Age:** ${formData.age}
    *   **Gender:** ${formData.gender}
    *   **Workout Frequency:** ${formData.howManyWorkouts}
    *   **Workout Location:** ${formData.whereWorkout}
    *   **Primary Goal:** ${formData.topGymGoal}
    *   **Secondary Goal:** ${formData.secondGymGoal}
    *   **Sleep:** ${formData.sleep}
    *   **Medical History:** ${formData.medicalHistory}
    *   **Stress Level (1-10):** ${formData.stressLevel}
    *   **Body Type:** ${formData.bodyType}
    *   **Dietary Preference:** ${formData.dietaryPreference}
    *   **Location:** ${formData.location}
    *   **Allergies:** ${formData.allergies}
    *   **Water Intake:** ${formData.waterIntake}
    *   **Meal Frequency:** ${formData.mealFrequency}
    *   **Favorite Food:** ${formData.favoriteFood}
    *   **Activity Level:** ${formData.activityLevel}
    *   **Supplement Usage:** ${formData.supplementUsage}
    *   **Supplement Details:** ${formData.supplementsDetails}
    ${promptStructure}`;

    navigator.clipboard.writeText(prompt).then(() => {
      // Redirect user to ChatGPT with prompt copied
      window.location.href = 'https://chat.openai.com';
    });
  };















  const currentField = fields[step];
  const showSupplementQuestion = formData.supplementUsage === 'Yes';

  return (
    <div className="w-full h-cal">
      <div className="w-full p-4">
        <BackBtn />
      </div>
      <form className="p-6 w-full h-screen flex flex-col items-center justify-center" onSubmit={handleSubmit}>
        <div
          className="gradient-text absolute top-10 saketAITitle2 saketAICalculator text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400"
        >
          Health Calculator
        </div>
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
        <div className="flex justify-between w-full absolute bottom-10 px-10">
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
                {/* <button
              type="submit"
              className="bg-blue-500 text-black px-4 py-2 rounded bg-gradient-to-r from-yellow-400 to-red-400"
            >
              Submit
            </button> */}
            <button type="button" 
              className="bg-blue-500 text-black px-4 py-2 rounded bg-gradient-to-r from-yellow-400 to-red-400"
            onClick={copyToClipboardAndRedirect}>
              Ctrl + V at ChatGPT
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
    </div>
  );
};

export default HealthCalculator;
