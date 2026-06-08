import React from 'react';
import Navbar from './components/Navbar';
import { useWeather } from './hooks/useWeather';
import { WeatherSearch } from './components/WeatherSearch';
import { WeatherForecast } from './components/WeatherForecast';
import { CurrentWeather } from './components/CurrentWeather';

function App() {
  const { weatherData, loading, error, fetchWeather } = useWeather();

  return (
    <>
      <Navbar />
      <div className="container py-5" style={{ maxWidth: '900px' }}>
        <header className="text-center mb-5">
          <h1
            className="fw-bolder display-4 mb-3"
            style={{ letterSpacing: '-1px' }}
          >
            Weather Dashboard
          </h1>
          <p className="lead text-muted-light">
            Get real-time weather and 5-day forecasts.
          </p>
        </header>

        <WeatherSearch onSearch={fetchWeather} />

        {/* Loading State */}
        {loading && (
          <div className="d-flex justify-content-center my-5">
            <div
              className="spinner-border text-info"
              role="status"
              style={{ width: '3rem', height: '3rem' }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Error Alert Display */}
        {error && (
          <div
            className="alert alert-danger glass-card border-danger text-center shadow-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Weather Metrics Dashboard View */}
        {weatherData && !loading && (
          <div className="animate-fade-in mt-4">
            <CurrentWeather current={weatherData.current} />
            <WeatherForecast forecast={weatherData.forecast} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
