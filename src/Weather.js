import React, { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setError('');
    setWeather(null);
    try {
      const response = await fetch(`http://localhost:3000/weather?city=${city}`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={fetchWeather}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Get Weather
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {weather && (
        <div className="mt-4 p-4 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold mb-2">{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}K</p>
          <p>Feels Like: {weather.main.feels_like}K</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
