import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = WelcomePage;
  // rootPage:any = LoginPage;
  rootPage:any = TabsPage

  constructor(
    platform: Platform,
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public translate: TranslateService,
  ) {
    translate.setDefaultLang('en');
    translate.use('en');

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
    {
      if(event.lang == 'ar')
      {
        platform.setDir('rtl', true);
      }
      else
      {
        platform.setDir('ltr', true);
      }
    });
  }
}
