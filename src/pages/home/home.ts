import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { BannerModel } from '../../providers/database/database.models';
import { DatabaseProvider } from '../../providers/database/database.service';
import { DetailsPage } from '../details/details';
import { ListPage } from '../list/list';
import { RequestAccessPage } from '../request-access/request-access';
import { ProfilePage } from '../profile/profile';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  // Banners lists
  banners: BannerModel[] = [];

  constructor(
    public nav: NavController,
    public modal: ModalController,
    public databaseProvider: DatabaseProvider,
    private loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    // Load data
    this.loadBanners();
  }

  async loadBanners() {
    const loading = this.loadingCtrl.create();
    loading.present();
    let providersData = await this.databaseProvider.getBanners();  
    if (providersData) {
      loading.dismiss();
      this.banners = providersData;    
    } else { loading.dismiss(); }
  }

  goToPage(banner: BannerModel) {
    if (banner.type === 'provider') { // Go to provider details page
      this.nav.push(DetailsPage, { provider: banner })
    } else if (banner.type === 'providers') { // Go to list of providers page
      this.nav.push(ListPage)
    } else if (banner.type === 'request-access') {
      this.nav.push(RequestAccessPage);
    } else if (banner.type === 'profile') {
      this.nav.push(ProfilePage);
    }
  }

  goToProviders() {
    this.nav.push(ListPage);
  }
}
