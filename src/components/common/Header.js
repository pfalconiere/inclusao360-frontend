import React from 'react';

const Header = ({ leftIcon, title, rightIcon, onLeftClick, onRightClick }) => {
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm"
      data-testid="header"
    >
      <button 
        onClick={onLeftClick}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        data-testid="header-left-button"
      >
        {leftIcon}
      </button>
      
      <h1 
        className="text-xl font-bold text-blue-600"
        data-testid="header-title"
      >
        {title}
      </h1>
      
      <button 
        onClick={onRightClick}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        data-testid="header-right-button"
      >
        {rightIcon}
      </button>
    </header>
  );
};

export default Header;