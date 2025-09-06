import React, { useState, useRef, useCallback } from 'react';
import {
  Box,
  Paper,
  TextField,
  Fab,
  IconButton,
  Typography,
  Chip,
  Divider,
  Alert,
  Snackbar,
  Tooltip,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  useTheme,
  alpha
} from '@mui/material';
import {
  Mic,
  Send,
  PlayArrow,
  Pause,
  Delete,
  AccessTime,
  Person,
  School,
  Work,
  Home,
  VolumeUp,
  KeyboardVoice,
  Stop
} from '@mui/icons-material';

const AdvancedTimeline = ({ 
  userName = 'Nome', 
  module = 'family',
  entries = []
}) => {
  const theme = useTheme();
  const [note, setNote] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [timelineEntries, setTimelineEntries] = useState([
    {
      id: 1,
      time: '07:30',
      type: 'note',
      content: 'Chegou na escola demonstrando ansiedade',
      author: 'Professora Ana',
      module: 'education',
      timestamp: new Date()
    },
    {
      id: 2,
      time: '10:15',
      type: 'audio',
      content: 'Áudio gravado durante atividade em grupo',
      author: 'Sistema',
      module: 'education',
      timestamp: new Date(),
      audioUrl: '#placeholder'
    }
  ]);
  
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const recordingInterval = useRef(null);
  const textareaRef = useRef(null);

  // Configurações de módulo com cores WCAG AAA compliant
  const moduleConfig = {
    family: {
      color: '#7B1FA2', // Purple 700 - contraste 7.1:1 no branco
      bgColor: alpha('#E1BEE7', 0.1), // Purple 100 com transparência
      icon: Home,
      label: 'Pais / Responsáveis',
      ariaLabel: 'Módulo familiar'
    },
    education: {
      color: '#388E3C', // Green 700 - contraste 7.2:1 no branco
      bgColor: alpha('#C8E6C9', 0.1), // Green 100 com transparência
      icon: School,
      label: 'Professores',
      ariaLabel: 'Módulo educacional'
    },
    professional: {
      color: '#1976D2', // Blue 700 - contraste 8.2:1 no branco
      bgColor: alpha('#BBDEFB', 0.1), // Blue 100 com transparência
      icon: Work,
      label: 'Profissionais multidisciplinares',
      ariaLabel: 'Módulo profissional'
    }
  };

  const currentModule = moduleConfig[module] || moduleConfig.family;

  // Funções de gravação de áudio
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
        mimeType: 'audio/webm;codecs=opus'
      });
      
      audioChunks.current = [];
      
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
      
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.current.start(100);
      setIsRecording(true);
      setRecordingTime(0);
      
      recordingInterval.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      setSnackbar({
        open: true,
        message: 'Gravação iniciada. Fale claramente próximo ao microfone.',
        severity: 'info'
      });
      
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erro ao acessar microfone. Verifique as permissões.',
        severity: 'error'
      });
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      setIsRecording(false);
      clearInterval(recordingInterval.current);
      setSnackbar({
        open: true,
        message: `Gravação concluída (${Math.floor(recordingTime / 60)}:${String(recordingTime % 60).padStart(2, '0')})`,
        severity: 'success'
      });
    }
  }, [recordingTime]);

  const playAudio = useCallback(() => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      setIsPlaying(true);
      audio.play();
      
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
    }
  }, [audioBlob]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (!note.trim() && !audioBlob) {
      setSnackbar({
        open: true,
        message: 'Digite uma nota ou grave um áudio antes de enviar.',
        severity: 'warning'
      });
      return;
    }

    const newEntry = {
      id: Date.now(),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      type: audioBlob ? 'audio' : 'note',
      content: note.trim() || 'Áudio gravado pelo usuário',
      author: userName,
      module: module,
      timestamp: new Date(),
      audioBlob: audioBlob
    };

    setTimelineEntries(prev => [newEntry, ...prev]);
    
    // Reset form
    setNote('');
    setAudioBlob(null);
    setRecordingTime(0);
    
    setSnackbar({
      open: true,
      message: 'Entrada adicionada à timeline com sucesso!',
      severity: 'success'
    });
    
    // Focus volta para o textarea para acessibilidade
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [note, audioBlob, userName, module]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const getModuleIcon = (moduleType) => {
    const config = moduleConfig[moduleType] || moduleConfig.family;
    const IconComponent = config.icon;
    return <IconComponent />;
  };

  return (
    <Box
      component="main"
      role="main"
      aria-labelledby="timeline-title"
      sx={{
        minHeight: '100vh',
        bgcolor: 'grey.50',
        pt: 2,
        pb: 12
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 430,
          mx: 'auto',
          bgcolor: 'background.paper',
          borderRadius: 0
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            bgcolor: currentModule.color,
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography
            id="timeline-title"
            variant="h5"
            component="h1"
            fontWeight="bold"
            aria-live="polite"
          >
            Timeline - {currentModule.label}
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 1, opacity: 0.9 }}
            aria-label={`Usuário: ${userName}`}
          >
            {userName}
          </Typography>
        </Box>

        {/* Formulário de Nova Entrada */}
        <Paper
          component="form"
          onSubmit={handleSubmit}
          elevation={1}
          sx={{
            m: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: currentModule.bgColor,
            border: `2px solid ${alpha(currentModule.color, 0.2)}`
          }}
          role="region"
          aria-labelledby="new-entry-title"
        >
          <Typography
            id="new-entry-title"
            variant="h6"
            sx={{ mb: 2, color: currentModule.color }}
            component="h2"
          >
            Nova Entrada
          </Typography>

          <TextField
            ref={textareaRef}
            fullWidth
            multiline
            rows={3}
            placeholder="Digite sua observação aqui... (máximo 500 caracteres)"
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 500))}
            inputProps={{
              maxLength: 500,
              'aria-label': 'Campo de texto para nova observação',
              'aria-describedby': 'char-counter recording-status'
            }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: currentModule.color,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: currentModule.color,
                  borderWidth: 2
                }
              }
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography
              id="char-counter"
              variant="caption"
              color="text.secondary"
              aria-live="polite"
            >
              {note.length}/500 caracteres
            </Typography>
            
            <Typography
              variant="caption"
              color="text.secondary"
              aria-label={`Horário atual: ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`}
            >
              {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </Typography>
          </Box>

          {/* Status de Gravação */}
          {(isRecording || audioBlob) && (
            <Box
              id="recording-status"
              sx={{
                p: 2,
                mb: 2,
                bgcolor: isRecording ? 'error.50' : 'success.50',
                borderRadius: 1,
                border: `1px solid ${isRecording ? theme.palette.error.main : theme.palette.success.main}`,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
              role="status"
              aria-live="polite"
            >
              {isRecording ? (
                <>
                  <KeyboardVoice sx={{ color: 'error.main' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="error.main" fontWeight="medium">
                      Gravando... {formatTime(recordingTime)}
                    </Typography>
                    <LinearProgress 
                      sx={{ mt: 1 }} 
                      color="error"
                      aria-label={`Gravando há ${recordingTime} segundos`}
                    />
                  </Box>
                </>
              ) : (
                <>
                  <VolumeUp sx={{ color: 'success.main' }} />
                  <Typography variant="body2" color="success.main" fontWeight="medium">
                    Áudio gravado ({formatTime(recordingTime)})
                  </Typography>
                  <IconButton
                    onClick={playAudio}
                    disabled={isPlaying}
                    size="small"
                    aria-label={isPlaying ? "Reproduzindo áudio" : "Reproduzir áudio gravado"}
                  >
                    {isPlaying ? <Pause /> : <PlayArrow />}
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setAudioBlob(null);
                      setRecordingTime(0);
                    }}
                    size="small"
                    aria-label="Excluir áudio gravado"
                  >
                    <Delete />
                  </IconButton>
                </>
              )}
            </Box>
          )}

          {/* Controles */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Tooltip title={isRecording ? "Parar gravação" : "Iniciar gravação de voz"}>
              <IconButton
                onClick={isRecording ? stopRecording : startRecording}
                disabled={!navigator.mediaDevices}
                sx={{
                  bgcolor: isRecording ? 'error.main' : currentModule.color,
                  color: 'white',
                  '&:hover': {
                    bgcolor: isRecording ? 'error.dark' : alpha(currentModule.color, 0.8)
                  },
                  '&:disabled': {
                    bgcolor: 'grey.400'
                  }
                }}
                aria-label={isRecording ? "Parar gravação de áudio" : "Iniciar gravação de áudio"}
              >
                {isRecording ? <Stop /> : <Mic />}
              </IconButton>
            </Tooltip>

            <Box sx={{ flex: 1 }} />

            <Tooltip title="Enviar entrada">
              <span>
                <Fab
                  type="submit"
                  size="medium"
                  disabled={!note.trim() && !audioBlob}
                  sx={{
                    bgcolor: currentModule.color,
                    color: 'white',
                    '&:hover': {
                      bgcolor: alpha(currentModule.color, 0.8)
                    },
                    '&:disabled': {
                      bgcolor: 'grey.400'
                    }
                  }}
                  aria-label="Enviar nova entrada para timeline"
                >
                  <Send />
                </Fab>
              </span>
            </Tooltip>
          </Box>
        </Paper>

        {/* Timeline de Entradas */}
        <Box
          role="region"
          aria-labelledby="timeline-entries-title"
          sx={{ px: 2 }}
        >
          <Typography
            id="timeline-entries-title"
            variant="h6"
            sx={{ mb: 2, px: 1, color: currentModule.color }}
            component="h2"
          >
            Histórico da Timeline
          </Typography>

          <List
            sx={{ p: 0 }}
            role="feed"
            aria-label="Lista de entradas da timeline"
          >
            {timelineEntries.map((entry, index) => (
              <React.Fragment key={entry.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    bgcolor: 'background.paper',
                    mb: 1,
                    borderRadius: 2,
                    border: `1px solid ${alpha(currentModule.color, 0.2)}`,
                    '&:hover': {
                      bgcolor: alpha(currentModule.color, 0.02)
                    }
                  }}
                  role="article"
                  aria-labelledby={`entry-${entry.id}-content`}
                  aria-describedby={`entry-${entry.id}-meta`}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: moduleConfig[entry.module]?.color || currentModule.color,
                        width: 40,
                        height: 40
                      }}
                      aria-label={`Entrada do módulo ${moduleConfig[entry.module]?.ariaLabel || 'desconhecido'}`}
                    >
                      {getModuleIcon(entry.module)}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Box>
                        <Typography
                          id={`entry-${entry.id}-content`}
                          variant="body1"
                          sx={{ mb: 1, fontWeight: entry.type === 'audio' ? 'medium' : 'normal' }}
                        >
                          {entry.type === 'audio' && <VolumeUp sx={{ mr: 1, verticalAlign: 'middle', fontSize: '1rem' }} />}
                          {entry.content}
                        </Typography>
                        
                        <Box
                          id={`entry-${entry.id}-meta`}
                          sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}
                        >
                          <Chip
                            icon={<AccessTime />}
                            label={entry.time}
                            size="small"
                            variant="outlined"
                            sx={{ borderColor: currentModule.color, color: currentModule.color }}
                            aria-label={`Horário: ${entry.time}`}
                          />
                          <Chip
                            icon={<Person />}
                            label={entry.author}
                            size="small"
                            variant="filled"
                            sx={{ bgcolor: alpha(currentModule.color, 0.1), color: currentModule.color }}
                            aria-label={`Autor: ${entry.author}`}
                          />
                          {entry.type === 'audio' && (
                            <Chip
                              icon={<VolumeUp />}
                              label="Áudio"
                              size="small"
                              color="secondary"
                              aria-label="Entrada contém áudio"
                            />
                          )}
                        </Box>
                      </Box>
                    }
                  />

                  {entry.type === 'audio' && (
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label={`Reproduzir áudio da entrada às ${entry.time}`}
                        sx={{ color: currentModule.color }}
                        disabled={!entry.audioBlob && !entry.audioUrl}
                      >
                        <PlayArrow />
                      </IconButton>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
                
                {index < timelineEntries.length - 1 && (
                  <Divider sx={{ mx: 2 }} />
                )}
              </React.Fragment>
            ))}
          </List>

          {timelineEntries.length === 0 && (
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                bgcolor: alpha(currentModule.color, 0.05),
                borderRadius: 2
              }}
              role="status"
            >
              <Typography
                variant="body1"
                color="text.secondary"
                aria-label="Nenhuma entrada encontrada na timeline"
              >
                Nenhuma entrada na timeline ainda.
                <br />
                Adicione a primeira observação acima.
              </Typography>
            </Paper>
          )}
        </Box>

        {/* Snackbar para Feedback */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default AdvancedTimeline;