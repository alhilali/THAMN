import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { DatabaseProvider } from '../../providers/database/database.service';
import { User } from '../../providers/auth/auth.model';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the RequestAccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-request-access',
  templateUrl: 'request-access.html',
})
export class RequestAccessPage {
  requestForm: FormGroup;
  errorMessage: string  = '';


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public databaseProvider: DatabaseProvider,
    private loading: LoadingController,
    private modal: ModalController
    ) {
      this.requestForm = new FormGroup({
        id: new FormControl('', Validators.required),
        code: new FormControl('', Validators.required),
      });
  }

  ionViewDidLoad() {
  }

  async getDocument(data: any) {
    const loadingSpinner = this.loading.create();
    loadingSpinner.present();
    this.errorMessage = '';
    let profileData = await this.databaseProvider.requestProfile(data.id, data.code);
    loadingSpinner.dismiss();
    if (profileData && profileData.name) {
      const userProfile = profileData;
      this.showProfile(userProfile);
    } else {
      this.errorMessage = "Either supplied information is wrong or we couldn't find records in our system."
    }
  }

  showProfile(userInfo: User) {
    const modal = this.modal.create(ProfilePage, {userInfo: userInfo});
    modal.present();
  }

}
