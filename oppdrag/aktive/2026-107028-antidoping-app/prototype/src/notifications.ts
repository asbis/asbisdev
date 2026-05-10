// Push-/lokale varsler. Web: bruker Notification API. Native: expo-notifications-shim.
// På native build vil expo-notifications ta over via @platform-specific stub.

import { Platform } from 'react-native';

export type PermissionStatus = 'granted' | 'denied' | 'default' | 'unsupported';

export async function requestPermission(): Promise<PermissionStatus> {
  if (Platform.OS !== 'web') return 'unsupported';
  if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  const result = await Notification.requestPermission();
  return result as PermissionStatus;
}

export function getPermission(): PermissionStatus {
  if (Platform.OS !== 'web') return 'unsupported';
  if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
  return Notification.permission as PermissionStatus;
}

export function showNotification(opts: { title: string; body: string; tag?: string; url?: string }): boolean {
  if (Platform.OS !== 'web') return false;
  if (typeof window === 'undefined' || !('Notification' in window)) return false;
  if (Notification.permission !== 'granted') return false;

  const n = new Notification(opts.title, {
    body: opts.body,
    icon: '/icon.svg',
    tag: opts.tag,
    badge: '/icon.svg',
  });
  if (opts.url) {
    n.onclick = () => {
      window.focus();
      window.location.assign(opts.url!);
    };
  }
  return true;
}
