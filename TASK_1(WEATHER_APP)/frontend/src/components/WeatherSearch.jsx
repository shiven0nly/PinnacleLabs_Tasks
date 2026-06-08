import React, { useState } from 'react';

export const WeatherSearch = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="form-control flex-grow p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded mt-5"
        >
          Search
        </button>
      </div>
    </form>
  );
};
