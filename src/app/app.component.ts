import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor() {}

  async ngOnInit() {
    try {
      // 1. Initialize the AdMob Plugin
      await AdMob.initialize();

      // 2. Configure the Banner Ad with your Ad Unit ID
      const options: BannerAdOptions = {
        adId: 'ca-app-pub-8576378038310405/3100233215',
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: false // Set to false to serve your real ads
      };

      // 3. Display the Banner Ad
      await AdMob.showBanner(options);
    } catch (error) {
      console.log('AdMob successfully bypassed for web interface.', error);
    }
  }
}
