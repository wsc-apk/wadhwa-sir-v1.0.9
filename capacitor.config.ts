import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'com.wadhwasir.classroom',
  appName: 'WADHWA SIR CLASSROOM',
  webDir: 'www',
  backgroundColor: '#0a0f1c',
  server: {
    url: 'https://wsc-apk.netlify.app',
    cleartext: true,
    androidScheme: 'https',
    allowNavigation: ['*'],
    hostname: 'wsc-apk.netlify.app'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#0a0f1c',
      androidSplashResourceName: 'splash',
      showSpinner: false
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0a0f1c',
      overlaysWebView: false
    },
    CapacitorHttp: {
      enabled: true
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false,
    backgroundColor: '#0a0f1c',
    useLegacyBridge: false
  }
};

export default config;
