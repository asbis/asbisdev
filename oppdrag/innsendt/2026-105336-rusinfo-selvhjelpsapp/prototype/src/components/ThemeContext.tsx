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

interface CrisisContextType {
  isCrisisVisible: boolean;
  showCrisis: () => void;
  hideCrisis: () => void;
}

const CrisisContext = createContext<CrisisContextType>({
  isCrisisVisible: false,
  showCrisis: () => {},
  hideCrisis: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [palette, setPalette] = useState<Palette>('A');
  const [isCrisisVisible, setIsCrisisVisible] = useState(false);
  const theme = palette === 'A' ? tokens.colors.paletteA : tokens.colors.paletteB;

  const showCrisis = () => setIsCrisisVisible(true);
  const hideCrisis = () => setIsCrisisVisible(false);

  return (
    <ThemeContext.Provider value={{ theme, palette, setPalette }}>
      <CrisisContext.Provider value={{ isCrisisVisible, showCrisis, hideCrisis }}>
        {children}
      </CrisisContext.Provider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export const useCrisis = () => useContext(CrisisContext);
