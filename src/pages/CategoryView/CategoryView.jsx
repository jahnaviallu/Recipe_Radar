// src/pages/Planners/CategoryView.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMealsByCategory } from '../../utils/api';
import CategoryRecipeCardList from '../../components/CategoryRecipeCardList/CategoryRecipeCardList';
import './CategoryView.css';

export default function CategoryView () {
  const [catMealData, setCatMealData] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchMeals = async () => {
      const meals = await getMealsByCategory(category);
      setCatMealData(meals);
    };

    fetchMeals();
  }, [category]);

  return (
    <main className='category-view'>
      <CategoryRecipeCardList mealData={catMealData}/>
    </main>
  );
}
