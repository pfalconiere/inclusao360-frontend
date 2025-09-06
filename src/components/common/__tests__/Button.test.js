import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../Button';

describe('Button Component', () => {
  const mockClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render button with children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByTestId('button')).toHaveTextContent('Click me');
  });

  test('should call onClick when clicked', () => {
    render(<Button onClick={mockClick}>Click me</Button>);
    fireEvent.click(screen.getByTestId('button'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  test('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByTestId('button')).toBeDisabled();
  });

  test('should not call onClick when disabled', () => {
    render(<Button onClick={mockClick} disabled>Disabled Button</Button>);
    fireEvent.click(screen.getByTestId('button'));
    expect(mockClick).not.toHaveBeenCalled();
  });

  test('should apply primary variant classes by default', () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('bg-blue-600', 'text-white');
  });

  test('should apply secondary variant classes', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('bg-gray-600', 'text-white');
  });

  test('should apply outline variant classes', () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('border', 'border-gray-300', 'text-gray-700');
  });

  test('should apply small size classes', () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('px-3', 'py-2', 'text-sm');
  });

  test('should apply medium size classes by default', () => {
    render(<Button>Medium Button</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('px-4', 'py-3', 'text-base');
  });

  test('should apply large size classes', () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('px-6', 'py-4', 'text-lg');
  });

  test('should apply custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    expect(screen.getByTestId('button')).toHaveClass('custom-class');
  });

  test('should handle multiple rapid clicks', () => {
    render(<Button onClick={mockClick}>Rapid Click</Button>);
    const button = screen.getByTestId('button');
    
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    expect(mockClick).toHaveBeenCalledTimes(3);
  });

  test('should pass through additional props', () => {
    render(<Button type="submit" id="test-id">Submit Button</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('id', 'test-id');
  });
});