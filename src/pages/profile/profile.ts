import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageProvider } from '../../providers/language/language.service';
import { AuthProvider } from '../../providers/auth/auth.service';
import { User } from '../../providers/auth/auth.model';
import { LanguageModel } from '../../providers/language/language.model';
import { ListPage } from '../list/list';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ViewDocumentPage } from '../view-document/view-document';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profileForm: FormGroup;
  loading: any;

  profile: User;
  languages: Array<LanguageModel>;

  // Type personal: logged in user profile, company: a company is viwing profile
  type: string = 'personal' 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public languageService: LanguageProvider,
    public authService: AuthProvider,
    public viewCtrl: ViewController,
    private camera: Camera
  ) 
    {
      this.loading = this.loadingCtrl.create();
      this.languages = this.languageService.getLanguages();

      this.profileForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        mobile: new FormControl('', Validators.required),
        dob: new FormControl('', Validators.required),
        language: new FormControl('', Validators.required)
      });

  }

  ionViewDidLoad() {
    let userInfo = this.navParams.get('userInfo');
    if (userInfo) {
      this.profile = userInfo;
      console.log(this.profile);
      
      this.type = 'company';
      this.profileForm.patchValue({
        name: this.profile.name,
        email: this.profile.email,
        mobile: this.profile.mobile,
        dob: this.profile.dob
      });
    } else {
      this.loadProfile();
    }
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
        dob: data.dob,
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

  goToDocument(file) {
    this.navCtrl.push(ViewDocumentPage, { file: file });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
