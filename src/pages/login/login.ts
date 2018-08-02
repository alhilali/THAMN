import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth.service';
import { SignUpPage } from '../sign-up/sign-up';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  loading: any;
  errorMessage: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private loadingCtrl: LoadingController
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    
  }

  async login() {
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
    }, 1000);
  }


  goToSignup() {
    this.navCtrl.push(SignUpPage);
  }

}
