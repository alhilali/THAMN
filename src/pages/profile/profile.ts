import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageProvider } from '../../providers/language/language.service';
import { AuthProvider } from '../../providers/auth/auth.service';
import { User } from '../../providers/auth/auth.model';
import { LanguageModel } from '../../providers/language/language.model';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profileForm: FormGroup;
  loading: any;

  profile: User;
  languages: Array<LanguageModel>;



  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public languageService: LanguageProvider,
    public authService: AuthProvider) 
    {
      this.loading = this.loadingCtrl.create();
      this.languages = this.languageService.getLanguages();

      this.profileForm = new FormGroup({
        name: new FormControl(),
        location: new FormControl(),
        email: new FormControl(),
        phone: new FormControl(),
        currency: new FormControl(),
        notifications: new FormControl(),
        language: new FormControl()
      });

  }

  ionViewDidLoad() {
    this.loadProfile();
  }

  loadProfile() {
    this.authService.getProfile()
    .then(data => {
      console.log(data);
      
      this.profile = data;
      // setValue: With setValue, you assign every form control value at once by passing in a data object whose properties exactly match the form model behind the FormGroup.
      // patchValue: With patchValue, you can assign values to specific controls in a FormGroup by supplying an object of key/value pairs for just the controls of interest.
      // More info: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#populate-the-form-model-with-_setvalue_-and-_patchvalue_

      let currentLang = this.translate.currentLang;
      console.log(currentLang);
      

      this.profileForm.patchValue({
        name: data.name,
        location: "النفل",
        email: data.email,
        phone: data.mobile,
        currency: 'dollar',
        notifications: true,
        language: this.languages.filter(x => x.code == currentLang)
      });

      this.loading.dismiss();

      this.profileForm.get('language').valueChanges.subscribe((lang) => {
        this.setLanguage(lang);
      });
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

}
