import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { App as CapacitorApp } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

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

  // 2026 FIX: native TTS for Android 7-16
  const nativeTTS = {
    speak: async (utterance: any) => {
      await TextToSpeech.stop();
      await TextToSpeech.speak({
        text: utterance.text,
        lang: utterance.lang || 'en-IN',
        rate: utterance.rate || 1.0,
        pitch: utterance.pitch || 1.0,
        volume: 1.0,
        category: 'ambient'
      });
      if (utterance.onend) utterance.onend(new Event('end'));
    },
    cancel: () => TextToSpeech.stop()
  };

  (window as any).speechSynthesis = nativeTTS;
  (window as any).SpeechSynthesisUtterance = class {
    text: string; lang = 'en-IN'; rate = 1; pitch = 1; volume = 1; onend: any = null;
    constructor(t: string) { this.text = t; }
  };
});
