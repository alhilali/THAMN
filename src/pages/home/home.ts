import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { ProviderModel } from '../../providers/database/database.models';
import { DatabaseProvider } from '../../providers/database/database.service';
import { DetailsPage } from '../details/details';


export interface FilterOptions {
  cash?: boolean | false;
  card?: boolean | false;
  upperMinimumAmount?: number | 350;
  lowerMinimumAmount?: number | 0;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
// Form groups
rangeForm: any;
checkboxTagsForm: FormGroup;

// Controllers of filters
searchQuery: string = ''
filterOptions: FilterOptions = {upperMinimumAmount: 350, lowerMinimumAmount: 0};

// Style Controllers
pushedDown: boolean = false;
pushType: string = '';

// Providers lists
providers: ProviderModel[] = [];
cpyProvider: ProviderModel[] = [];

constructor(
  public nav: NavController,
  public modal: ModalController,
  public databaseProvider: DatabaseProvider,
  private loadingCtrl: LoadingController
) {
  this.rangeForm = new FormGroup({
    dual: new FormControl({lower: 0, upper: 350})
  });
  
  this.checkboxTagsForm = new FormGroup({
    cash: new FormControl(false),
    card: new FormControl(false),
  });
}

ionViewDidLoad() {
  // Load data
  this.loadProviders();
}

async loadProviders() {
  const loading = this.loadingCtrl.create();
  loading.present();
  let providersData = await this.databaseProvider.getProviders();
  console.log(providersData);
  
  if (providersData) {
    loading.dismiss();
    this.providers = providersData;
    console.log(this.providers);
    
    this.cpyProvider = providersData;
  } else { loading.dismiss(); }
}

goToProvider(provider: ProviderModel) {
  // console.log(restaurant);
  this.nav.push(DetailsPage, { provider: provider })
}

controlPushContent(type) {    
  if (this.pushedDown) {
    // Close custom control
    if ((type == 'search' && this.pushType == 'search') ||
       (type == 'filter' && this.pushType == 'filter') || 
       (type == 'location' && this.pushType == 'location'))
    {
      this.pushedDown = false
      this.pushType = ''
    } else if ((type == 'search' && this.pushType !== 'search')) // Change custom control type
    {
      this.pushType = 'search'
    } else if ((type == 'filter' && this.pushType !== 'filter')) 
    {
      this.pushType = 'filter'
    } else if ((type == 'location' && this.pushType !== 'location')) {
      this.pushType = 'location'
    }
  } else {
    this.pushType = type
    this.pushedDown = true
  }
}

search() {
  this.controlPushContent('search')
}

searchRestaurant() {
  if (this.searchQuery == "") {
    this.resetData();
  } else {
    this.providers = this.providers.filter(data => data.name.indexOf(this.searchQuery) !== -1)
  }
}

resetData() {
  this.providers = this.cpyProvider;
}

filter() {
  this.controlPushContent('filter')
}

rangeChange(range: Range) {
  // console.log(range.value.upper);
  // console.log(range.value.lower);
  // this.filterOptions.lowerMinimumAmount = range.value.lower;
  // this.filterOptions.upperMinimumAmount = range.value.upper;
  // this.filterRestaurants(this.filterOptions);
}

filterUpdate(event) {
  this.filterOptions.cash = this.checkboxTagsForm.controls.cash.value;
  this.filterOptions.card = this.checkboxTagsForm.controls.card.value;
  this.filterRestaurants(this.filterOptions)
}

filterRestaurants(options: FilterOptions) {
    // console.log(this.cpyOpenRestaurants);
    
    // this.openRestaurants = this.cpyOpenRestaurants
    // console.log(options);
    
    // Filter open restaurants
    this.providers = this.cpyProvider
    .filter(data => { // Filter payment types
      let firstMode = options.cash && !options.card ? 1 : null
      let secondMode = options.card && !options.cash ? 2 : null
      let thirdMode = (options.cash && !options.card) || (options.card && !options.cash) ? 3 : null

      if ((!options.card && !options.cash) || (options.card && options.cash)) {
        firstMode = 1;
        secondMode = 2;
        thirdMode = 3;
      };

      // return ((data.payment_mode == firstMode || data.payment_mode == secondMode || data.payment_mode == thirdMode));
    })
    .filter(data => { // Filter minimum amount
      // let minimumAmount = Number(data.minimum_order_amount);

      // return (minimumAmount >= options.lowerMinimumAmount && minimumAmount <= options.upperMinimumAmount)
    })
  }
}
