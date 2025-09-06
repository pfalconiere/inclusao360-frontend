import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Timeline from '../Timeline';

// Mock the Header component since it's already tested separately
jest.mock('../../common/Header', () => {
  return function MockHeader(props) {
    return <div data-testid="mock-header" {...props} />;
  };
});

describe('Timeline Component', () => {
  test('should render timeline container', () => {
    render(<Timeline />);
    expect(screen.getByTestId('timeline')).toBeInTheDocument();
  });

  test('should display username correctly', () => {
    render(<Timeline userName="João Silva" />);
    expect(screen.getByTestId('timeline-username')).toHaveTextContent('João Silva');
  });

  test('should display default username when not provided', () => {
    render(<Timeline />);
    expect(screen.getByTestId('timeline-username')).toHaveTextContent('Nome');
  });

  test('should display correct module label for family', () => {
    render(<Timeline module="family" />);
    expect(screen.getByTestId('timeline-module-label')).toHaveTextContent('Pais / Responsáveis');
  });

  test('should display correct module label for education', () => {
    render(<Timeline module="education" />);
    expect(screen.getByTestId('timeline-module-label')).toHaveTextContent('Professores');
  });

  test('should display correct module label for professional', () => {
    render(<Timeline module="professional" />);
    expect(screen.getByTestId('timeline-module-label')).toHaveTextContent('Profissionais multidisciplinares');
  });

  test('should show education icon for education module', () => {
    render(<Timeline module="education" />);
    expect(screen.getByTestId('timeline-education-icon')).toBeInTheDocument();
  });

  test('should show voice record button for family module', () => {
    render(<Timeline module="family" />);
    expect(screen.getByTestId('timeline-voice-record-button')).toBeInTheDocument();
  });

  test('should toggle voice recording state when button is clicked', () => {
    render(<Timeline module="family" />);
    const voiceButton = screen.getByTestId('timeline-voice-record-button');
    
    // Initial state should be yellow (not recording)
    expect(voiceButton).toHaveClass('bg-yellow-500');
    
    fireEvent.click(voiceButton);
    
    // After click should be red (recording)
    expect(voiceButton).toHaveClass('bg-red-500');
    
    fireEvent.click(voiceButton);
    
    // After second click should be yellow again (not recording)
    expect(voiceButton).toHaveClass('bg-yellow-500');
  });

  test('should update note text when typing in textarea', () => {
    render(<Timeline />);
    const textarea = screen.getByTestId('timeline-note-textarea');
    
    fireEvent.change(textarea, { target: { value: 'Test note' } });
    
    expect(textarea).toHaveValue('Test note');
  });

  test('should update character counter when typing', () => {
    render(<Timeline />);
    const textarea = screen.getByTestId('timeline-note-textarea');
    const counter = screen.getByTestId('timeline-note-counter');
    
    fireEvent.change(textarea, { target: { value: 'Hello world' } });
    
    expect(counter).toHaveTextContent('11/100 palavras');
  });

  test('should display time correctly', () => {
    render(<Timeline />);
    expect(screen.getByTestId('timeline-time-display')).toHaveTextContent('07h:30min');
  });

  test('should show family comment buttons for family module', () => {
    render(<Timeline module="family" />);
    expect(screen.getByTestId('timeline-family-comment-1')).toBeInTheDocument();
    expect(screen.getByTestId('timeline-family-comment-2')).toBeInTheDocument();
  });

  test('should show education comment button for education module', () => {
    render(<Timeline module="education" />);
    expect(screen.getByTestId('timeline-education-comment')).toBeInTheDocument();
  });

  test('should show professional comment button for professional module', () => {
    render(<Timeline module="professional" />);
    expect(screen.getByTestId('timeline-professional-comment')).toBeInTheDocument();
  });

  test('should respect textarea maxLength attribute', () => {
    render(<Timeline />);
    const textarea = screen.getByTestId('timeline-note-textarea');
    
    expect(textarea).toHaveAttribute('maxLength', '100');
  });

  test('should render settings button', () => {
    render(<Timeline />);
    expect(screen.getByTestId('timeline-settings-button')).toBeInTheDocument();
  });
});