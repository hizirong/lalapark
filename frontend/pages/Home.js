// frontend/src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { fetchParks } from '../services/api';

function Home() {
  const [parks, setParks] = useState([]);

  useEffect(() => {
    const getParks = async () => {
      const { data } = await fetchParks();
      setParks(data);
    };
    getParks();
  }, []);

  return (
    <div>
      <h1>歡迎來到公園推薦系統</h1>
      <ul>
        {parks.map((park) => (
          <li key={park._id}>{park.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
