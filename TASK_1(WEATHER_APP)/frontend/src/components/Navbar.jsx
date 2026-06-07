import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark glass-navbar">
      <div className="container">
        <a className="navbar-brand fw-bold mb-0 h1" href="#">
          <i className="bi bi-cloud-sun me-2"></i>Weather App
        </a>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active fw-medium" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white-50" target="_blank" referrerPolicy="no-referrer" href="https://github.com/shiven0nly/PinnacleLabs_Tasks/tree/main/TASK_1(WEATHER_APP)">Github</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;