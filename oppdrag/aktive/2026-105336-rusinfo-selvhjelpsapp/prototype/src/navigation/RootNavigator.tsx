import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, BookOpen, BarChart2, Award, Info } from 'lucide-react-native';
import { useTheme } from '../components/ThemeContext';
import { HomeScreen } from '../screens/HomeScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { DagbokScreen } from '../screens/DagbokScreen';
import { OversiktScreen } from '../screens/OversiktScreen';
import { PrestasjonScreen } from '../screens/PrestasjonScreen';
import { InfoScreen } from '../screens/InfoScreen';
import { KriseplanScreen } from '../screens/KriseplanScreen';
import { VeggScreen } from '../screens/VeggScreen';
import { KalenderScreen } from '../screens/KalenderScreen';
import { ArticleScreen } from '../screens/ArticleScreen';
import { DiaryEntryScreen } from '../screens/DiaryEntryScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { SecurityCheckScreen } from '../screens/SecurityCheckScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { Storage } from '../lib/storage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.hairline,
          height: 84,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textFaint,
      }}
    >
      <Tab.Screen 
        name="HjemTab" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Hjem',
          tabBarIcon: ({ color }) => <Home color={color} size={24} />
        }}
      />
      <Tab.Screen 
        name="Dagbok" 
        component={DagbokScreen} 
        options={{
          tabBarIcon: ({ color }) => <BookOpen color={color} size={24} />
        }}
      />
      <Tab.Screen 
        name="Oversikt" 
        component={OversiktScreen} 
        options={{
          tabBarIcon: ({ color }) => <BarChart2 color={color} size={24} />
        }}
      />
      <Tab.Screen 
        name="Prestasjon" 
        component={PrestasjonScreen} 
        options={{
          tabBarIcon: ({ color }) => <Award color={color} size={24} />
        }}
      />
      <Tab.Screen 
        name="Info" 
        component={InfoScreen} 
        options={{
          tabBarIcon: ({ color }) => <Info color={color} size={24} />
        }}
      />
    </Tab.Navigator>
  );
};

export const RootNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [securityEnabled, setSecurityEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      const onboarded = await Storage.getOnboarded();
      const settings = await Storage.getSettings();
      
      setIsOnboarded(onboarded);
      setSecurityEnabled(settings.securityEnabled);
      
      if (!settings.securityEnabled) {
        setIsAuthenticated(true);
      }
      
      setLoading(false);
    })();
  }, []);

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isOnboarded ? (
        <Stack.Screen name="Onboarding">
          {() => <OnboardingScreen onComplete={() => {
            setIsOnboarded(true);
            setIsAuthenticated(true);
          }} />}
        </Stack.Screen>
      ) : !isAuthenticated ? (
        <Stack.Screen name="SecurityCheck">
          {() => <SecurityCheckScreen onAuthenticated={() => setIsAuthenticated(true)} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Kriseplan">
            {({ navigation }) => <KriseplanScreen onClose={() => navigation.goBack()} />}
          </Stack.Screen>
          <Stack.Screen name="Motivasjonsvegg">
            {({ navigation }) => <VeggScreen onBack={() => navigation.goBack()} />}
          </Stack.Screen>
          <Stack.Screen name="Kartlegging">
            {({ navigation }) => <KalenderScreen onBack={() => navigation.goBack()} />}
          </Stack.Screen>
          <Stack.Screen name="Article">
            {(props) => <ArticleScreen {...props} onBack={() => props.navigation.goBack()} />}
          </Stack.Screen>
          <Stack.Screen name="DiaryEntry">
            {(props) => <DiaryEntryScreen {...props} onBack={() => props.navigation.goBack()} />}
          </Stack.Screen>
          <Stack.Screen name="Settings">
            {({ navigation }) => <SettingsScreen onBack={() => navigation.goBack()} />}
          </Stack.Screen>
          <Stack.Screen name="Chat">
            {({ navigation }) => <ChatScreen onBack={() => navigation.goBack()} />}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};
