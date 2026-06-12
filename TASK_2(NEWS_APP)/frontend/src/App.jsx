import React from 'react';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Home } from './pages/Home';
import { SignIn } from './auth/forms/SignIn';
import { SignUp } from './auth/forms/SignUp';
import { NewsArticles } from './pages/NewsArticles';
import { About } from './pages/About';
import { Dashboard } from './pages/Dashboard';
import { Navbar } from './components/ui/navbar';
import Footer from './components/ui/footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PrivateRoute from './components/PrivateRoute';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" richColors />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/news-articles" element={<NewsArticles />} />
          <Route path="/about" element={<About />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
