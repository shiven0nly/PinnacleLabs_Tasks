import React from 'react';

export const WeatherForecast = ({ forecast }) => {
  return (
    <div className="mt-5 pb-5">
      <h3 className="fw-bold mb-4 text-white">5-Day Forecast</h3>
      <div className="row row-cols-2 row-cols-md-5 g-4">
        {forecast.map((day, index) => {
          const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          });

          return (
            <div className="col" key={index}>
              <div className="card glass-card border-0 text-center p-4 h-100 transition-hover">
                <p className="mb-2 fw-semibold fs-5 text-white">{date.split(' ')[0]}</p>
                <small className="text-muted-light d-block mb-3">{date.split(' ').slice(1).join(' ')}</small>
                
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  className="mx-auto"
                  alt="weather icon"
                  style={{ width: '80px', filter: 'drop-shadow(0px 8px 8px rgba(0,0,0,0.3))' }}
                />
                <h3 className="fw-bold mt-2 mb-1 text-white">{Math.round(day.main.temp)}°</h3>
                <small className="text-muted-light text-capitalize d-block mt-2">{day.weather[0].main}</small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};