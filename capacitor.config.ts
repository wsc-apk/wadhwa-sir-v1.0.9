import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'com.wadhwasir.classroom',
  appName: 'Wadhwa Sir Classroom',
  webDir: 'www',
  server: {
    url: 'https://wsc-apk.netlify.app',
    cleartext: true,
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0a0f1c'
    }
  }
};

export default config;
