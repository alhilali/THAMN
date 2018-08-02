import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { BannerModel } from '../../providers/database/database.models';
import { DatabaseProvider } from '../../providers/database/database.service';
import { DetailsPage } from '../details/details';
import { ListPage } from '../list/list';
import { RequestAccessPage } from '../request-access/request-access';
import { ProfilePage } from '../profile/profile';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { LanguageProvider } from '../../providers/language/language.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  // Banners lists
  banners: BannerModel[] = [];

  currentLang: string = '';
  languages = [];

  constructor(
    public nav: NavController,
    public modal: ModalController,
    public databaseProvider: DatabaseProvider,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public translate: TranslateService,
    public languageService: LanguageProvider
  ) {
    this.languages = this.languageService.getLanguages();
  }

  ionViewDidLoad() {
    // Load data
    this.loadBanners();
    this.currentLang = this.translate.currentLang;
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
    } else if (banner.type === 'language') {
      this.changeLanguage();
    }
  }

  changeLanguage() {
    let alert = this.alertCtrl.create();
    let options = [];
    let title = '';

    Observable.forkJoin(
      this.translate.get('SELECT_LANGUAGE'),
      this.translate.get('CANCEL'),
      this.translate.get('OK'),

    ).subscribe(data => {

      alert.setTitle(data[0]);

      for (let index = 0; index < this.languages.length; index++) {
        const lang = this.languages[index];

        alert.addInput({
          type: 'radio',
          label: lang.name,
          value: lang.code,
          checked: this.currentLang == lang.code
        });


        if (index == this.languages.length - 1) {

          alert.addButton(data[1]);
          alert.addButton({
            text: data[2],
            handler: data => {
              console.log(data);
              this.currentLang = data;
              this.translate.setDefaultLang(data);
              this.translate.use(data);
            }
          });
          alert.present();
        }
        
      }



    });

  }

  goToProviders() {
    this.nav.push(ListPage);
  }
}
