import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ProviderModel, BannerModel, PaymentModel } from './database.models';
import { User } from '../auth/auth.model';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(public http: Http) {
  }

  getProviders(): Promise<ProviderModel[]> {
    return this.http.get('./assets/example_data/providers.json')
     .toPromise()
     .then(response => response.json() as ProviderModel[])
     .catch(this.handleError);
  }

  getProvider(id: number): Promise<ProviderModel> {
    return this.http.get('./assets/example_data/providers.json')
     .toPromise()
     .then(response => {
      const providers = response.json() as ProviderModel[];
      const provider = providers.find((e) => e.id == id);
      return provider;
     })
     .catch(this.handleError);
  }

  requestProfile(id: string, code: number): Promise<User>{
    return this.http.get('./assets/example_data/users.json')
    .toPromise()
    .then(response => {
      let users: User[] = response.json().response['users'] as User[];

      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        // console.log(user);
        
        if (user.id === id && user.personalCode == code) return user;

        if (index == users.length - 1) return null;
      }
    })
    .catch(this.handleError);
  }

  getBanners(): Promise<BannerModel[]> {
    return this.http.get('./assets/example_data/banners.json')
     .toPromise()
     .then(response => response.json() as BannerModel[])
     .catch(this.handleError);
  }
  getPayment(): Promise<PaymentModel[]> {
    return this.http.get('./assets/example_data/payment.json')
     .toPromise()
     .then(response => response.json() as PaymentModel[])
     .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
