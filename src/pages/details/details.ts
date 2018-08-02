import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProviderModel } from '../../providers/database/database.models';
import { DatabaseProvider } from '../../providers/database/database.service';
import { CheckoutPage } from '../checkout/checkout';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  provider: ProviderModel;
  selectedPackage = [
    {id: 1, checked: false},
    {id: 2, checked: false},
    {id: 3, checked: false}
  ];

  total: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public databaseProvider: DatabaseProvider,
    public loadingCtrl: LoadingController
  ) {
    this.provider = this.navParams.get('provider');
  }

  ionViewDidLoad() {
    this.loadProvider();
  }

  async loadProvider() {
    // const loadingSpinner = this.loadingCtrl.create();
    // loadingSpinner.present();
    const providerData = await this.databaseProvider.getProvider(this.provider.id);
    console.log(providerData);
    // loadingSpinner.dismiss();
    if (providerData) {
      this.provider = providerData;
    }
  }

  updateTotal() {
    this.total = 0;
    for (let index = 0; index < this.selectedPackage.length; index++) {
      const checked = this.selectedPackage[index].checked;
      if (checked) {
        const val = Number(this.provider.packages[index].price);
        console.log(val);
        
        this.total += val;
      }
    }
  }

  pay() {
    this.navCtrl.push(CheckoutPage, {provider: this.provider, total: this.total});
  }
}
