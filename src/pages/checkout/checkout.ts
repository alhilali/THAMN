import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProviderModel, PaymentModel } from '../../providers/database/database.models';

import { DatabaseProvider } from '../../providers/database/database.service';
import { ProfilePage } from "../profile/profile";
/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
total: number;
provider: ProviderModel;
payment: PaymentModel[] = [];
  constructor(public navCtrl: NavController, 
  public navParams: NavParams,  
  public databaseProvider: DatabaseProvider,
  private loadingCtrl: LoadingController) {

  }
  

  ionViewDidLoad() {
    this.provider = this.navParams.get('provider');
    this.total = this.navParams.get('total');
    console.log('ionViewDidLoad CheckoutPage');
    this.loadPayment();
    
  }

   async loadPayment() {
    const loading = this.loadingCtrl.create();
    loading.present();
    let providersData = await this.databaseProvider.getPayment();  
    if (providersData) {
      loading.dismiss();
      this.payment = providersData;   
    } else { loading.dismiss(); }
  }

    goToProfile() {
    this.navCtrl.push(ProfilePage);
  }

}
