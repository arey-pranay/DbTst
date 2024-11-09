"use client";

import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx"; // Importing the xlsx library

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
  const [recipes, setRecipes] = useState([]); // State to hold recipes loaded from Excel
  const [disscoScore, setDisscoScore] = useState(null); // State to store the DissCo score

  useEffect(() => {
    const fetchAndParseExcel = async () => {
      try {
        // Fetch the Excel file from the public folder
        const response = await fetch("./Cleaned_Indian_Food_Dataset.xlsx");
        const arrayBuffer = await response.arrayBuffer();

        // Parse the Excel file
        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        // Log the sheet names to verify we are accessing the right sheet
        console.log("Sheet Names: ", workbook.SheetNames);

        // Assuming the first sheet has the data (you can adjust this if needed)
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Log the raw sheet data to inspect its structure
        console.log("Raw Sheet Data: ", sheet);

        // Convert the sheet to JSON format
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Log the JSON data to check if it’s being parsed correctly
        console.log("Parsed JSON Data: ", jsonData);

        // Format the data to match your recipe structure
        const formattedRecipes = jsonData.map((row) => ({
          name: row["TranslatedRecipeName"], // Assuming column names from Excel
          ingredients: row["Cleaned-Ingredients"]
            .split(",")
            .map((ingredient) => ingredient.trim()),
          instructions: row["TranslatedInstructions"],
          url: row["URL"],
          imageUrl: row["image-url"],
        }));

        // Update state with parsed recipes
        setRecipes(formattedRecipes);
      } catch (error) {
        console.error("Error fetching or parsing the Excel file:", error);
      }
    };

    fetchAndParseExcel();
  }, []); // Run once when the component mounts
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const calculateDissCo = (age, gender, hba1c, conditions) => {
    // Gender factor
    const genderFactor = gender.toLowerCase() === "female" ? 1.4 : 1.0;

    // Base HDF score
    let hdf = 1.0;

    // Define condition impacts
    const conditionImpacts = {
      hypertension: 0.5,
      cardiomyopathy: 1,
      pericardial_disease: 1,
      myocarditis: 1,
      coronary_heart_disease: 1,
      peripheral_vascular_disease: 2,
      stent_or_bypass: 3,
    };

    // Add factors for each present condition
    conditions.forEach((condition) => {
      hdf += conditionImpacts[condition.toLowerCase()] || 0; // Ignore unrecognized conditions
    });

    // Calculate raw DissCo score
    const disscoScore = (age / 10 + hba1c) * genderFactor * hdf;

    // Normalize the score (max possible score is 34.3)
    const maxScore = 34.3;
    const normalizedDissco = disscoScore / maxScore;

    return normalizedDissco;
  };
  const calculateAndDisplayDisscoScore = () => {
    const { age, gender, hbA1C, hypertension, heartDisease } = userDetails;
    if (!age || !gender || !hbA1C || !hypertension || !heartDisease) {
      alert("Please fill in all details.");
      return;
    }

    const conditions = [];
    if (hypertension === "Yes") conditions.push("hypertension");
    if (heartDisease && heartDisease !== "None")
      conditions.push(heartDisease.toLowerCase());

    const score = calculateDissCo(
      Number(age),
      gender,
      Number(hbA1C),
      conditions
    );
    setDisscoScore(score);
  };
  const handleIngredientChange = (e) => {
    setIngredients(e.target.value);
  };

  const handleRecipeRecommendation = () => {
    // Split the input ingredients and clean the array
    const inputIngredients = ingredients
      .split(",")
      .map((ingredient) => ingredient.trim().toLowerCase());
    console.log(inputIngredients);

    // Find a recipe that matches the top 3 ingredients
    console.log(recipes);
    let recommendedRecipe = "No recipe found for these ingredients.";
    for (const recipe of recipes) {
      const recipeIngredients = recipe.ingredients.map((ingredient) =>
        ingredient.toLowerCase()
      );

      // Check if all three ingredients are in the recipe
      const matchCount = inputIngredients.filter((ingredient) =>
        recipeIngredients.includes(ingredient)
      ).length;
      console.log(inputIngredients);
      console.log(recipeIngredients);
      console.log(matchCount);
      if (matchCount >= 3) {
        recommendedRecipe = `
         <br> <strong>${recipe.name}</strong><br> <br>
          Ingredients: ${recipe.ingredients.join(", ")}<br><br>
          Instructions: ${recipe.instructions}<br><br>
          <a href="${
            recipe.url
          }" target="_blank" className="underline">Click here to know more</a><br> <br>
          <img src="${recipe.imageUrl}" alt="${recipe.name}" style="width:100%">
        `;
        break;
      }
    }

    setRecipe(recommendedRecipe);
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
        <button
          onClick={calculateAndDisplayDisscoScore}
          className="mt-4 bg-lime-600 text-white px-4 py-2 rounded-md hover:bg-lime-700 w-full"
        >
          Calculate DissCo Score
        </button>
        {disscoScore !== null && (
          <div className="mt-4 text-center text-xl">
            <strong>DissCo Score:</strong> {disscoScore.toFixed(2)}
          </div>
        )}
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
            {/* <p className="text-gray-700">
              {recipe || "Recipe will appear here..."}
            </p> */}
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: recipe }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Functionality;
