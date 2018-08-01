import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ProviderModel } from './database.models';

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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
