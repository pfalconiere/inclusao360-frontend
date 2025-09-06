import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';

// Mock components
jest.mock('../../common/Header', () => {
  return function MockHeader(props) {
    return <div data-testid="mock-header" {...props} />;
  };
});

jest.mock('../../common/Button', () => {
  return function MockButton(props) {
    return <button data-testid="button" {...props}>{props.children}</button>;
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
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
};
global.localStorage = mockLocalStorage;

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  test('should render login form', () => {
    renderWithRouter(<Login />);
    expect(screen.getByText('Família')).toBeInTheDocument();
  });

  test('should display correct module name for family', () => {
    renderWithRouter(<Login />);
    expect(screen.getByText('Família')).toBeInTheDocument();
  });

  test('should render login input field', () => {
    renderWithRouter(<Login />);
    expect(screen.getByLabelText('Login')).toBeInTheDocument();
  });

  test('should render password input field', () => {
    renderWithRouter(<Login />);
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
  });

  test('should render forgot password link', () => {
    renderWithRouter(<Login />);
    expect(screen.getByText('Esqueci minha senha')).toBeInTheDocument();
  });

  test('should render enter button', () => {
    renderWithRouter(<Login />);
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  test('should update login field when typing', () => {
    renderWithRouter(<Login />);
    const loginInput = screen.getByLabelText('Login');
    
    fireEvent.change(loginInput, { target: { value: 'testuser' } });
    
    expect(loginInput).toHaveValue('testuser');
  });

  test('should update password field when typing', () => {
    renderWithRouter(<Login />);
    const passwordInput = screen.getByLabelText('Senha');
    
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    
    expect(passwordInput).toHaveValue('testpass');
  });

  test('should disable enter button when fields are empty', () => {
    renderWithRouter(<Login />);
    const button = screen.getByTestId('button');
    
    expect(button).toBeDisabled();
  });

  test('should disable enter button when only login is filled', () => {
    renderWithRouter(<Login />);
    const loginInput = screen.getByLabelText('Login');
    const button = screen.getByTestId('button');
    
    fireEvent.change(loginInput, { target: { value: 'testuser' } });
    
    expect(button).toBeDisabled();
  });

  test('should disable enter button when only password is filled', () => {
    renderWithRouter(<Login />);
    const passwordInput = screen.getByLabelText('Senha');
    const button = screen.getByTestId('button');
    
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    
    expect(button).toBeDisabled();
  });

  test('should enable enter button when both fields are filled', () => {
    renderWithRouter(<Login />);
    const loginInput = screen.getByLabelText('Login');
    const passwordInput = screen.getByLabelText('Senha');
    const button = screen.getByTestId('button');
    
    fireEvent.change(loginInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    
    expect(button).not.toBeDisabled();
  });

  test('should store data and navigate when login is successful', () => {
    renderWithRouter(<Login />);
    const loginInput = screen.getByLabelText('Login');
    const passwordInput = screen.getByLabelText('Senha');
    const button = screen.getByTestId('button');
    
    fireEvent.change(loginInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.click(button);
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('userModule', 'family');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('isAuthenticated', 'true');
    expect(mockNavigate).toHaveBeenCalledWith('/family/dashboard');
  });

  test('should have correct password input type', () => {
    renderWithRouter(<Login />);
    const passwordInput = screen.getByLabelText('Senha');
    
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});