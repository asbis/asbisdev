import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Platform, Animated, Dimensions, Easing } from 'react-native';
import { lightTheme, darkTheme, Theme } from './src/theme';
import { Lang } from './src/strings';
import { OnbWelcome, OnbRole, OnbConsent } from './src/screens/Onboarding';
import { Home } from './src/screens/Home';
import { RiskIntro, RiskQuestion, RiskCalc, RiskResult } from './src/screens/Risk';
import { MedsSearch, MedsDetail, WadaSearch, WadaDetail } from './src/screens/Search';
import { Messages, MessageDetail, Asthma, Tue, Report, Contact, Settings, Learn } from './src/screens/Misc';

type HistoryEntry = { route: string; state: any };

export default function App() {
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState<Lang>('nb');
  const [history, setHistory] = useState<HistoryEntry[]>([{ route: 'onb-welcome', state: {} }]);

  const theme: Theme = dark ? darkTheme : lightTheme;
  const cur = history[history.length - 1];

  const nav = (route: string, stateExt: any = {}) => {
    setHistory(h => {
      const last = h[h.length - 1];
      return [...h, { route, state: { ...last.state, ...stateExt } }];
    });
  };

  const setState = (s: any) => {
    setHistory(h => {
      const last = h[h.length - 1];
      return [...h.slice(0, -1), { route: last.route, state: s }];
    });
  };

  const props = { theme, lang, state: cur.state, setState, nav, setLang, dark, setDark };

  const r = cur.route;
  let screen: React.ReactNode;
  if (r === 'onb-welcome') screen = <OnbWelcome {...props}/>;
  else if (r === 'onb-role') screen = <OnbRole {...props}/>;
  else if (r === 'onb-consent') screen = <OnbConsent {...props}/>;
  else if (r === 'home') screen = <Home {...props}/>;
  else if (r === 'risk-intro') screen = <RiskIntro {...props}/>;
  else if (r.startsWith('risk-q-')) screen = <RiskQuestion {...props} step={parseInt(r.split('-')[2], 10)}/>;
  else if (r === 'risk-calc') screen = <RiskCalc {...props}/>;
  else if (r === 'risk-result') screen = <RiskResult {...props}/>;
  else if (r === 'meds-search') screen = <MedsSearch {...props}/>;
  else if (r === 'meds-detail') screen = <MedsDetail {...props}/>;
  else if (r === 'wada-search') screen = <WadaSearch {...props}/>;
  else if (r === 'wada-detail') screen = <WadaDetail {...props}/>;
  else if (r === 'messages') screen = <Messages {...props}/>;
  else if (r === 'message-detail') screen = <MessageDetail {...props}/>;
  else if (r === 'asthma') screen = <Asthma {...props}/>;
  else if (r === 'tue') screen = <Tue {...props}/>;
  else if (r === 'report') screen = <Report {...props}/>;
  else if (r === 'contact') screen = <Contact {...props}/>;
  else if (r === 'settings') screen = <Settings {...props}/>;
  else if (r === 'learn') screen = <Learn {...props}/>;
  else screen = <Home {...props}/>;

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: theme.bg }}>
        <View style={{ flex: 1, maxWidth: Platform.OS === 'web' ? 420 : undefined, width: '100%', alignSelf: 'center', backgroundColor: theme.bg, overflow: 'hidden' }}>
          <ScreenTransition routeKey={r}>{screen}</ScreenTransition>
        </View>
        <StatusBar style={dark ? 'light' : 'dark'}/>
      </View>
    </SafeAreaProvider>
  );
}

const { width: SCREEN_W } = Dimensions.get('window');

const ScreenTransition: React.FC<{ routeKey: string; children: React.ReactNode }> = ({ routeKey, children }) => {
  const slide = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    slide.setValue(SCREEN_W * 0.25);
    opacity.setValue(0);
    Animated.parallel([
      Animated.timing(slide, { toValue: 0, duration: 280, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, [routeKey]);

  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: slide }], opacity }}>
      {children}
    </Animated.View>
  );
};
