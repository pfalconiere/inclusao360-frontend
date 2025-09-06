// src/App.js
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme/theme';
import './App.css';
import SplashScreen from './pages/SpashScreen';
import MainPage from './pages/MainPage';
import ModuleSelector from './components/auth/ModuleSelector';
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
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
    </ThemeProvider>
  );
}

export default App;