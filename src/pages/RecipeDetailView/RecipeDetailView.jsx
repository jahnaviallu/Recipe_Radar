import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMealById, getNutritionalFacts } from '../../utils/api';
import MealInfo from '../../components/MealInfo/MealInfo';
import Video from '../../components/Video/Video';
import Instructions from '../../components/Instructions/Instructions';
import './RecipeDetailView.css';

export default function RecipeDetailView({ favorites, setFavorites }) {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nutritionLoading, setNutritionLoading] = useState(true);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const fetchedMeal = await getMealById(id);
        if (fetchedMeal) {
          setMeal(fetchedMeal);

          // Extract ingredients and measures
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = fetchedMeal[`strIngredient${i}`];
            const measure = fetchedMeal[`strMeasure${i}`];
            if (ingredient) {
              ingredients.push(`${measure} ${ingredient}`.trim());
            }
          }

          // Fetch nutritional facts for each ingredient
          const nutritionPromises = ingredients.map((ingr) =>
            getNutritionalFacts(ingr)
          );
          const nutritionData = await Promise.all(nutritionPromises);

          // Aggregate nutritional facts
          const aggregatedNutrition = nutritionData.reduce(
            (acc, data) => {
              if (data && data.totalNutrients) {
                Object.entries(data.totalNutrients).forEach(([key, value]) => {
                  if (!acc[key]) {
                    acc[key] = { ...value };
                  } else {
                    acc[key].quantity += value.quantity;
                  }
                });
              }
              return acc;
            },
            {}
          );

          setNutrition(aggregatedNutrition);
        }
      } catch (err) {
        console.error('Error fetching meal or nutrition data:', err);
      } finally {
        setLoading(false);
        setNutritionLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  const renderNutrition = () => {
    if (nutritionLoading) return <p>Loading nutrition data...</p>;

    if (!nutrition || Object.keys(nutrition).length === 0) {
      return <p>Nutritional information not available.</p>;
    }

    // Render aggregated nutritional data
    return (
      <div className='nutrition-data'>
        {Object.entries(nutrition).map(([key, nutrient]) => (
          <p key={key}>
            <strong>{nutrient.label}:</strong> {nutrient.quantity.toFixed(2)}{' '}
            {nutrient.unit}
          </p>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className='spinner-container'>
        <div className='lds-spinner'>
          <div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div>
        </div>
      </div>
    );
  }

  if (!meal) {
    return <p>Meal not found.</p>;
  }

  return (
    <main className='recipe-detail-view'>
      <div className='recipe-detail-wrapper'>
        <MealInfo
          favorites={favorites}
          setFavorites={setFavorites}
          meal={meal}
        />
        {/* Nutrition Section */}
        <section className='nutrition-section'>
          <h3>Nutritional Facts</h3>
          {renderNutrition()}
        </section>
        <Instructions strInstructions={meal.strInstructions} />
        <Video strMeal={meal.strMeal} strYoutube={meal.strYoutube} />
        
      </div>
    </main>
  );
}
