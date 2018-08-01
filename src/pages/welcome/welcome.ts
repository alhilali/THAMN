import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignUpPage } from '../sign-up/sign-up';
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import { LanguageModel } from '../../providers/language/language.model';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { LanguageProvider } from '../../providers/language/language.service';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  langForm: FormGroup;
  languages: Array<LanguageModel>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public translate: TranslateService,
    public languageService: LanguageProvider,
  ) {
    this.languages = this.languageService.getLanguages();

    this.langForm = new FormGroup({
      language: new FormControl()
    });
  }

  ionViewDidLoad() {
    this.loadLanguage();
  }

  loadLanguage() {
    let currentLang = this.translate.currentLang;

    this.langForm.patchValue({
      language: this.languages.filter(x => x.code == currentLang)
    });


    this.langForm.get('language').valueChanges.subscribe((lang) => {
      this.setLanguage(lang);
    });
  }

  setLanguage(lang: LanguageModel){
    let language_to_set = this.translate.getDefaultLang();

    if(lang){
      language_to_set = lang.code;
    }
    this.translate.setDefaultLang(language_to_set);
    this.translate.use(language_to_set);
  }

  goToLogin() {
    this.navCtrl.push(LoginPage)
  }

  goToSignUp() {
    this.navCtrl.push(SignUpPage)
  }

}
