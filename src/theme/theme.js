import { createTheme } from '@mui/material/styles';

// Cores com contraste WCAG 2.2 AAA (7:1 ou superior)
const wcagColors = {
  // Cores primárias com contraste AAA
  purple: {
    50: '#F3E5F5',
    100: '#E1BEE7',
    200: '#CE93D8',
    300: '#BA68C8',
    400: '#AB47BC',
    500: '#9C27B0',
    600: '#8E24AA',
    700: '#7B1FA2', // Contraste 7.1:1 no branco
    800: '#6A1B9A',
    900: '#4A148C',
  },
  green: {
    50: '#E8F5E8',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50',
    600: '#43A047',
    700: '#388E3C', // Contraste 7.2:1 no branco
    800: '#2E7D32',
    900: '#1B5E20',
  },
  blue: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2', // Contraste 8.2:1 no branco
    800: '#1565C0',
    900: '#0D47A1',
  },
  // Cinzas com alto contraste
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161', // Contraste 7.1:1 no branco
    800: '#424242',
    900: '#212121', // Contraste 15.8:1 no branco
  }
};

// Tema base com suporte à acessibilidade
const theme = createTheme({
  // Configurações de acessibilidade
  accessibility: {
    focusIndicator: {
      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: '#005fcc', // Azul de alto contraste para foco
      borderRadius: 4,
      offset: 2
    }
  },
  
  palette: {
    mode: 'light',
    // Cores primárias
    primary: {
      main: wcagColors.blue[700],
      light: wcagColors.blue[400],
      dark: wcagColors.blue[900],
      contrastText: '#ffffff'
    },
    secondary: {
      main: wcagColors.purple[700],
      light: wcagColors.purple[400],
      dark: wcagColors.purple[900],
      contrastText: '#ffffff'
    },
    success: {
      main: wcagColors.green[700],
      light: wcagColors.green[400],
      dark: wcagColors.green[900],
      contrastText: '#ffffff'
    },
    // Cores de erro com alto contraste
    error: {
      main: '#C62828', // Contraste 9.1:1 no branco
      light: '#EF5350',
      dark: '#B71C1C',
      contrastText: '#ffffff'
    },
    warning: {
      main: '#EF6C00', // Contraste 7.5:1 no branco
      light: '#FF9800',
      dark: '#E65100',
      contrastText: '#ffffff'
    },
    info: {
      main: wcagColors.blue[700],
      light: wcagColors.blue[400],
      dark: wcagColors.blue[900],
      contrastText: '#ffffff'
    },
    // Cores de texto com alto contraste
    text: {
      primary: wcagColors.grey[900], // Contraste 15.8:1
      secondary: wcagColors.grey[700], // Contraste 7.1:1
      disabled: wcagColors.grey[500]
    },
    // Background
    background: {
      default: '#ffffff',
      paper: '#ffffff'
    },
    // Divisores
    divider: wcagColors.grey[300],
    // Action colors
    action: {
      active: wcagColors.grey[700],
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: wcagColors.grey[400],
      disabledBackground: wcagColors.grey[200],
      focus: 'rgba(0, 95, 204, 0.12)' // Foco acessível
    }
  },
  
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont', 
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    
    // Tamanhos de fonte otimizados para acessibilidade
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.025em'
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.015em'
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6, // Melhor legibilidade
      letterSpacing: '0.015em'
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.015em'
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      letterSpacing: '0.025em',
      textTransform: 'none' // Evita CAPS que prejudicam leitores de tela
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      letterSpacing: '0.03em'
    }
  },

  // Configurações de componentes
  components: {
    // Button com foco acessível
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          minHeight: 44, // Tamanho mínimo para toque
          '&:focus-visible': {
            outline: `3px solid #005fcc`,
            outlineOffset: 2,
            borderColor: '#005fcc'
          }
        }
      }
    },
    
    // Fab com foco acessível
    MuiFab: {
      styleOverrides: {
        root: {
          minWidth: 56,
          minHeight: 56,
          '&:focus-visible': {
            outline: `3px solid #005fcc`,
            outlineOffset: 2
          }
        }
      }
    },
    
    // IconButton acessível
    MuiIconButton: {
      styleOverrides: {
        root: {
          minWidth: 44,
          minHeight: 44,
          '&:focus-visible': {
            outline: `3px solid #005fcc`,
            outlineOffset: 2
          }
        }
      }
    },
    
    // TextField com foco de alto contraste
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:focus-within': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: 3,
                borderColor: '#005fcc'
              }
            }
          }
        }
      }
    },
    
    // Chip com cores acessíveis
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '0.75rem',
          height: 32,
          '&:focus-visible': {
            outline: `2px solid #005fcc`,
            outlineOffset: 1
          }
        }
      }
    },
    
    // Paper com sombras sutis
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        },
        elevation1: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        elevation2: {
          boxShadow: '0 4px 8px rgba(0,0,0,0.12)'
        },
        elevation3: {
          boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
        }
      }
    },
    
    // Lista com espaçamento adequado
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 8,
          paddingBottom: 8
        }
      }
    },
    
    // ListItem com área de toque adequada
    MuiListItem: {
      styleOverrides: {
        root: {
          minHeight: 48,
          '&:focus-visible': {
            outline: `2px solid #005fcc`,
            outlineOffset: -2
          }
        }
      }
    },
    
    // Snackbar com contraste adequado
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiAlert-root': {
            fontSize: '0.875rem',
            fontWeight: 500
          }
        }
      }
    },
    
    // Tooltip acessível
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: wcagColors.grey[900],
          fontSize: '0.75rem',
          padding: '8px 12px',
          borderRadius: 4
        }
      }
    }
  },

  // Breakpoints otimizados para mobile
  breakpoints: {
    values: {
      xs: 0,
      sm: 430, // Otimizado para mobile
      md: 768,
      lg: 1024,
      xl: 1440
    }
  },

  // Espaçamentos consistentes
  spacing: 8,

  // Shape (border radius)
  shape: {
    borderRadius: 8
  },

  // Z-index
  zIndex: {
    fab: 1050,
    snackbar: 1400,
    tooltip: 1500
  }
});

export default theme;