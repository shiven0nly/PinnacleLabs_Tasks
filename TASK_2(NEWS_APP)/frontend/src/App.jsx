import React from 'react';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { SignIn } from './auth/forms/SignIn';
import { SignUp } from './auth/forms/SignUp';
import { NewsArticles } from './pages/NewsArticles';
import { About } from './pages/About';
import { Dashboard } from './pages/Dashboard';
import { Navbar } from './components/ui/navbar';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/news-articles" element={<NewsArticles />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
