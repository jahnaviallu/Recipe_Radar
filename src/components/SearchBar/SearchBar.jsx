import { useRef } from 'react';
import { getMealsBySearch } from '../../utils/api';
import './SearchBar.css';

export default function SearchBar({ setMealData }) {
  const searchInput = useRef(null);

  function handleClick(e) {
    e.preventDefault();
    const searchInputValue = searchInput.current?.value.trim(); // Safely get the input value
    if (!searchInputValue) {
      alert('Please enter a search term!');
      return;
    }
    console.log("Searching for:", searchInputValue); // Debug input value
    getMealsBySearch(searchInputValue).then((meals) => {
      setMealData(meals); // Update meal data state with results
    });
  }

  return (
    <section className='search-bar-container'>
      <div className='search-bar-elements'>
        {/* Input Field */}
        <input
          type='text'
          placeholder='Search for a meal...'
          ref={searchInput}
          className='meal-input'
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleClick(e);
          }}
        />
        {/* Search Button */}
        <button
          className='meal-btn'
          onClick={handleClick} // Call the function on click
          aria-label='Search for meals'
        >
          <i className="fa-solid fa-magnifying-glass fa-xl"></i>
        </button>
      </div>
    </section>
  );
}