// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SplashScreen from './pages/SpashScreen';
import MainPage from './pages/MainPage';
import ModuleSelector from './components/auth/ModuleSelector';
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router basename={process.env.NODE_ENV === 'production' ? '/inclusao360-frontend' : ''}>
      <div className="App">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/modules" element={<ModuleSelector />} />
          <Route path="/:module/login" element={<Login />} />
          <Route path="/:module/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;