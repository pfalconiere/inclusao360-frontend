import React, { useState } from 'react';
import Header from '../common/Header';

const Timeline = ({ module, userName = 'Nome' }) => {
  const [note, setNote] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const moduleLabels = {
    family: 'Pais / Responsáveis',
    education: 'Professores',
    professional: 'Profissionais multidisciplinares'
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="mobile-container" data-testid="timeline">
      <Header 
        title="360"
        rightIcon="👨‍👩‍👧‍👦"
      />

      <div className="p-4">
        <div className="flex items-center mb-4" data-testid="timeline-header">
          <div 
            className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl"
            data-testid="timeline-avatar"
          >
            📷
          </div>
          <div className="ml-3">
            <div className="font-medium text-gray-800" data-testid="timeline-username">{userName}</div>
            <div className="text-sm text-gray-500" data-testid="timeline-module-label">{moduleLabels[module]}</div>
          </div>
          {module === 'education' && (
            <div className="ml-auto">
              <div 
                className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center"
                data-testid="timeline-education-icon"
              >
                📚
              </div>
            </div>
          )}
          {module === 'family' && (
            <div className="ml-auto">
              <button 
                onClick={handleVoiceRecord}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isRecording ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
                }`}
                data-testid="timeline-voice-record-button"
              >
                🎤
              </button>
            </div>
          )}
        </div>

        <div 
          className="bg-gray-100 rounded-lg p-4 mb-4 relative"
          data-testid="timeline-time-display"
        >
          <div className="text-2xl font-bold text-gray-800">07h:30min</div>
        </div>

        <div className="mb-4" data-testid="timeline-note-section">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="máximo 100 palavras"
            maxLength={100}
            className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            data-testid="timeline-note-textarea"
          />
          <div className="text-xs text-gray-500 mt-1" data-testid="timeline-note-counter">
            {note.length}/100 palavras
          </div>
        </div>

        <div className="mb-4" data-testid="timeline-comments-section">
          <div className="text-sm font-medium text-gray-700 mb-2">Comentários</div>
          <div className="flex space-x-2" data-testid="timeline-comments-buttons">
            {module === 'family' && (
              <>
                <button 
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center"
                  data-testid="timeline-family-comment-1"
                >
                  📋
                </button>
                <button 
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center"
                  data-testid="timeline-family-comment-2"
                >
                  🎓
                </button>
              </>
            )}
            {module === 'education' && (
              <button 
                className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center"
                data-testid="timeline-education-comment"
              >
                📋
              </button>
            )}
            {module === 'professional' && (
              <button 
                className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center"
                data-testid="timeline-professional-comment"
              >
                🎓
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-center">
        <button 
          className="flex flex-col items-center text-gray-500"
          data-testid="timeline-settings-button"
        >
          <span className="text-xl">⚙️</span>
        </button>
      </div>
    </div>
  );
};

export default Timeline;