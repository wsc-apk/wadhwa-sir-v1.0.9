import { CapacitorConfig } from '@capacitor/core';
const config: CapacitorConfig = {
  appId: 'com.wadhwasir.classroom',
  appName: 'WADHWA SIR CLASSROOM',
  webDir: 'www',
  backgroundColor: '#0a0f1c',
  server: { url: 'https://wsc-apk.netlify.app', cleartext: true, androidScheme: 'https' },
  plugins: {
    SplashScreen: { launchShowDuration: 1500, backgroundColor: '#0a0f1c', androidSplashResourceName: 'splash', showSpinner: false },
    StatusBar: { style: 'DARK', backgroundColor: '#0a0f1c', overlaysWebView: false }
  }
};
export default config;
