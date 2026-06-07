import React from 'react';

export const CurrentWeather = ({ current }) => {
  return (
    <div className="card glass-card mb-5 border-0">
      <div className="card-body p-5">
        <div className="row align-items-center">
          <div className="col-md-7 text-center text-md-start mb-4 mb-md-0">
            <h2 className="display-4 fw-bold mb-1 text-white">{current.cityName}</h2>
            <p className="fs-4 text-muted-light text-capitalize mb-4">{current.description}</p>
            <h1 className="fw-bolder text-white" style={{fontSize: '5rem', lineHeight: '1'}}>{Math.round(current.temp)}°C</h1>
          </div>
          <div className="col-md-5 text-center">
            <img 
              src={`https://openweathermap.org/img/wn/${current.icon}@4x.png`} 
              alt={current.condition}
              style={{ width: '220px', height: '220px', filter: 'drop-shadow(0px 15px 15px rgba(0,0,0,0.4))' }}
            />
          </div>
        </div>
        
        <hr className="my-4 border-light opacity-25" />
        
        <div className="row text-center mt-4 pb-2">
          <div className="col-4 border-end border-light border-opacity-25">
            <h6 className="text-muted-light mb-2 text-uppercase" style={{letterSpacing: '1px'}}>Feels Like</h6>
            <p className="fs-3 fw-semibold mb-0 text-white">{Math.round(current.feelsLike)}°</p>
          </div>
          <div className="col-4 border-end border-light border-opacity-25">
            <h6 className="text-muted-light mb-2 text-uppercase" style={{letterSpacing: '1px'}}>Humidity</h6>
            <p className="fs-3 fw-semibold mb-0 text-white">{current.humidity}%</p>
          </div>
          <div className="col-4">
            <h6 className="text-muted-light mb-2 text-uppercase" style={{letterSpacing: '1px'}}>Wind</h6>
            <p className="fs-3 fw-semibold mb-0 text-white">{current.windSpeed} <span className="fs-6 fw-normal text-muted-light">m/s</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};