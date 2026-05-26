import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'com.wadhwasir.classroom',
  appName: 'Wadhwa Sir Classroom',
  webDir: 'www',
  backgroundColor: '#0a0f1c',
  server: {
    url: 'https://wsc-apk.netlify.app',
    cleartext: true,
    androidScheme: 'https',
    allowNavigation: ['*']
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
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false
  }
};

export default config;
