import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Timeline from '../components/shared/Timeline';

const Dashboard = () => {
  const { module } = useParams();
  const navigate = useNavigate();

  const moduleConfig = {
    family: {
      name: 'Família',
      icon: '👨‍👩‍👧‍👦',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    },
    education: {
      name: 'Educação',
      icon: '📚',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    professional: {
      name: 'Profissionais',
      icon: '🩺',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    }
  };

  const currentModule = moduleConfig[module] || moduleConfig.family;

  const handleLogout = () => {
    localStorage.removeItem('userModule');
    localStorage.removeItem('isAuthenticated');
    navigate('/main');
  };

  return (
    <div className="mobile-container">
      <Header 
        leftIcon="👤"
        title={currentModule.name}
        rightIcon="🏠"
        onRightClick={() => navigate('/main')}
      />
      
      <div className="pt-20 pb-20 px-6">
        <div className="text-center mb-6">
          <div className={`w-16 h-16 ${currentModule.bgColor} rounded-full mx-auto mb-3 flex items-center justify-center text-2xl`}>
            {currentModule.icon}
          </div>
          <h2 className={`text-lg font-semibold ${currentModule.color}`}>
            Dashboard {currentModule.name}
          </h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-gray-100 rounded-lg text-center hover:bg-gray-200 transition-colors">
              <div className="text-xl mb-1">📊</div>
              <span className="text-xs">Relatórios</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-center hover:bg-gray-200 transition-colors">
              <div className="text-xl mb-1">📋</div>
              <span className="text-xs">Atividades</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-center hover:bg-gray-200 transition-colors">
              <div className="text-xl mb-1">👥</div>
              <span className="text-xs">Contatos</span>
            </button>
            <button className="p-3 bg-gray-100 rounded-lg text-center hover:bg-gray-200 transition-colors">
              <div className="text-xl mb-1">⚙️</div>
              <span className="text-xs">Configurações</span>
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-md font-medium mb-3">Timeline Recente</h3>
            <Timeline />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-between max-w-sm mx-auto">
          <button 
            onClick={handleLogout}
            className="flex flex-col items-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <span className="text-xl">🚪</span>
            <span className="text-xs mt-1">Sair</span>
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

export default Dashboard;