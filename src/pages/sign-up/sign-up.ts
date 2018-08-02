import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Slides } from 'ionic-angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth.service';
import { LoginPage } from '../login/login';
import { User } from '../../providers/auth/auth.model';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  @ViewChild(Slides) slides: Slides;

  signupFormStep1: FormGroup;
  signupFormStep2: FormGroup;
  signupFormStep3: FormGroup;
  loading: any;
  errorMessage: string = '';
  statusMessage: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private loadingCtrl: LoadingController
  ) {
    this.signupFormStep1 = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required)
    });
    // this.signupFormStep2 = new FormGroup({
    //   id: new FormControl('', Validators.required)
    // });
    this.signupFormStep2 = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required)
    });
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true);
  }

  async lookupID(user: User) {
    this.errorMessage = "";
    const loadingSpinner = this.loadingCtrl.create();
    loadingSpinner.present();
    const userInfo = await this.authProvider.findID(user.id);
    loadingSpinner.dismiss();
    console.log(userInfo);
    
    if (userInfo) {
      this.signupFormStep2.patchValue({
        id: userInfo.id,
        name: userInfo.name,
        dob: userInfo.dob,
      });
      this.statusMessage = "✅ We were able to find your information";
      this.goToSlide(2);
    } else {
      this.statusMessage = "❌ Couldn't find your information.";
      this.goToSlide(2);
    }
  }

  async signup() {
    const loadingSpinner = this.loadingCtrl.create();
    loadingSpinner.present();
    const loginInfo = await this.authProvider.login()
    setTimeout(() => { // For demo purposes
      loadingSpinner.dismiss();
      if (loginInfo.token) {
        this.navCtrl.setRoot(HomePage);
      } else {
        this.errorMessage = "Something was wrong!"
      }
    }, 3000);
  }

  goToSlide(index: number) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(index, 300);
    this.slides.lockSwipes(true);
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

}
