// src/components/RecipeCard/RecipeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

export default function RecipeCard({ idMeal, strMeal, strMealThumb }) {
  return (
    <li className='recipe-card'>
      <Link to={`/${idMeal}`}>
        <img src={strMealThumb} alt={strMeal} className='recipe-image' />
        <h3 className='recipe-title'>{strMeal}</h3>
      </Link>
    </li>
  );
}
