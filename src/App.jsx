// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import RecipeDetailView from './pages/RecipeDetailView/RecipeDetailView';
import Favorites from './pages/Favorites/Favorites';
import Categories from './pages/Categories/Categories';
import CategoryView from './pages/CategoryView/CategoryView';
import Areas from './pages/Areas/Areas';
import AreaView from './pages/AreaView/AreaView';
import Alphabet from './pages/Alphabet/Alphabet';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MealPlanner from './pages/Planners/MealPlanner';
import MealPlanView from './pages/Planners/MealPlanView';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

export default function App() {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [mealPlan, setMealPlan] = useLocalStorage('mealPlan', {});

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/:id'
          element={
            <RecipeDetailView
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
        <Route path='/favorites' element={<Favorites favorites={favorites} />} />
        <Route path='/category' element={<Categories />} />
        <Route path='/category/:category' element={<CategoryView />} />
        <Route path='/area' element={<Areas />} />
        <Route path='/area/:area' element={<AreaView />} />
        <Route path='/alphabet/:letter' element={<Alphabet />} />
        <Route path='/random' element={<Home />} />
        <Route
          path='/meal-planner'
          element={
            <MealPlanner mealPlan={mealPlan} setMealPlan={setMealPlan} />
          }
        />
        <Route
          path='/meal-plan-view'
          element={
            <MealPlanView mealPlan={mealPlan} setMealPlan={setMealPlan} />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}
