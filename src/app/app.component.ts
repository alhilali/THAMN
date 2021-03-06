import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, App, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth.service';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ListPage } from '../pages/list/list';
import { ContactUsPage } from "../pages/contact-us/contact-us";
import { FaqPage } from "../pages/faq/faq";
import { RequestAccessPage } from '../pages/request-access/request-access';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  // rootPage:any = WelcomePage;
  // rootPage:any = LoginPage;
  rootPage:any = HomePage;

  pages: Array<{title: any, icon: string, component: any}>;
  pushPages: Array<{title: any, icon: string, component: any}>;

  menuSide: string = 'left';

  constructor(
    platform: Platform,
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public translate: TranslateService,
    public menu: MenuController,
    public app: App,
    public auth: AuthProvider,
    public events: Events
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
        this.menuSide = 'right';
        platform.setDir('rtl', true);
      }
      else
      {
        this.menuSide = 'left';
        platform.setDir('ltr', true);
      }

      // Pull translations from i18n files
      // and add them to sidemenu
      Observable.forkJoin(
        this.translate.get('HOME'),
        this.translate.get('PROFILE'),
        this.translate.get('INSURANCE_COS'),
        this.translate.get('ABOUT_US'),
        this.translate.get('FAQ'),
        this.translate.get('REQUEST_ACCESS'),
        this.translate.get('SIGN_IN'),
        this.translate.get('SIGN_UP'),


      ).subscribe(data => {
        this.pages = [
          { title: data[0], icon: 'home', component: HomePage },
          // { title: data[1], icon: 'contacts', component: ProfilePage },
          { title: data[2], icon: 'list', component: ListPage },
          { title: data[3], icon: 'information-circle', component: ContactUsPage },
          { title: data[4], icon: 'md-help', component: FaqPage },
          { title: data[5], icon: 'paper', component: RequestAccessPage }
        ];

        if (!this.auth.isAuthorized) {
          this.pages.push({ title: data[6], icon: 'log-in', component: LoginPage });
          this.pages.push({ title: data[7], icon: 'person-add', component: SignUpPage });
        }

        this.pushPages = [
          
        ];

        // Adjuts side menu pages accordingly with login/logout activity
        this.events.subscribe('user:activity', (type) => {

          if (type === 'login') {
            this.pages.splice(5, 6);
            this.pages.push({ title: data[1], icon: 'contacts', component: ProfilePage });
          } else if (type == 'logout') {
            this.pages.splice(5, 6);
            this.pages.push({ title: data[6], icon: 'log-in', component: LoginPage });
            this.pages.push({ title: data[7], icon: 'person-add', component: SignUpPage });
          }

        });
      });

    });

  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  pushPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.app.getRootNav().push(page.component);
  }

  logout() {
    this.auth.logout();
  }
}
