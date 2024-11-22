// src/components/MealInfo/MealInfo.jsx
import { Link } from 'react-router-dom';
import { countryCodes } from '../../utils/api'; // Ensure countryCodes is defined and exported
import './MealInfo.css';

export default function MealInfo({ favorites, setFavorites, meal }) {
  const { strArea, strCategory, strMeal, strMealThumb, idMeal, ...restOfProps } = meal;

  // Handle flag URL
  const flagUrl = countryCodes && countryCodes[strArea]
    ? `https://www.themealdb.com/images/icons/flags/big/32/${countryCodes[strArea]}.png`
    : null; // Or use a placeholder image URL

  // Check if the meal is already in favorites
  const isFavorite = favorites.some(favMeal => favMeal.idMeal === idMeal);

  // Extract ingredients
  const ingredients = [];

  let i = 1;
  while (meal[`strIngredient${i}`]) {
    if (meal[`strIngredient${i}`].trim() !== "") { // Ensure ingredient is not empty
      ingredients.push(
        <li className='ingredient-item' key={i}>
          {meal[`strMeasure${i}`]} {meal[`strIngredient${i}`]}
        </li>
      );
    }
    i++;
  }

  // Handle adding/removing favorites
  function handleClick() {
    if (!isFavorite) {
      // Add to favorites
      const newFavorites = [meal, ...favorites];
      setFavorites(newFavorites);
      // Optionally, provide user feedback
      alert(`${strMeal} has been added to your favorites!`);
    } else {
      // Remove from favorites
      const updatedFavorites = favorites.filter(favMeal => favMeal.idMeal !== idMeal);
      setFavorites(updatedFavorites);
      // Optionally, provide user feedback
      alert(`${strMeal} has been removed from your favorites.`);
    }
  }

  return (
    <section className='meal-info-component'>
      <div className='meal-img-container'>
        <img src={strMealThumb} alt={strMeal} />
      </div>
      <div className='meal-info-container'>
        <h1>{strMeal}</h1>
        <h2>
          <span>Category:</span>{' '}
          <Link to={`/category/${strCategory}`} className='meal-info-link'>
            {strCategory}
          </Link>
        </h2>
        <div className='meal-country-container'>
          <h2>
            <span>Country:</span>{' '}
            <Link to={`/area/${strArea}`} className='meal-info-link'>
              {strArea}
            </Link>
          </h2>
          {flagUrl && <img src={flagUrl} alt={`${strArea} flag`} />}
        </div>
        <h3>Ingredients:</h3>
        <ul className='ingredients-list'>
          {ingredients}
        </ul>
      </div>
      <button className='fav-btn' onClick={handleClick}>
        {isFavorite ? (
          // SVG for "Remove from Favorites"
          <svg width="800px" height="800px" viewBox="0 -1 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Icon-Set-Filled" transform="translate(-102.000000, -882.000000)" fill="#dc3545"> {/* Changed fill color to red */}
                <path d="M126,882 C122.667,882 119.982,883.842 117.969,886.235 C116.013,883.76 113.333,882 110,882 C105.306,882 102,886.036 102,890.438 C102,892.799 102.967,894.499 104.026,896.097 L116.459,911.003 C117.854,912.312 118.118,912.312 119.513,911.003 L131.974,896.097 C133.22,894.499 134,892.799 134,890.438 C134,886.036 130.694,882 126,882 Z"></path>
              </g>
            </g>
          </svg>
        ) : (
          // SVG for "Add to Favorites"
          <svg width="800px" height="800px" viewBox="0 -0.5 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Icon-Set" transform="translate(-100.000000, -880.000000)" fill="#28a745"> {/* Changed fill color to green */}
                <path d="M128,893.682 L116,908 L104,893.623 C102.565,891.629 102,890.282 102,888.438 C102,884.999 104.455,881.904 108,881.875 C110.916,881.851 114.222,884.829 116,887.074 C117.731,884.908 121.084,881.875 124,881.875 C127.451,881.875 130,884.999 130,888.438 C130,890.282 129.553,891.729 128,893.682 Z M124,880 C120.667,880 118.145,881.956 116,884 C113.957,881.831 111.333,880 108,880 C103.306,880 100,884.036 100,888.438 C100,890.799 100.967,892.499 102.026,894.097 L114.459,909.003 C115.854,910.48 116.118,910.48 117.513,909.003 L129.974,894.097 C131.22,892.499 132,890.799 132,888.438 C132,884.036 128.694,880 124,880 Z"></path>
              </g>
            </g>
          </svg>
        )}
      </button>
    </section>
  );
}
