import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, Animated, Easing } from 'react-native';
import { Screen, AppBar, LargeTitle, Button, RiskDisplay, MonoCaps, Section } from '../ui';
import { IconArrowRight, IconBarcode, IconInfo, IconDownload, IconChat, IconFlask } from '../icons';
import { STRINGS } from '../strings';
import { RISK_QUESTIONS } from '../data';
import { NavProps } from './types';
import { Theme } from '../theme';
import { haptic } from '../native';
export const RiskIntro: React.FC<NavProps> = ({ theme, nav, lang, state, setState }) => {
  const t = STRINGS[lang].risk;
  const [product, setProduct] = useState<string | null>(null);

  const startScan = () => {
    nav('product-search');
  };

  return (
    <Screen theme={theme} header={<AppBar theme={theme} onBack={() => nav('home')}/>}>
      <View style={{ paddingHorizontal: 20 }}>
        <LargeTitle theme={theme} sub={t.intro_sub}>{t.intro_title}</LargeTitle>

        <View style={{ backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line, borderRadius: 20, padding: 24, flexDirection: 'row', gap: 20, alignItems: 'center', marginTop: 8 }}>
          <View style={{ width: 84, height: 110, borderRadius: 12, backgroundColor: theme.line2, borderWidth: 1.5, borderColor: theme.line, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {product ? (
              <View style={{ width: '100%', height: '100%', backgroundColor: theme.badBg, alignItems: 'center', justifyContent: 'center' }}>
                 <IconFlask size={32} color={theme.bad}/>
              </View>
            ) : (
              <MonoCaps theme={theme} style={{ fontSize: 10 }}>Product</MonoCaps>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <MonoCaps theme={theme}>{t.product_label}</MonoCaps>
            <Text style={{ fontSize: 17, color: theme.ink, fontWeight: '700', marginTop: 6 }}>{product || t.product_none}</Text>
            <Text style={{ fontSize: 14, color: theme.muted, marginTop: 6, lineHeight: 20 }}>
              {product ? t.product_high_risk : t.product_hint}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 16, gap: 10 }}>
          <Button theme={theme} variant={product ? 'secondary' : 'primary'} icon={<IconBarcode size={20}/>} onPress={startScan}>
            {product ? t.scan_new : t.intro_scan}
          </Button>
          {product && <Button theme={theme} variant="ghost" onPress={() => setProduct(null)}>{t.reset}</Button>}
        </View>

        <Section theme={theme} label={t.we_assess} style={{ paddingHorizontal: 0, paddingTop: 40 }}>
...
          <View style={{ backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line, borderRadius: 20, overflow: 'hidden' }}>
            {[t.assess_origin, t.assess_cert, t.assess_ingredients, t.assess_marketing].map((it, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, padding: 18, borderBottomWidth: i < 3 ? 1 : 0, borderColor: theme.line2 }}>
                <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: theme.line2, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontFamily: theme.monoFont, fontSize: 12, color: theme.ink2, fontWeight: '700' }}>{i + 1}</Text>
                </View>
                <Text style={{ fontSize: 15, color: theme.ink, fontWeight: '500' }}>{it}</Text>
              </View>
            ))}
          </View>
        </Section>

        <View style={{ marginTop: 40 }}>
          <Button theme={theme} onPress={() => { setState({ ...state, answers: [] }); nav('risk-q-0'); }} icon={<IconArrowRight size={20}/>}>{t.intro_cta}</Button>
        </View>
      </View>
    </Screen>
  );
};

export const RiskQuestion: React.FC<NavProps & { step: number }> = ({ theme, nav, lang, state, setState, step }) => {
  const t = STRINGS[lang].risk;
  const questions = RISK_QUESTIONS;
  const total = questions.length;
  const q = questions[step];
  const progress = (step + 1) / total;
  const progAnim = useRef(new Animated.Value(step / total)).current;
  useEffect(() => {
    Animated.timing(progAnim, { toValue: progress, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [step]);

  const answer = (val: string) => {
    haptic('selection');
    const answers = [...(state.answers || [])];
    answers[step] = val;
    setState({ ...state, answers });
    setTimeout(() => {
      if (step + 1 >= total) nav('risk-calc');
      else nav(`risk-q-${step + 1}`);
    }, 120);
  };

  const back = () => { if (step === 0) nav('risk-intro'); else nav(`risk-q-${step - 1}`); };

  return (
    <Screen theme={theme} scroll={false} header={<AppBar theme={theme} onBack={back} right={<MonoCaps theme={theme}>{`${step + 1}/${total}`}</MonoCaps>}/>}>
      <View style={{ paddingHorizontal: 24 }}>
        <View style={{ height: 4, backgroundColor: theme.line2, borderRadius: 2, overflow: 'hidden' }}>
          <Animated.View style={{ height: '100%', width: progAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }), backgroundColor: theme.ink }}/>
        </View>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: 'center', paddingBottom: 40 }}>
        <MonoCaps theme={theme} style={{ marginBottom: 20, textAlign: 'center' }}>
          {t.step_of(step + 1, total)}
        </MonoCaps>
        <Text style={{ fontFamily: theme.displayFont, fontSize: 32, lineHeight: 40, color: theme.ink, letterSpacing: -0.8, textAlign: 'center' }}>{q.q}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 32, backgroundColor: theme.surface, padding: 18, borderRadius: 16, borderWidth: 1.5, borderColor: theme.line }}>
          <IconInfo size={20} stroke={2} color={theme.muted}/>
          <Text style={{ fontSize: 14, color: theme.muted, flex: 1, lineHeight: 20, fontWeight: '500' }}>{q.help}</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 24, paddingBottom: 24, gap: 12 }}>
        <Button theme={theme} onPress={() => answer('yes')}>{t.yes}</Button>
        <Button theme={theme} variant="secondary" onPress={() => answer('no')}>{t.no}</Button>
        <Button theme={theme} variant="ghost" onPress={() => answer('unsure')} style={{ minHeight: 44 }}>{t.unsure}</Button>
      </View>
    </Screen>
  );
};


export const RiskCalc: React.FC<NavProps> = ({ theme, nav, lang }) => {
  const t = STRINGS[lang].risk;
  useEffect(() => {
    const id = setTimeout(() => { haptic('success'); nav('risk-result'); }, 2200);
    return () => clearTimeout(id);
  }, []);
  return (
    <Screen theme={theme} scroll={false}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 }}>
        <ActivityIndicator size="large" color={theme.ink} style={{ marginBottom: 32 }}/>
        <Text style={{ fontFamily: theme.displayFont, fontSize: 28, color: theme.ink, letterSpacing: -0.3, marginBottom: 10 }}>{t.calculating}</Text>
        <Text style={{ fontSize: 14, color: theme.muted, textAlign: 'center', lineHeight: 20 }}>{t.calc_sub}</Text>
      </View>
    </Screen>
  );
};

export const RiskResult: React.FC<NavProps> = ({ theme, nav, lang, state }) => {
  const t = STRINGS[lang].risk;
  const questions = RISK_QUESTIONS;
  const answers: string[] = state.answers || [];
  let score = 0;
  answers.forEach((a, i) => {
    const good = questions[i].yesLow ? 'yes' : 'no';
    if (a === 'unsure') score += 0.5;
    else if (a !== good) score += 1;
  });
  const level = Math.min(1, score / questions.length);
  const zone = level < 0.34 ? 'low' : level < 0.67 ? 'mid' : 'high';
  const titles = { low: [t.result_low_title, t.result_low_sub], mid: [t.result_mid_title, t.result_mid_sub], high: [t.result_high_title, t.result_high_sub] }[zone];
  const flags = questions.map((q, i) => {
    const good = q.yesLow ? 'yes' : 'no';
    if (answers[i] && answers[i] !== good) return { q: q.q, severity: 'high' as const };
    if (answers[i] === 'unsure') return { q: q.q, severity: 'mid' as const };
    return null;
  }).filter(Boolean).slice(0, 4) as { q: string; severity: string }[];

  return (
    <Screen theme={theme} header={<AppBar theme={theme} onBack={() => nav('home')} right={<Pressable style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginRight: -8 }}><IconDownload size={22} color={theme.muted}/></Pressable>}/>}>
      <View style={{ paddingHorizontal: 20 }}>
        <MonoCaps theme={theme} style={{ textAlign: 'center', marginBottom: 8 }}>{t.assessment_done}</MonoCaps>
        <RiskDisplay theme={theme} level={level} title={titles[0]} sub={titles[1]} lang={lang}/>

        {flags.length > 0 && (
          <View style={{ marginTop: 32 }}>
            <MonoCaps theme={theme} style={{ marginBottom: 12, paddingHorizontal: 4 }}>
              {zone === 'high' ? t.warnings : t.notes}
            </MonoCaps>
            <View style={{ backgroundColor: theme.surface, borderWidth: 1.5, borderColor: theme.line, borderRadius: 18, overflow: 'hidden' }}>
              {flags.map((f, i) => (
                <View key={i} style={{ paddingVertical: 18, paddingHorizontal: 18, borderBottomWidth: i < flags.length - 1 ? 1 : 0, borderColor: theme.line2, flexDirection: 'row', gap: 14 }}>
                  <View style={{ width: 10, height: 10, borderRadius: 5, marginTop: 6, backgroundColor: f.severity === 'high' ? theme.bad : theme.warn }}/>
                  <Text style={{ flex: 1, fontSize: 15, color: theme.ink2, lineHeight: 22, fontWeight: '500' }}>{f.q}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={{ gap: 10, marginTop: 32 }}>
          {zone !== 'low' && (
            <Button theme={theme} variant="accent" icon={<IconChat size={20}/>} onPress={() => nav('contact')}>{t.contact_adno}</Button>
          )}
          <Button theme={theme} variant="secondary" onPress={() => nav('risk-intro')}>{t.new_check}</Button>
          <Button theme={theme} variant="ghost" onPress={() => nav('home')}>{t.save_result}</Button>
        </View>
      </View>
    </Screen>
  );
};
