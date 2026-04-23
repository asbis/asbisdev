import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInDays, parseISO } from 'date-fns';

const KEYS = {
  SETTINGS: 'kord_settings',
  ENTRIES: 'kord_entries',
  ONBOARDED: 'kord_onboarded',
};

export const Storage = {
  async getSettings() {
    const data = await AsyncStorage.getItem(KEYS.SETTINGS);
    return data ? JSON.parse(data) : { 
      palette: 'A', 
      securityEnabled: false, 
      pin: null, 
      biometrics: false, 
      startDate: new Date().toISOString(),
      dailyCost: 400,
      usageFrequency: 'daily',
      costPerUse: 400,
      contact: { name: 'Siri', phone: '+47 •• •• •• ••' }
    };
  },

  async saveSettings(settings: any) {
    const current = await this.getSettings();
    await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify({ ...current, ...settings }));
  },

  async getEntries() {
    const data = await AsyncStorage.getItem(KEYS.ENTRIES);
    return data ? JSON.parse(data) : [];
  },

  async saveEntry(entry: any) {
    const current = await this.getEntries();
    const next = [entry, ...current];
    await AsyncStorage.setItem(KEYS.ENTRIES, JSON.stringify(next));
  },

  async getStats() {
    const entries = await this.getEntries();
    const settings = await this.getSettings();
    
    const usageLogs = entries.filter((e: any) => e.type === 'Bruk');
    const lastUseDate = usageLogs.length > 0 
      ? parseISO(usageLogs[0].createdAt) 
      : parseISO(settings.startDate);

    const daysClean = Math.max(0, differenceInDays(new Date(), lastUseDate));
    const managedTriggers = entries.filter((e: any) => e.type === 'Trigger' && e.outcome === 'managed').length;
    
    return {
      daysClean,
      savedMoney: Math.floor(daysClean * (settings.dailyCost || 400)),
      managedTriggers,
      totalEntries: entries.length,
      lastUseDate
    };
  },

  async setOnboarded(value: boolean) {
    await AsyncStorage.setItem(KEYS.ONBOARDED, JSON.stringify(value));
  },

  async getOnboarded() {
    const data = await AsyncStorage.getItem(KEYS.ONBOARDED);
    return data ? JSON.parse(data) : false;
  },

  async clearAll() {
    await AsyncStorage.clear();
  }
};
