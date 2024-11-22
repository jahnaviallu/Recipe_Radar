// src/pages/Planners/MealPlanner.jsx
import React, { useState, useEffect } from 'react';
import { getMealsBySearch } from '../../utils/api';
import useDebounce from '../../hooks/useDebounce';
import './MealPlanner.css';

export default function MealPlanner({ mealPlan, setMealPlan }) {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500); // Debounce delay of 500ms
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      if (debouncedSearchValue.trim() !== '') {
        const results = await getMealsBySearch(debouncedSearchValue);
        if (results.length > 0) {
          setMeals(results);
          setError(null);
        } else {
          setMeals([]);
          setError('No meals found.');
        }
      } else {
        setMeals([]);
        setError(null);
      }
    };

    fetchMeals();
  }, [debouncedSearchValue]);

  const handleAddMeal = (meal, day) => {
    setMealPlan(prevMealPlan => {
      const mealsForDay = prevMealPlan[day] || [];
      // Prevent duplicate meals
      if (mealsForDay.some(existingMeal => existingMeal.idMeal === meal.idMeal)) {
        alert('This meal is already added to the selected day.');
        return prevMealPlan;
      }
      const updatedMealsForDay = [...mealsForDay, meal];
      return {
        ...prevMealPlan,
        [day]: updatedMealsForDay,
      };
    });
    setSelectedMeal(null);
    setIsModalOpen(false);
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const openModal = (meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMeal(null);
    setIsModalOpen(false);
  };

  return (
    <main className='meal-planner'>
      <h1>Meal Planner</h1>
      <div className='search-container'>
        <input
          type='text'
          placeholder='Search for meals...'
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className='search-input'
          aria-label='Search for meals'
        />
      </div>
      {error && <p className='error-message'>{error}</p>}
      {meals.length > 0 && (
        <div className='meal-results'>
          {meals.map(meal => (
            <div key={meal.idMeal} className='meal-card'>
              <img src={meal.strMealThumb} alt={meal.strMeal} className='meal-thumbnail' />
              <div className='meal-details'>
                <h3 className='meal-name'>{meal.strMeal}</h3>
                <button onClick={() => openModal(meal)} className='assign-button'>
                  Assign to Day
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Modal for Selecting Day */}
      {isModalOpen && selectedMeal && (
        <div className='modal-overlay' onClick={closeModal}>
          <div className='modal-content' onClick={e => e.stopPropagation()}>
            <h2>Assign {selectedMeal.strMeal} to a Day</h2>
            <div className='days-list'>
              {daysOfWeek.map(day => (
                <button key={day} onClick={() => handleAddMeal(selectedMeal, day)} className='day-button'>
                  {day}
                </button>
              ))}
            </div>
            <button className='close-button' onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
