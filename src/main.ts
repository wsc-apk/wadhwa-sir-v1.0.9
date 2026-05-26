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
    if (!canGoBack) CapacitorApp.exitApp(); else window.history.back();
  });
  (window as any).speechSynthesis = {
    speak: async (u:any) => { await TextToSpeech.speak({text:u.text,lang:'en-IN',rate:1,pitch:1}); if(u.onend) u.onend(); },
    cancel: () => TextToSpeech.stop()
  };
  (window as any).SpeechSynthesisUtterance = class { text:string; onend:any; constructor(t:string){this.text=t} };
});
