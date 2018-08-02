import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Pages
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { CheckoutPage } from '../pages/checkout/checkout';
import { DetailsPage } from '../pages/details/details';
import { ProfilePage } from '../pages/profile/profile';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { WelcomePage } from '../pages/welcome/welcome';
import { ListPage } from '../pages/list/list';
import { FaqPage } from "../pages/faq/faq";


// Providers
import { LanguageProvider } from '../providers/language/language.service';
import { DatabaseProvider } from '../providers/database/database.service';
import { AuthProvider } from '../providers/auth/auth.service';

// Modules
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    ContactUsPage,
    CheckoutPage,
    DetailsPage,
    ProfilePage,
    SignUpPage,
    WelcomePage,
    ListPage,
    FaqPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
		}),
		TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        }
      }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    ContactUsPage,
    CheckoutPage,
    DetailsPage,
    ProfilePage,
    SignUpPage,
    WelcomePage,
    ListPage,
    FaqPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LanguageProvider,
    AuthProvider,
    DatabaseProvider
  ]
})
export class AppModule {}
