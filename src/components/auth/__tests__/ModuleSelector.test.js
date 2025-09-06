import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ModuleSelector from '../ModuleSelector';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ModuleSelector Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  test('should render module selector with title', () => {
    renderWithRouter(<ModuleSelector />);
    expect(screen.getByText('Escolha um Módulo')).toBeInTheDocument();
  });

  test('should render subtitle', () => {
    renderWithRouter(<ModuleSelector />);
    expect(screen.getByText('Selecione o módulo que deseja acessar')).toBeInTheDocument();
  });

  test('should render all three module buttons', () => {
    renderWithRouter(<ModuleSelector />);
    expect(screen.getByText('Família')).toBeInTheDocument();
    expect(screen.getByText('Educação')).toBeInTheDocument();
    expect(screen.getByText('Profissionais')).toBeInTheDocument();
  });

  test('should display correct icons for each module', () => {
    renderWithRouter(<ModuleSelector />);
    const buttons = screen.getAllByRole('button');
    const moduleButtons = buttons.filter(btn => btn.textContent.includes('👨‍👩‍👧‍👦') || 
                                                 btn.textContent.includes('📚') || 
                                                 btn.textContent.includes('🩺'));
    expect(moduleButtons).toHaveLength(3);
  });

  test('should navigate to family login when family button is clicked', () => {
    renderWithRouter(<ModuleSelector />);
    const familyButton = screen.getByText('Família').closest('button');
    
    fireEvent.click(familyButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/family/login');
  });

  test('should navigate to education login when education button is clicked', () => {
    renderWithRouter(<ModuleSelector />);
    const educationButton = screen.getByText('Educação').closest('button');
    
    fireEvent.click(educationButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/education/login');
  });

  test('should navigate to professional login when professional button is clicked', () => {
    renderWithRouter(<ModuleSelector />);
    const professionalButton = screen.getByText('Profissionais').closest('button');
    
    fireEvent.click(professionalButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/professional/login');
  });

  test('should render back to home link', () => {
    renderWithRouter(<ModuleSelector />);
    expect(screen.getByText('← Voltar ao início')).toBeInTheDocument();
  });

  test('should navigate to main when back link is clicked', () => {
    renderWithRouter(<ModuleSelector />);
    const backLink = screen.getByText('← Voltar ao início');
    
    fireEvent.click(backLink);
    
    expect(mockNavigate).toHaveBeenCalledWith('/main');
  });

  test('should have correct CSS classes on container', () => {
    renderWithRouter(<ModuleSelector />);
    const container = screen.getByText('Escolha um Módulo').closest('.mobile-container');
    expect(container).toHaveClass('bg-gray-50', 'min-h-screen');
  });

  test('should have hover effects on module buttons', () => {
    renderWithRouter(<ModuleSelector />);
    const familyButton = screen.getByText('Família').closest('button');
    expect(familyButton).toHaveClass('hover:border-gray-400', 'hover:shadow-md');
  });

  test('should have correct color classes for each module', () => {
    renderWithRouter(<ModuleSelector />);
    
    const familyButton = screen.getByText('Família').closest('button');
    expect(familyButton).toHaveClass('bg-pink-100', 'text-pink-600');
    
    const educationButton = screen.getByText('Educação').closest('button');
    expect(educationButton).toHaveClass('bg-green-100', 'text-green-600');
    
    const professionalButton = screen.getByText('Profissionais').closest('button');
    expect(professionalButton).toHaveClass('bg-blue-100', 'text-blue-600');
  });

  test('should handle multiple rapid clicks on same button', () => {
    renderWithRouter(<ModuleSelector />);
    const familyButton = screen.getByText('Família').closest('button');
    
    fireEvent.click(familyButton);
    fireEvent.click(familyButton);
    fireEvent.click(familyButton);
    
    expect(mockNavigate).toHaveBeenCalledTimes(3);
    expect(mockNavigate).toHaveBeenCalledWith('/family/login');
  });

  test('should handle clicks on different module buttons', () => {
    renderWithRouter(<ModuleSelector />);
    
    fireEvent.click(screen.getByText('Família').closest('button'));
    fireEvent.click(screen.getByText('Educação').closest('button'));
    fireEvent.click(screen.getByText('Profissionais').closest('button'));
    
    expect(mockNavigate).toHaveBeenCalledTimes(3);
    expect(mockNavigate).toHaveBeenNthCalledWith(1, '/family/login');
    expect(mockNavigate).toHaveBeenNthCalledWith(2, '/education/login');
    expect(mockNavigate).toHaveBeenNthCalledWith(3, '/professional/login');
  });
});