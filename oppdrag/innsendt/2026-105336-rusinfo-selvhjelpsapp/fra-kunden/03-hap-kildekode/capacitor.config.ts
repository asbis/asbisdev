import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'no.rustelefonen.HAP2',
  appName: 'HAP',
  webDir: 'dist',
  bundledWebRuntime: false,
  // Aktiver denne blokken for at Capacitor-appen skal laste hele appen fra remote URL
  // server: {
  //   url: 'https://hap-pwa.web.app',
  // },
};

export default config;
