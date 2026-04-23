import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  SETTINGS: 'kord_settings',
  ENTRIES: 'kord_entries',
  ONBOARDED: 'kord_onboarded',
};

export const Storage = {
  async getSettings() {
    const data = await AsyncStorage.getItem(KEYS.SETTINGS);
    return data ? JSON.parse(data) : { palette: 'A', securityEnabled: false, pin: null, biometrics: false, startDate: new Date().toISOString() };
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
