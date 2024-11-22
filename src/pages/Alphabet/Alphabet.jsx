// src/pages/Alphabet/Alphabet.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMealsByLetter } from '../../utils/api';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import './Alphabet.css';

export default function Alphabet () {
  const [letterMealData, setLetterMealData] = useState([]);
  const { letter } = useParams();

  useEffect(() => {
    const fetchMeals = async () => {
      const meals = await getMealsByLetter(letter);
      setLetterMealData(meals);
    };

    fetchMeals();
  }, [letter]);

  function mealDataLoaded() {
    return (
      <>
        <h1 className='label'>{letter.toUpperCase()}</h1>
        <ul className='recipe-cards-list'>
          {letterMealData.map((meal) => (
            <RecipeCard key={meal.idMeal} {...meal} />
          ))}
        </ul>
      </>
    );
  }

  return (
    <main className='alphabet-view'>
      <section className="alphabet-recipe-cards-container">
        {letterMealData.length > 0 ? (
          mealDataLoaded()
        ) : (
          <div className='spinner-container'>
            <div className="lds-spinner">
              <div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div><div></div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
