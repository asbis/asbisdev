// Persistens. Bruker localStorage på web, AsyncStorage-shim hvis tilgjengelig på native.
// Native build kan bytte til @react-native-async-storage/async-storage uten endringer i call-sites.

import { Platform } from 'react-native';

interface Store {
  get<T>(key: string, fallback: T): T;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
}

const NS = 'adno:';

const webStore: Store = {
  get(key, fallback) {
    if (typeof window === 'undefined' || !window.localStorage) return fallback;
    try {
      const raw = window.localStorage.getItem(NS + key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      window.localStorage.setItem(NS + key, JSON.stringify(value));
    } catch {
      // quota / disabled
    }
  },
  remove(key) {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.removeItem(NS + key);
  },
};

// In-memory fallback for native preview (will be replaced by AsyncStorage in prod build).
const memCache = new Map<string, unknown>();
const memStore: Store = {
  get(key, fallback) {
    return memCache.has(key) ? (memCache.get(key) as never) : fallback;
  },
  set(key, value) {
    memCache.set(key, value);
  },
  remove(key) {
    memCache.delete(key);
  },
};

export const storage: Store = Platform.OS === 'web' ? webStore : memStore;

// Typed keys to avoid drift.
export const KEYS = {
  onboardingDone: 'onboarding-done',
  darkMode: 'dark-mode',
  language: 'language',
  favorites: 'favorites',
  searchHistory: 'search-history',
  completedCourses: 'completed-courses',
  profile: 'profile',
} as const;
