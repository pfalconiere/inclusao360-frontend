import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Fab,
  Box,
  Typography,
  Chip,
  Zoom,
  Paper,
  LinearProgress,
  IconButton,
  Tooltip,
  useTheme,
  alpha
} from '@mui/material';
import {
  Mic,
  Stop,
  PlayArrow,
  Pause,
  Send,
  Close,
  VolumeUp
} from '@mui/icons-material';

const VoiceRecordFab = ({ 
  onAudioReady,
  position = { bottom: 24, right: 24 },
  disabled = false 
}) => {
  const theme = useTheme();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const recordingInterval = useRef(null);
  const audioElement = useRef(null);

  // Limpar recursos ao desmontar
  useEffect(() => {
    return () => {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
      if (audioElement.current) {
        audioElement.current.pause();
        audioElement.current.src = '';
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });

      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : 'audio/webm'
      });

      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { 
          type: mediaRecorder.current.mimeType 
        });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.current.start(100);
      setIsRecording(true);
      setRecordingTime(0);
      setIsExpanded(true);

      recordingInterval.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Erro ao iniciar gravação:', error);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      setIsRecording(false);
      clearInterval(recordingInterval.current);
    }
  }, []);

  const playAudio = useCallback(() => {
    if (audioBlob && !isPlaying) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioElement.current = new Audio(audioUrl);
      
      setIsPlaying(true);
      audioElement.current.play();

      audioElement.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
    } else if (isPlaying && audioElement.current) {
      audioElement.current.pause();
      setIsPlaying(false);
    }
  }, [audioBlob, isPlaying]);

  const handleSend = useCallback(() => {
    if (audioBlob && onAudioReady) {
      onAudioReady(audioBlob, recordingTime);
    }
    handleReset();
  }, [audioBlob, recordingTime, onAudioReady]);

  const handleReset = useCallback(() => {
    setAudioBlob(null);
    setRecordingTime(0);
    setIsExpanded(false);
    setIsPlaying(false);
    
    if (audioElement.current) {
      audioElement.current.pause();
      audioElement.current.src = '';
    }
  }, []);

  // FAB principal
  if (!isExpanded && !isRecording && !audioBlob) {
    return (
      <Zoom in={!disabled}>
        <Fab
          color="primary"
          onClick={startRecording}
          disabled={disabled}
          sx={{
            position: 'fixed',
            bottom: position.bottom,
            right: position.right,
            zIndex: theme.zIndex.fab,
            boxShadow: 4,
            '&:hover': {
              transform: 'scale(1.1)',
              transition: 'transform 0.2s ease-in-out'
            }
          }}
          aria-label="Iniciar gravação de voz"
        >
          <Mic />
        </Fab>
      </Zoom>
    );
  }

  // Widget expandido
  return (
    <Zoom in={isExpanded || isRecording || !!audioBlob}>
      <Paper
        elevation={8}
        sx={{
          position: 'fixed',
          bottom: position.bottom,
          right: position.right,
          zIndex: theme.zIndex.fab,
          borderRadius: 3,
          overflow: 'hidden',
          minWidth: 280,
          maxWidth: 320,
          bgcolor: 'background.paper',
          border: `2px solid ${theme.palette.primary.main}`
        }}
        role="region"
        aria-label="Controles de gravação de voz"
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: isRecording ? 'error.main' : audioBlob ? 'success.main' : 'primary.main',
            color: 'white',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isRecording ? (
              <>
                <VolumeUp sx={{ animation: 'pulse 1.5s infinite' }} />
                <Typography variant="body2" fontWeight="medium">
                  Gravando...
                </Typography>
              </>
            ) : audioBlob ? (
              <>
                <VolumeUp />
                <Typography variant="body2" fontWeight="medium">
                  Áudio Pronto
                </Typography>
              </>
            ) : (
              <>
                <Mic />
                <Typography variant="body2" fontWeight="medium">
                  Gravação de Voz
                </Typography>
              </>
            )}
          </Box>
          
          <IconButton
            size="small"
            onClick={handleReset}
            sx={{ color: 'white' }}
            aria-label="Fechar controles de gravação"
          >
            <Close />
          </IconButton>
        </Box>

        {/* Conteúdo */}
        <Box sx={{ p: 2 }}>
          {/* Timer e Progress */}
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Typography 
              variant="h6" 
              component="div"
              aria-live="polite"
              aria-label={`Tempo de gravação: ${formatTime(recordingTime)}`}
            >
              {formatTime(recordingTime)}
            </Typography>
            
            {isRecording && (
              <LinearProgress 
                sx={{ mt: 1 }}
                color="error"
                aria-label="Indicador de gravação em andamento"
              />
            )}
          </Box>

          {/* Status */}
          {isRecording && (
            <Box sx={{ mb: 2, textAlign: 'center' }}>
              <Chip
                label="🔴 REC"
                size="small"
                sx={{
                  bgcolor: 'error.100',
                  color: 'error.dark',
                  fontWeight: 'bold',
                  animation: 'pulse 1s infinite'
                }}
                aria-label="Gravação ativa"
              />
            </Box>
          )}

          {audioBlob && (
            <Box sx={{ mb: 2, textAlign: 'center' }}>
              <Chip
                icon={<VolumeUp />}
                label={`Áudio ${formatTime(recordingTime)}`}
                size="small"
                color="success"
                variant="outlined"
                aria-label={`Áudio gravado com duração de ${formatTime(recordingTime)}`}
              />
            </Box>
          )}

          {/* Controles */}
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 1, 
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {isRecording ? (
              <Tooltip title="Parar gravação">
                <IconButton
                  onClick={stopRecording}
                  sx={{
                    bgcolor: 'error.main',
                    color: 'white',
                    minWidth: 48,
                    minHeight: 48,
                    '&:hover': {
                      bgcolor: 'error.dark'
                    }
                  }}
                  aria-label="Parar gravação"
                >
                  <Stop />
                </IconButton>
              </Tooltip>
            ) : audioBlob ? (
              <>
                <Tooltip title={isPlaying ? "Pausar áudio" : "Reproduzir áudio"}>
                  <IconButton
                    onClick={playAudio}
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      minWidth: 48,
                      minHeight: 48,
                      '&:hover': {
                        bgcolor: 'primary.dark'
                      }
                    }}
                    aria-label={isPlaying ? "Pausar reprodução do áudio" : "Reproduzir áudio gravado"}
                  >
                    {isPlaying ? <Pause /> : <PlayArrow />}
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Enviar áudio">
                  <IconButton
                    onClick={handleSend}
                    sx={{
                      bgcolor: 'success.main',
                      color: 'white',
                      minWidth: 48,
                      minHeight: 48,
                      '&:hover': {
                        bgcolor: 'success.dark'
                      }
                    }}
                    aria-label="Enviar áudio gravado"
                  >
                    <Send />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Tooltip title="Iniciar gravação">
                <IconButton
                  onClick={startRecording}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    minWidth: 48,
                    minHeight: 48,
                    '&:hover': {
                      bgcolor: 'primary.dark'
                    }
                  }}
                  aria-label="Iniciar nova gravação"
                >
                  <Mic />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          {/* Dicas de uso */}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              {isRecording 
                ? "Fale claramente próximo ao microfone"
                : audioBlob 
                ? "Reproduza para revisar antes de enviar"
                : "Clique no microfone para gravar"
              }
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Zoom>
  );
};

export default VoiceRecordFab;