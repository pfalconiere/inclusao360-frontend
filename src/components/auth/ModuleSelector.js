import React from 'react';
import { useNavigate } from 'react-router-dom';

const ModuleSelector = () => {
  const navigate = useNavigate();

  const modules = [
    {
      id: 'family',
      name: 'Família',
      icon: '👨‍👩‍👧‍👦',
      path: '/family/login',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      id: 'education',
      name: 'Educação',
      icon: '📚',
      path: '/education/login',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'professional',
      name: 'Profissionais',
      icon: '🩺',
      path: '/professional/login',
      color: 'bg-blue-100 text-blue-600'
    }
  ];

  return (
    <div className="mobile-container bg-gray-50 min-h-screen">
      <div className="p-6 pt-12">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">Escolha um Módulo</h1>
          <p className="text-sm text-gray-600 mt-2">Selecione o módulo que deseja acessar</p>
        </div>

        <div className="space-y-4">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => navigate(module.path)}
              className={`w-full p-5 rounded-xl border-2 border-dashed border-gray-300 hover:border-gray-400 hover:shadow-md transition-all ${module.color}`}
            >
              <div className="flex flex-col items-center">
                <div className="text-3xl mb-2">{module.icon}</div>
                <span className="text-md font-medium">{module.name}</span>
              </div>
            </button>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button 
            onClick={() => navigate('/main')}
            className="text-blue-600 hover:text-blue-800 text-sm underline"
          >
            ← Voltar ao início
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleSelector;