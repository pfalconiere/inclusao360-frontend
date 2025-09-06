import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../Dashboard';

// Mock components
jest.mock('../../components/common/Header', () => {
  return function MockHeader(props) {
    return <div data-testid="mock-header" {...props} />;
  };
});

jest.mock('../../components/shared/Timeline', () => {
  return function MockTimeline(props) {
    return <div data-testid="mock-timeline" {...props} />;
  };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ module: 'family' }),
}));

// Mock localStorage
const mockLocalStorage = {
  removeItem: jest.fn(),
};
global.localStorage = mockLocalStorage;

describe('Dashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  test('should render dashboard with family module configuration', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('Dashboard Família')).toBeInTheDocument();
  });

  test('should display correct module icon', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('👨‍👩‍👧‍👦')).toBeInTheDocument();
  });

  test('should render all dashboard action buttons', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('Relatórios')).toBeInTheDocument();
    expect(screen.getByText('Atividades')).toBeInTheDocument();
    expect(screen.getByText('Contatos')).toBeInTheDocument();
    expect(screen.getByText('Configurações')).toBeInTheDocument();
  });

  test('should display correct icons for action buttons', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('📊')).toBeInTheDocument();
    expect(screen.getByText('📋')).toBeInTheDocument();
    expect(screen.getByText('👥')).toBeInTheDocument();
    expect(screen.getByText('⚙️')).toBeInTheDocument();
  });

  test('should render Timeline Recente section', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('Timeline Recente')).toBeInTheDocument();
  });

  test('should render Timeline component', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByTestId('mock-timeline')).toBeInTheDocument();
  });

  test('should render logout button', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('Sair')).toBeInTheDocument();
  });

  test('should render home button', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('should handle logout when logout button is clicked', () => {
    renderWithRouter(<Dashboard />);
    const logoutButton = screen.getByText('Sair').closest('button');
    
    fireEvent.click(logoutButton);
    
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('userModule');
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('isAuthenticated');
    expect(mockNavigate).toHaveBeenCalledWith('/main');
  });

  test('should navigate to main when home button is clicked', () => {
    renderWithRouter(<Dashboard />);
    const homeButton = screen.getByText('Home').closest('button');
    
    fireEvent.click(homeButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/main');
  });

  test('should have hover effects on action buttons', () => {
    renderWithRouter(<Dashboard />);
    const reportButton = screen.getByText('Relatórios').closest('button');
    
    expect(reportButton).toHaveClass('hover:bg-gray-200');
  });

  test('should have fixed footer with correct classes', () => {
    renderWithRouter(<Dashboard />);
    const footer = screen.getByText('Sair').closest('.fixed');
    
    expect(footer).toHaveClass('fixed', 'bottom-0', 'left-0', 'right-0');
  });

  test('should handle multiple clicks on different action buttons', () => {
    renderWithRouter(<Dashboard />);
    
    const buttons = [
      screen.getByText('Relatórios').closest('button'),
      screen.getByText('Atividades').closest('button'),
      screen.getByText('Contatos').closest('button'),
      screen.getByText('Configurações').closest('button'),
    ];
    
    buttons.forEach(button => {
      fireEvent.click(button);
      // These buttons don't have onClick handlers yet, so we're just testing they're clickable
      expect(button).toBeInTheDocument();
    });
  });

  test('should have correct padding classes for content area', () => {
    renderWithRouter(<Dashboard />);
    const contentArea = screen.getByText('Dashboard Família').closest('.pt-20');
    
    expect(contentArea).toHaveClass('pt-20', 'pb-20', 'px-6');
  });
});