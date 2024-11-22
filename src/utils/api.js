// src/utils/api.js

export const countryCodes = {
  American: "us",
  British: "gb",
  Canadian: "ca",
  Chinese: "cn",
  Croatian: "hr",
  Dutch: "nl",
  Egyptian: "eg",
  Filipino: "ph",
  French: "fr",
  Greek: "gr",
  Indian: "in",
  Irish: "ie",
  Italian: "it",
  Jamaican: "jm",
  Japanese: "jp",
  Kenyan: "kn",
  Malaysian: "my",
  Mexican: "mx",
  Moroccan: "ma",
  Polish: "pl",
  Portuguese: "pt",
  Russian: "ru",
  Spanish: "es",
  Thai: "th",
  Tunisian: "tn",
  Turkish: "tr",
  Unknown: "",
  Vietnamese: "vn",
};

/**
 * Fetch meals based on search query.
 *
 * @param {string} value - The search query.
 * @returns {Promise<Array>} - A promise that resolves to an array of meals.
 */
export async function getMealsBySearch(value) {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
      value
    )}`;
    console.log("Fetching URL:", url); // Debug the constructed URL
    const resp = await fetch(url);
    const data = await resp.json();
    return data.meals || [];
  } catch (err) {
    console.error("Error fetching meals by search:", err);
    return [];
  }
}

/**
 * Fetch meals based on category.
 *
 * @param {string} category - The meal category.
 * @returns {Promise<Array>} - A promise that resolves to an array of detailed meals.
 */
export async function getMealsByCategory(category) {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const resp = await fetch(url);
    const data = await resp.json();

    if (!data.meals) return [];

    const detailedMeals = await Promise.all(
      data.meals.map(async (meal) => {
        const resp = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        );
        const data = await resp.json();
        return data.meals ? data.meals[0] : null;
      })
    );

    // Filter out any nulls
    return detailedMeals.filter((meal) => meal !== null);
  } catch (err) {
    console.error("Error fetching meals by category:", err);
    return [];
  }
}

/**
 * Fetch meals based on area.
 *
 * @param {string} area - The meal area.
 * @returns {Promise<Array>} - A promise that resolves to an array of detailed meals.
 */
export async function getMealsByArea(area) {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
    const resp = await fetch(url);
    const data = await resp.json();

    if (!data.meals) return [];

    const detailedMeals = await Promise.all(
      data.meals.map(async (meal) => {
        const resp = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        );
        const data = await resp.json();
        return data.meals ? data.meals[0] : null;
      })
    );

    // Filter out any nulls
    return detailedMeals.filter((meal) => meal !== null);
  } catch (err) {
    console.error("Error fetching meals by area:", err);
    return [];
  }
}

/**
 * Fetch meal categories.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of categories.
 */
export async function getCategories() {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/categories.php`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data.categories || [];
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
}

/**
 * Fetch meal areas.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of areas.
 */
export async function getAreas() {
  try {
    const url = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
    const resp = await fetch(url);
    const data = await resp.json();
    // Remove 'Unknown' area if it exists
    const filteredAreas = data.meals.filter(
      (area) => area.strArea !== "Unknown"
    );
    return filteredAreas || [];
  } catch (err) {
    console.error("Error fetching areas:", err);
    return [];
  }
}

/**
 * Fetch a random meal.
 *
 * @returns {Promise<Object>} - A promise that resolves to a single meal object.
 */
export async function getRandom() {
  try {
    const url = "https://www.themealdb.com/api/json/v1/1/random.php";
    const resp = await fetch(url);
    const data = await resp.json();
    return data.meals ? data.meals[0] : {};
  } catch (err) {
    console.error("Error fetching random meal:", err);
    return {};
  }
}

/**
 * Fetch meals based on the first letter.
 *
 * @param {string} letter - The first letter of the meal.
 * @returns {Promise<Array>} - A promise that resolves to an array of meals.
 */
export async function getMealsByLetter(letter) {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data.meals || [];
  } catch (err) {
    console.error("Error fetching meals by letter:", err);
    return [];
  }
}

export async function getMealById(id) {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    return data.meals ? data.meals[0] : null;
  } catch (err) {
    console.error("Error fetching meal by ID:", err);
    return null;
  }
}

export async function getNutritionalFacts(ingredient) {
  try {
    const appId = "0de53962";
    const appKey = "0bd1fb6a04d4b80988591a5a45ff49f1";
    const url = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(
      ingredient
    )}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.calories || Object.keys(data.totalNutrients || {}).length > 0) {
      return data; // Return nutrition data if available
    } else {
      throw new Error('No nutritional information found');
    }
  } catch (err) {
    console.error(`Error fetching nutrition for ${ingredient}:`, err);
    return null;
  }
}

