// src/pages/Planners/MealPlanView.jsx
import React from 'react';
import './MealPlanView.css';

export default function MealPlanView({ mealPlan, setMealPlan }) {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleRemoveMeal = (day, mealId) => {
    setMealPlan(prevMealPlan => {
      const updatedDayMeals = prevMealPlan[day].filter(meal => meal.idMeal !== mealId);
      
      // If no meals left for the day, remove the day from the mealPlan
      if (updatedDayMeals.length === 0) {
        const { [day]: _, ...rest } = prevMealPlan;
        return rest;
      }

      return {
        ...prevMealPlan,
        [day]: updatedDayMeals,
      };
    });
  };

  return (
    <main className='meal-plan-view'>
      <h1>Your Meal Plan</h1>
      {daysOfWeek.map(day => (
        mealPlan[day] && mealPlan[day].length > 0 ? (
          <div key={day} className='day-meals'>
            <h2>{day}</h2>
            <ul className='meals-list'>
              {mealPlan[day].map(meal => (
                <li key={meal.idMeal} className='meal-item'>
                  <img src={meal.strMealThumb} alt={meal.strMeal} className='meal-thumbnail' />
                  <div className='meal-info'>
                    <p className='meal-name'>{meal.strMeal}</p>
                    <button
                      onClick={() => handleRemoveMeal(day, meal.idMeal)}
                      className='remove-button'
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null
      ))}
      {Object.keys(mealPlan).length === 0 && (
        <p className='no-meal-plan'>You have not planned any meals yet.</p>
      )}
    </main>
  );
}
