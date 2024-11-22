import { useState, useEffect } from 'react';
import { getCategories } from '../../utils/api';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import './Categories.css';

export default function Categories() {
  const [categories, setCategories] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        if (fetchedCategories && Array.isArray(fetchedCategories)) {
          setCategories(fetchedCategories);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch categories');
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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

  if (error) {
    return <p className='error-message'>Error: {error}</p>;
  }

  return (
    <main className='categories'>
      <section className="category-recipe-cards-container">
        <h1 className='label'>Categories</h1>
        <ul className='category-cards-list'>
          {categories.map((cat) => (
            <CategoryCard key={cat.idCategory} {...cat} />
          ))}
        </ul>
      </section>
    </main>
  );
}
