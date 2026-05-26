import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { App as CapacitorApp } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
}).then(() => {
  StatusBar.setOverlaysWebView({ overlay: false });
  StatusBar.setBackgroundColor({ color: '#0a0f1c' });

  CapacitorApp.addListener('backButton', ({ canGoBack }) => {
    if (!canGoBack) {
      CapacitorApp.exitApp();
    } else {
      window.history.back();
    }
  });

  // --- 2026 FIX: Replace broken WebView speechSynthesis with native Android TTS ---
  const nativeTTS = {
    speaking: false,
    speak: async (utterance: SpeechSynthesisUtterance) => {
      try {
        await SpeechSynthesis.stop();
        nativeTTS.speaking = true;
        await SpeechSynthesis.speak({
          text: utterance.text,
          language: utterance.lang || 'en-IN',
          rate: Math.min(Math.max(utterance.rate || 1, 0.1), 2),
          pitch: utterance.pitch || 1.0,
          volume: utterance.volume || 1.0
        });
        nativeTTS.speaking = false;
        if (utterance.onend) utterance.onend(new Event('end'));
      } catch (e) {
        nativeTTS.speaking = false;
      }
    },
    cancel: () => SpeechSynthesis.stop(),
    pause: () => {},
    resume: () => {},
    getVoices: () => []
  };

  (window as any).speechSynthesis = nativeTTS;
  (window as any).SpeechSynthesisUtterance = class {
    text: string;
    lang = 'en-IN';
    rate = 1;
    pitch = 1;
    volume = 1;
    onend: any = null;
    constructor(text: string) { this.text = text; }
  };
});
