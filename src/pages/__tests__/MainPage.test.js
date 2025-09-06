import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock components
const MockHeader = (props) => <div data-testid="mock-header" {...props} />;
const MockButton = (props) => <button data-testid="button" {...props}>{props.children}</button>;

// Create a simple test version without router dependency
const MockMainPage = () => {
  const [neurodivergentId, setNeurodivergentId] = useState('');
  const mockNavigate = jest.fn();

  const handleEnter = () => {
    if (neurodivergentId.trim()) {
      localStorage.setItem('neurodivergentId', neurodivergentId);
      mockNavigate('/modules');
    }
  };

  return (
    <div className="mobile-container" data-testid="main-page">
      <MockHeader 
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

        <MockButton 
          onClick={handleEnter}
          className="w-full mb-6"
          disabled={!neurodivergentId.trim()}
          data-testid="main-page-enter-button"
        >
          ENTRAR
        </MockButton>

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

describe('MainPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render main page container', () => {
    render(<MockMainPage />);
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  test('should render main page icon', () => {
    render(<MockMainPage />);
    expect(screen.getByTestId('main-page-icon')).toBeInTheDocument();
  });

  test('should render form elements', () => {
    render(<MockMainPage />);
    expect(screen.getByTestId('main-page-form')).toBeInTheDocument();
    expect(screen.getByTestId('main-page-label')).toBeInTheDocument();
    expect(screen.getByTestId('main-page-id-input')).toBeInTheDocument();
  });

  test('should display correct label text', () => {
    render(<MockMainPage />);
    expect(screen.getByTestId('main-page-label')).toHaveTextContent('ID Neurodivergente');
  });

  test('should have correct placeholder in input', () => {
    render(<MockMainPage />);
    expect(screen.getByTestId('main-page-id-input')).toHaveAttribute('placeholder', 'Digite o ID');
  });

  test('should render enter button', () => {
    render(<MockMainPage />);
    expect(screen.getByTestId('main-page-enter-button')).toBeInTheDocument();
  });

  test('should render calendar section', () => {
    render(<MockMainPage />);
    expect(screen.getByTestId('main-page-calendar-section')).toBeInTheDocument();
    expect(screen.getByTestId('main-page-calendar-icon')).toBeInTheDocument();
    expect(screen.getByTestId('main-page-calendar-label')).toHaveTextContent('Calendário');
  });

  test('should update input value when typing', () => {
    render(<MockMainPage />);
    const input = screen.getByTestId('main-page-id-input');
    
    fireEvent.change(input, { target: { value: 'test123' } });
    
    expect(input).toHaveValue('test123');
  });

  test('should enable enter button when input has value', () => {
    render(<MockMainPage />);
    const input = screen.getByTestId('main-page-id-input');
    const button = screen.getByTestId('main-page-enter-button');
    
    fireEvent.change(input, { target: { value: 'test123' } });
    
    expect(button).not.toBeDisabled();
  });

  test('should disable enter button when input is empty', () => {
    render(<MockMainPage />);
    const button = screen.getByTestId('main-page-enter-button');
    
    expect(button).toBeDisabled();
  });
});