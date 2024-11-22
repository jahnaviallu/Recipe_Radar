// src/pages/Areas/Areas.jsx
import React, { useState, useEffect } from 'react';
import { getAreas } from '../../utils/api';
import AreaCard from '../../components/AreaCard/AreaCard';
import './Areas.css';

export default function Areas () {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      const fetchedAreas = await getAreas();
      setAreas(fetchedAreas);
    };

    fetchAreas();
  }, []);

  function areasLoaded() {
    return (
      <>
        <h1 className='label'>Countries</h1>
        <ul className='area-cards-list'>
          {areas.map((area) => (
            <AreaCard key={area.strArea} {...area} />
          ))}
        </ul>
      </>
    );
  }

  return (
    <main className='areas'>
      <section className="area-recipe-cards-container">
        {areas.length > 0 ? (
          areasLoaded()
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
