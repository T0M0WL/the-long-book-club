import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';

export interface HeaderTheme {
    logoColor: string;
    textColor: string;
    hamburgerColor: string;
    activeLink: string; // 'home' | 'collections' | 'about' | ''
    activeLinkBg: string;
    activeLinkText: string;
}

// Default theme (Safe fallback)
export const defaultHeaderTheme: HeaderTheme = {
    logoColor: '#dbd7bc',
    textColor: '#dbd7bc',
    hamburgerColor: '#dbd7bc',
    activeLink: 'home',
    activeLinkBg: '#dbd7bc',
    activeLinkText: 'var(--color-brand-slate)'
};

interface HeaderContextType {
    theme: HeaderTheme;
    setHeaderTheme: (theme: Partial<HeaderTheme>) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setThemeState] = useState<HeaderTheme>(defaultHeaderTheme);

    const setHeaderTheme = useCallback((newTheme: Partial<HeaderTheme>) => {
        setThemeState(prev => ({ ...prev, ...newTheme }));
    }, []);

    const value = useMemo(() => ({ theme, setHeaderTheme }), [theme, setHeaderTheme]);

    return (
        <HeaderContext.Provider value={value}>
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeaderContext = () => {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error('useHeaderContext must be used within a HeaderThemeProvider');
    }
    return context;
};

// Helper hook for pages to set their theme
export const useSetHeaderTheme = (themeOverride: Partial<HeaderTheme>) => {
    const { setHeaderTheme } = useHeaderContext();

    useEffect(() => {
        setHeaderTheme(themeOverride);
    }, [
        themeOverride.logoColor,
        themeOverride.textColor,
        themeOverride.hamburgerColor,
        themeOverride.activeLink,
        themeOverride.activeLinkBg,
        themeOverride.activeLinkText
    ]);
};
