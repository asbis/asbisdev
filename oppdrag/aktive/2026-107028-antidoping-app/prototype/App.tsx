import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Platform, Animated, Dimensions, Easing } from 'react-native';
import { lightTheme, darkTheme, Theme } from './src/theme';
import { Lang } from './src/strings';
import { OnbWelcome, OnbRole, OnbConsent } from './src/screens/Onboarding';
import { Home } from './src/screens/Home';
import { RiskIntro, RiskQuestion, RiskCalc, RiskResult } from './src/screens/Risk';
import { MedsSearch, MedsDetail, WadaSearch, WadaDetail } from './src/screens/Search';
import { Messages, MessageDetail, Asthma, Tue, Report, Contact, Settings, Learn } from './src/screens/Misc';
import { ProductSearch, ProductDetail } from './src/screens/Product';
import { TabBar } from './src/ui';
import { storage, KEYS } from './src/storage';

type HistoryEntry = { route: string; state: any; key: number };

let _idCounter = 0;
const nextKey = () => ++_idCounter;

const MAIN_TABS = ['home', 'meds-search', 'messages', 'learn', 'settings'];

export default function App() {
  const [dark, setDark] = useState<boolean>(() => storage.get(KEYS.darkMode, false));
  const [lang, setLang] = useState<Lang>(() => storage.get<Lang>(KEYS.language, 'nb'));
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const onboarded = storage.get<boolean>(KEYS.onboardingDone, false);
    return [{ route: onboarded ? 'home' : 'onb-welcome', state: {}, key: nextKey() }];
  });
  const [direction, setDirection] = useState<'push' | 'pop' | 'tab' | 'none'>('none');

  useEffect(() => { storage.set(KEYS.darkMode, dark); }, [dark]);
  useEffect(() => { storage.set(KEYS.language, lang); }, [lang]);
  useEffect(() => {
    if (history.some((h) => h.route === 'home')) storage.set(KEYS.onboardingDone, true);
  }, [history]);

  const theme: Theme = dark ? darkTheme : lightTheme;
  const cur = history[history.length - 1];

  const nav = (route: string, stateExt: any = {}) => {
    setHistory((h) => {
      const last = h[h.length - 1];
      if (route === 'home' && last.route.startsWith('onb-')) {
        setDirection('push');
        return [{ route, state: { ...last.state, ...stateExt }, key: nextKey() }];
      }
      setDirection('push');
      return [...h, { route, state: { ...last.state, ...stateExt }, key: nextKey() }];
    });
  };

  const setState = (s: any) => {
    setHistory((h) => {
      const last = h[h.length - 1];
      return [...h.slice(0, -1), { ...last, state: s }];
    });
  };

  const navTab = (dest: string) => {
    setHistory((h) => {
      const last = h[h.length - 1];
      // Tab tap always resets to root for that section — never pushes
      setDirection('tab');
      return [{ route: dest, state: last.state, key: nextKey() }];
    });
  };

  // Wrap nav so screens that pass 'home' from a non-onboarding non-tab context also work
  const navWithBack = (route: string, stateExt: any = {}) => {
    // Treat navigation back to a previous route in stack as 'pop'
    const idx = history.findIndex((h) => h.route === route);
    if (idx >= 0 && idx < history.length - 1) {
      setHistory((h) => {
        setDirection('pop');
        return h.slice(0, idx + 1);
      });
      return;
    }
    nav(route, stateExt);
  };

  const props = { theme, lang, state: cur.state, setState, nav: navWithBack, setLang, dark, setDark };

  const renderScreen = (entry: HistoryEntry) => {
    const r = entry.route;
    const screenProps = { ...props, state: entry.state };
    if (r === 'onb-welcome') return <OnbWelcome {...screenProps}/>;
    if (r === 'onb-role') return <OnbRole {...screenProps}/>;
    if (r === 'onb-consent') return <OnbConsent {...screenProps}/>;
    if (r === 'home') return <Home {...screenProps}/>;
    if (r === 'risk-intro') return <RiskIntro {...screenProps}/>;
    if (r.startsWith('risk-q-')) return <RiskQuestion {...screenProps} step={parseInt(r.split('-')[2], 10)}/>;
    if (r === 'risk-calc') return <RiskCalc {...screenProps}/>;
    if (r === 'risk-result') return <RiskResult {...screenProps}/>;
    if (r === 'meds-search') return <MedsSearch {...screenProps}/>;
    if (r === 'meds-detail') return <MedsDetail {...screenProps}/>;
    if (r === 'wada-search') return <WadaSearch {...screenProps}/>;
    if (r === 'wada-detail') return <WadaDetail {...screenProps}/>;
    if (r === 'messages') return <Messages {...screenProps}/>;
    if (r === 'message-detail') return <MessageDetail {...screenProps}/>;
    if (r === 'asthma') return <Asthma {...screenProps}/>;
    if (r === 'tue') return <Tue {...screenProps}/>;
    if (r === 'report') return <Report {...screenProps}/>;
    if (r === 'contact') return <Contact {...screenProps}/>;
    if (r === 'settings') return <Settings {...screenProps}/>;
    if (r === 'learn') return <Learn {...screenProps}/>;
    if (r === 'product-search') return <ProductSearch {...screenProps}/>;
    if (r === 'product-detail') return <ProductDetail {...screenProps}/>;
    return <Home {...screenProps}/>;
  };

  const r = cur.route;
  const showTabs = !r.startsWith('onb-') && r !== 'risk-intro' && !r.startsWith('risk-q') && r !== 'risk-calc' && r !== 'risk-result';

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: theme.bg }}>
        <View style={{ flex: 1, maxWidth: Platform.OS === 'web' ? 420 : undefined, width: '100%', alignSelf: 'center', backgroundColor: theme.bg, overflow: 'hidden' }}>
          <Stack
            theme={theme}
            history={history}
            direction={direction}
            renderScreen={renderScreen}
            onTransitionEnd={() => setDirection('none')}
          />
          {showTabs && <TabBar theme={theme} current={r} onNav={navTab} lang={lang}/>}
        </View>
        <StatusBar style={dark ? 'light' : 'dark'}/>
      </View>
    </SafeAreaProvider>
  );
}

const { width: SCREEN_W } = Dimensions.get('window');
const PUSH_DURATION = 320;

const Stack: React.FC<{
  theme: Theme;
  history: HistoryEntry[];
  direction: 'push' | 'pop' | 'tab' | 'none';
  renderScreen: (entry: HistoryEntry) => React.ReactNode;
  onTransitionEnd: () => void;
}> = ({ theme, history, direction, renderScreen, onTransitionEnd }) => {
  // Keep an internal "previous" entry visible during a push/pop so we can animate.
  const [animating, setAnimating] = useState(false);
  const prevRef = useRef<HistoryEntry | null>(null);
  const prevHistoryLen = useRef(history.length);
  const top = history[history.length - 1];

  // Animation values: top screen translateX (incoming), bottom screen translateX (outgoing parallax)
  const topX = useRef(new Animated.Value(0)).current;
  const bottomX = useRef(new Animated.Value(0)).current;
  const tabFade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const lenDelta = history.length - prevHistoryLen.current;
    prevHistoryLen.current = history.length;

    if (direction === 'none') return;

    // Capture the previous top before this render
    // For push: prev = the screen before top in history (history[length-2])
    // For pop:  prev = the just-removed entry — we don't have it; use the historic deeper one already gone. We simulate with current second-to-top + sliding the top out.
    // We always render top + the one beneath.
    const beneath = history.length >= 2 ? history[history.length - 2] : null;

    if (direction === 'push' && lenDelta > 0) {
      // New screen comes from the right, old screen (beneath) parallaxes left
      prevRef.current = beneath;
      topX.setValue(SCREEN_W);
      bottomX.setValue(0);
      setAnimating(true);
      Animated.parallel([
        Animated.timing(topX, { toValue: 0, duration: PUSH_DURATION, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(bottomX, { toValue: -SCREEN_W * 0.28, duration: PUSH_DURATION, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]).start(() => {
        bottomX.setValue(0);
        setAnimating(false);
        prevRef.current = null;
        onTransitionEnd();
      });
    } else if (direction === 'pop' && lenDelta < 0) {
      // The top (current) just appeared; the screen we're leaving (the popped one) we no longer have, so we render top normally and slide an "outgoing" snapshot to the right using prevRef captured last render.
      // To still get the iOS-feel without a snapshot, animate top in from -28% to 0 with overlay fading.
      topX.setValue(-SCREEN_W * 0.28);
      bottomX.setValue(0);
      setAnimating(true);
      Animated.timing(topX, { toValue: 0, duration: PUSH_DURATION, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start(() => {
        setAnimating(false);
        prevRef.current = null;
        onTransitionEnd();
      });
    } else if (direction === 'tab') {
      tabFade.setValue(0);
      setAnimating(false);
      Animated.timing(tabFade, { toValue: 1, duration: 200, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start(() => onTransitionEnd());
    }
  }, [history, direction]);

  const renderTop = renderScreen(top);
  const beneathEntry = history.length >= 2 ? history[history.length - 2] : null;
  const renderBeneath = beneathEntry ? renderScreen(beneathEntry) : null;

  const isPushAnim = animating && direction === 'push';
  const isPopAnim = animating && direction === 'pop';

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* Beneath layer — rendered during push to parallax out */}
      {isPushAnim && renderBeneath && (
        <Animated.View
          pointerEvents="none"
          style={{
            ...StyleSheetAbsoluteFill,
            transform: [{ translateX: bottomX }],
          }}
        >
          {renderBeneath}
        </Animated.View>
      )}
      {/* Top layer */}
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateX: isPushAnim || isPopAnim ? topX : 0 }],
          opacity: direction === 'tab' ? tabFade : 1,
          // shadow on left edge while sliding
          shadowColor: '#000',
          shadowOpacity: isPushAnim ? 0.18 : 0,
          shadowRadius: 18,
          shadowOffset: { width: -4, height: 0 },
          ...(Platform.OS === 'web' ? { boxShadow: isPushAnim ? '-4px 0 18px rgba(0,0,0,0.18)' : 'none' } : {}),
        }}
      >
        {renderTop}
      </Animated.View>
    </View>
  );
};

const StyleSheetAbsoluteFill = {
  position: 'absolute' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};
