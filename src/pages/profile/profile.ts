import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageProvider } from '../../providers/language/language.service';
import { AuthProvider } from '../../providers/auth/auth.service';
import { User } from '../../providers/auth/auth.model';
import { LanguageModel } from '../../providers/language/language.model';
import { ListPage } from '../list/list';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
    public authService: AuthProvider,
    private camera: Camera
  ) 
    {
      this.loading = this.loadingCtrl.create();
      this.languages = this.languageService.getLanguages();

      this.profileForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        mobile: new FormControl('', Validators.required),
        language: new FormControl('', Validators.required)
      });

  }

  ionViewDidLoad() {
    this.loadProfile();
  }

  loadProfile() {
    this.loading.present();
    this.authService.getProfile()
    .then(data => {
      console.log(data);
      
      this.profile = data;

      let currentLang = this.translate.currentLang;
      console.log(currentLang);
      

      this.profileForm.patchValue({
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        language: this.languages.filter(x => x.code == currentLang)
      });

      console.log(this.profileForm);
      

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

  goToInsuranceCos() {
    this.navCtrl.push(ListPage);
  }

  uploadNewDocument() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

}
