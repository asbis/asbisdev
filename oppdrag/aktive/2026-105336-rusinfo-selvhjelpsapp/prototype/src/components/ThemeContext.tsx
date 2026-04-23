import React, { createContext, useContext, useState } from 'react';
import { tokens, Theme } from '../theme/tokens';

type Palette = 'A' | 'B';

interface ThemeContextType {
  theme: Theme;
  palette: Palette;
  setPalette: (p: Palette) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: tokens.colors.paletteA,
  palette: 'A',
  setPalette: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [palette, setPalette] = useState<Palette>('A');
  const theme = palette === 'A' ? tokens.colors.paletteA : tokens.colors.paletteB;

  return (
    <ThemeContext.Provider value={{ theme, palette, setPalette }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
