import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/main');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white" data-testid="splash-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8" data-testid="splash-title">INCLUSÃO 360</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto" data-testid="splash-loading-spinner"></div>
      </div>
    </div>
  );
};

export default SplashScreen;