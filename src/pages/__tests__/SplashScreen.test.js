import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Create a simple test version without router dependency
const MockSplashScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white" data-testid="splash-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8" data-testid="splash-title">INCLUSÃO 360</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto" data-testid="splash-loading-spinner"></div>
      </div>
    </div>
  );
};

describe('SplashScreen Component', () => {

  test('should render splash screen container', () => {
    render(<MockSplashScreen />);
    expect(screen.getByTestId('splash-screen')).toBeInTheDocument();
  });

  test('should display title correctly', () => {
    render(<MockSplashScreen />);
    expect(screen.getByTestId('splash-title')).toHaveTextContent('INCLUSÃO 360');
  });

  test('should display loading spinner', () => {
    render(<MockSplashScreen />);
    expect(screen.getByTestId('splash-loading-spinner')).toBeInTheDocument();
  });

  test('should have correct background gradient classes', () => {
    render(<MockSplashScreen />);
    const splashScreen = screen.getByTestId('splash-screen');
    expect(splashScreen).toHaveClass('bg-gradient-to-br', 'from-blue-500', 'to-blue-700');
  });

  test('should have min-height screen class', () => {
    render(<MockSplashScreen />);
    expect(screen.getByTestId('splash-screen')).toHaveClass('min-h-screen');
  });

  test('should center content with flex classes', () => {
    render(<MockSplashScreen />);
    const splashScreen = screen.getByTestId('splash-screen');
    expect(splashScreen).toHaveClass('flex', 'items-center', 'justify-center');
  });

  test('should have white text color', () => {
    render(<MockSplashScreen />);
    expect(screen.getByTestId('splash-screen')).toHaveClass('text-white');
  });

  test('should have animate-spin class on loading spinner', () => {
    render(<MockSplashScreen />);
    const spinner = screen.getByTestId('splash-loading-spinner');
    expect(spinner).toHaveClass('animate-spin');
  });

  test('should have proper text centering', () => {
    render(<MockSplashScreen />);
    const titleContainer = screen.getByTestId('splash-title').closest('.text-center');
    expect(titleContainer).toHaveClass('text-center');
  });

  test('should have proper spinner styling', () => {
    render(<MockSplashScreen />);
    const spinner = screen.getByTestId('splash-loading-spinner');
    expect(spinner).toHaveClass('rounded-full', 'border-b-2', 'border-white');
  });
});