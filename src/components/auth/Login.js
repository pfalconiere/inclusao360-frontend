import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../common/Header';
import Button from '../common/Button';

const Login = () => {
  const [credentials, setCredentials] = useState({ login: '', password: '' });
  const navigate = useNavigate();
  const { module } = useParams();

  const moduleConfig = {
    family: {
      name: 'Família',
      icon: '👨‍👩‍👧‍👦',
      color: 'text-pink-600'
    },
    education: {
      name: 'Educação',
      icon: '📚',
      color: 'text-green-600'
    },
    professional: {
      name: 'Profissionais',
      icon: '🩺',
      color: 'text-blue-600'
    }
  };

  const currentModule = moduleConfig[module] || moduleConfig.family;

  const handleLogin = () => {
    localStorage.setItem('userModule', module);
    localStorage.setItem('isAuthenticated', 'true');
    navigate(`/${module}/dashboard`);
  };

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mobile-container">
      <Header 
        title="360"
        rightIcon="🏠"
        onRightClick={() => navigate('/main')}
      />

      <div className="pt-20 pb-20 px-6">
        <div className="text-center mb-6">
          <div className={`text-4xl mb-3 ${currentModule.color}`}>
            {currentModule.icon}
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            {currentModule.name}
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Login
            </label>
            <input
              type="text"
              value={credentials.login}
              onChange={(e) => handleInputChange('login', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="text-center">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
              Esqueci minha senha
            </a>
          </div>

          <Button 
            onClick={handleLogin}
            className="w-full"
            disabled={!credentials.login || !credentials.password}
          >
            ENTRAR
          </Button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-between max-w-sm mx-auto">
          <button className="flex flex-col items-center text-gray-500 hover:text-gray-700 transition-colors">
            <span className="text-xl">⚙️</span>
            <span className="text-xs mt-1">Config</span>
          </button>
          <button 
            onClick={() => navigate('/main')}
            className="flex flex-col items-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <span className="text-xl">🏠</span>
            <span className="text-xs mt-1">Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;