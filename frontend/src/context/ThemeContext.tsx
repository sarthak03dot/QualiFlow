import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, Theme } from '@mui/material/styles';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem('theme-mode');
        return (saved as ThemeMode) || 'dark';
    });

    useEffect(() => {
        localStorage.setItem('theme-mode', mode);
        document.documentElement.setAttribute('data-theme', mode);
    }, [mode]);

    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main: '#6366f1',
                    },
                    secondary: {
                        main: '#ec4899',
                    },
                    background: {
                        default: mode === 'dark' ? '#0f172a' : '#f8fafc',
                        paper: mode === 'dark' ? '#1e293b' : '#ffffff',
                    },
                    text: {
                        primary: mode === 'dark' ? '#f8fafc' : '#0f172a',
                        secondary: mode === 'dark' ? '#94a3b8' : '#475569',
                    },
                },
                typography: {
                    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                    h1: { fontSize: '2.5rem', fontWeight: 700 },
                    h4: { fontWeight: 800 },
                    button: { textTransform: 'none', fontWeight: 600 },
                },
                components: {
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                borderRadius: 8,
                            },
                        },
                    },
                    MuiPaper: {
                        styleOverrides: {
                            root: {
                                backgroundImage: 'none',
                                border: mode === 'dark' ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                            },
                        },
                    },
                },
            }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeStatus = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useThemeStatus must be used within ThemeProvider');
    return context;
};
