import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

describe('Header Component', () => {
  const mockLeftClick = jest.fn();
  const mockRightClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render header with default props', () => {
    render(<Header />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  test('should display title correctly', () => {
    render(<Header title="Test Title" />);
    expect(screen.getByTestId('header-title')).toHaveTextContent('Test Title');
  });

  test('should display left icon when provided', () => {
    render(<Header leftIcon="🔔" />);
    expect(screen.getByTestId('header-left-button')).toHaveTextContent('🔔');
  });

  test('should display right icon when provided', () => {
    render(<Header rightIcon="🏠" />);
    expect(screen.getByTestId('header-right-button')).toHaveTextContent('🏠');
  });

  test('should call onLeftClick when left button is clicked', () => {
    render(<Header leftIcon="🔔" onLeftClick={mockLeftClick} />);
    fireEvent.click(screen.getByTestId('header-left-button'));
    expect(mockLeftClick).toHaveBeenCalledTimes(1);
  });

  test('should call onRightClick when right button is clicked', () => {
    render(<Header rightIcon="🏠" onRightClick={mockRightClick} />);
    fireEvent.click(screen.getByTestId('header-right-button'));
    expect(mockRightClick).toHaveBeenCalledTimes(1);
  });

  test('should have correct CSS classes for fixed positioning', () => {
    render(<Header />);
    const header = screen.getByTestId('header');
    expect(header).toHaveClass('fixed', 'top-0', 'left-0', 'right-0');
  });

  test('should have z-index for proper layering', () => {
    render(<Header />);
    const header = screen.getByTestId('header');
    expect(header).toHaveClass('z-10');
  });

  test('should render without icons when not provided', () => {
    render(<Header title="Only Title" />);
    expect(screen.getByTestId('header-left-button')).toBeInTheDocument();
    expect(screen.getByTestId('header-right-button')).toBeInTheDocument();
    expect(screen.getByTestId('header-left-button')).toBeEmptyDOMElement();
    expect(screen.getByTestId('header-right-button')).toBeEmptyDOMElement();
  });

  test('should handle multiple rapid clicks', () => {
    render(<Header leftIcon="🔔" onLeftClick={mockLeftClick} />);
    const leftButton = screen.getByTestId('header-left-button');
    
    fireEvent.click(leftButton);
    fireEvent.click(leftButton);
    fireEvent.click(leftButton);
    
    expect(mockLeftClick).toHaveBeenCalledTimes(3);
  });
});