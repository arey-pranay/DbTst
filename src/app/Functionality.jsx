"use client";

import React, { useState } from "react";

const Functionality = () => {
  const [userDetails, setUserDetails] = useState({
    age: "",
    gender: "",
    hbA1C: "",
    hypertension: "",
    heartDisease: "",
    weight: "",
    height: "",
  });
  const emojis = [
    [
      <span role="img" aria-label="sheep">
        🎂
      </span>,
      <span role="img" aria-label="sheep">
        📅
      </span>,
    ],
    [
      <span role="img" aria-label="sheep">
        🚹
      </span>,
      <span role="img" aria-label="sheep">
        🚺
      </span>,
    ],
    [
      <span role="img" aria-label="sheep">
        🔬
      </span>,
      <span role="img" aria-label="sheep">
        🧪
      </span>,
    ],
    [
      <span role="img" aria-label="sheep">
        💢
      </span>,
      <span role="img" aria-label="sheep">
        🧠
      </span>,
    ],
    [
      <span role="img" aria-label="sheep">
        🩺
      </span>,
      <span role="img" aria-label="sheep">
        {/* 💓 */}❤
      </span>,
    ],
    [
      <span role="img" aria-label="sheep">
        ⚖
      </span>,
      <span role="img" aria-label="sheep">
        ⏲️
      </span>,
    ],
    [
      <span role="img" aria-label="sheep">
        📏
      </span>,
      <span role="img" aria-label="sheep">
        🧍↕
      </span>,
    ],
  ];
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [focusedField, setFocusedField] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleIngredientChange = (e) => {
    setIngredients(e.target.value);
  };

  const handleRecipeRecommendation = () => {
    setRecipe(`Recommended recipe based on ingredients: ${ingredients}`);
  };

  const handleFocus = (name) => {
    setFocusedField(name);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  return (
    <div className="bg-lime-500 h-screen flex flex-col gap-10 md:gap-6 md:flex-row p-10">
      <div className=" w-full  md:w-2/5 p-8 bg-white rounded-xl shadow-lg space-y-6  overflow-y-scroll  hover:border-8 border-lime-200 transition-all duration-100">
        <h2 className="text-2xl font-bold text-gray-700 text-center underline underline-offset-4 font-mono">
          User Details
        </h2>

        <div className="space-y-7 ">
          {Object.entries(userDetails).map(([key, value], index) => (
            <div key={key}>
              <div className="flex gap-1 items-center mb-1">
                <label className="block text-gray-700 capitalize ">
                  {/* {emojis[index][0]} */}
                  {key}
                </label>
                {emojis[index][1]}
              </div>

              {key === "gender" ? (
                <select
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus(key)}
                  onBlur={handleBlur}
                  className={`w-full p-2 border-2 rounded-md outline-none ${
                    focusedField === key ? "border-lime-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : key === "hypertension" ? (
                <div className="flex flex-col text-xl mt-2">
                  <div className="flex items-center gap-20">
                    <div>
                      <label className={`flex items-center cursor-pointer`}>
                        <input
                          type="radio"
                          name={key}
                          value="Yes"
                          checked={value === "Yes"}
                          onChange={handleInputChange}
                          onFocus={() => handleFocus(key)}
                          onBlur={handleBlur}
                          className="peer sr-only"
                        />
                        <span
                          className={`w-5 h-5 flex items-center justify-center mr-2 border-2 border-gray-300 rounded-full
      peer-checked:border-lime-500 peer-checked:bg-lime-500 transition duration-200 ease-in-out`}
                        >
                          <span
                            className={`w-3 h-3 rounded-full bg-white transition duration-200 ease-in-out
        peer-checked:bg-white`}
                          ></span>
                        </span>
                        <span className="text-gray-700">Yes</span>{" "}
                      </label>
                    </div>
                    <div>
                      <label className={`flex items-center cursor-pointer`}>
                        <input
                          type="radio"
                          name={key}
                          value="No"
                          checked={value === "No"}
                          onChange={handleInputChange}
                          onFocus={() => handleFocus(key)}
                          onBlur={handleBlur}
                          className="peer sr-only"
                        />
                        <span
                          className={`w-5 h-5 flex items-center justify-center mr-2 border-2 border-gray-300 rounded-full
      peer-checked:border-lime-500 peer-checked:bg-lime-500 transition duration-200 ease-in-out`}
                        >
                          <span
                            className={`w-3 h-3 rounded-full bg-white transition duration-200 ease-in-out
        peer-checked:bg-white`}
                          ></span>
                        </span>
                        <span className="text-gray-700">No</span>{" "}
                      </label>
                    </div>
                  </div>
                </div>
              ) : key === "heartDisease" ? (
                <select
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus(key)}
                  onBlur={handleBlur}
                  className={`w-full p-2 border-2 rounded-md outline-none ${
                    focusedField === key ? "border-lime-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Option</option>
                  <option value="Cardiomyopathy">Cardiomyopathy</option>
                  <option value="Pericardial Disease">
                    Pericardial Disease
                  </option>
                  <option value="Myocarditis">Myocarditis</option>
                  <option value="Caronary Heart Disease">
                    Caronary Heart Disease
                  </option>
                  <option value="Peripheral Vascular Disease">
                    Peripheral Vascular Disease
                  </option>
                  <option value="Stent or Bypass">Stent or Bypass</option>

                  <option value="None">None</option>
                </select>
              ) : (
                <input
                  type={key === "hbA1C" ? "number" : "text"}
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus(key)}
                  onBlur={handleBlur}
                  className={`w-full p-2 border-2 rounded-md outline-none ${
                    focusedField === key && !value
                      ? "border-lime-500"
                      : "border-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-3/5 p-8 bg-white rounded-xl shadow-lg space-y-6 overflow-y-scroll  hover:border-8 border-lime-200 transition-all duration-100">
        <h2 className="text-2xl font-bold text-gray-700 text-center underline font-mono">
          Ingredients & Recipe
        </h2>

        <div className="flex flex-col md:flex-row space-x-4 gap-4 ">
          <div className="w-full md:w-1/2 ">
            <textarea
              value={ingredients}
              onChange={handleIngredientChange}
              onFocus={() => handleFocus("ingredients")}
              onBlur={handleBlur}
              className={`w-full p-2 border-2 rounded-md outline-none h-32 ${
                focusedField === "ingredients" && !ingredients
                  ? "border-lime-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter available ingredients here..."
            />
            <button
              onClick={handleRecipeRecommendation}
              className="mt-4 bg-lime-600 text-white px-4 py-2 rounded-md hover:bg-lime-700 w-full"
            >
              Get Recipe
            </button>
          </div>

          <div
            className="w-full md:w-1/2 bg-lime-100 p-6 rounded-md shadow-md "
            style={{ marginLeft: "0px" }}
          >
            <h3 className="text-xl font-bold text-gray-700">
              Recommended Recipe
            </h3>
            <p className="text-gray-700">
              {recipe || "Recipe will appear here..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Functionality;
