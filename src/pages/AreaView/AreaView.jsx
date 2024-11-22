// src/pages/Planners/AreaView.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMealsByArea } from '../../utils/api';
import AreaRecipeCardList from '../../components/AreaRecipeCardList/AreaRecipeCardList';
import './AreaView.css';

export default function AreaView () {
  const [areaMealData, setAreaMealData] = useState([]);
  const { area } = useParams();

  useEffect(() => {
    const fetchMeals = async () => {
      const meals = await getMealsByArea(area);
      setAreaMealData(meals);
    };

    fetchMeals();
  }, [area]);

  return (
    <main className='area-view'>
      <AreaRecipeCardList mealData={areaMealData} />
    </main>
  );
}
