import { Theme } from '../theme';
import { Lang } from '../strings';

export type NavProps = {
  theme: Theme;
  lang: Lang;
  nav: (route: string, stateExt?: any) => void;
  state: any;
  setState: (s: any) => void;
  setLang: (l: Lang) => void;
  dark: boolean;
  setDark: (d: boolean) => void;
};
