import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Button from '../components/common/Button';

const MainPage = () => {
  const [neurodivergentId, setNeurodivergentId] = useState('');
  const navigate = useNavigate();

  const handleEnter = () => {
    if (neurodivergentId.trim()) {
      localStorage.setItem('neurodivergentId', neurodivergentId);
      navigate('/modules');
    }
  };

  return (
    <div className="mobile-container" data-testid="main-page">
      <Header 
        leftIcon="🔔"
        title="360"
        rightIcon="🏠"
      />
      
      <div className="pt-20 pb-6 px-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl" data-testid="main-page-icon">
            📚
          </div>
        </div>

        <div className="mb-6" data-testid="main-page-form">
          <label className="block text-sm font-medium text-gray-700 mb-2" data-testid="main-page-label">
            ID Neurodivergente
          </label>
          <input
            type="text"
            value={neurodivergentId}
            onChange={(e) => setNeurodivergentId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Digite o ID"
            data-testid="main-page-id-input"
          />
        </div>

        <Button 
          onClick={handleEnter}
          className="w-full mb-6"
          disabled={!neurodivergentId.trim()}
          data-testid="main-page-enter-button"
        >
          ENTRAR
        </Button>

        <div className="text-center" data-testid="main-page-calendar-section">
          <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center text-xl" data-testid="main-page-calendar-icon">
            📅
          </div>
          <span className="text-sm text-gray-600" data-testid="main-page-calendar-label">Calendário</span>
        </div>
      </div>
    </div>
  );
};

export default MainPage;