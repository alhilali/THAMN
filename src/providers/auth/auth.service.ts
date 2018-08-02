import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { User, Credentials } from './auth.model';
import { Events } from 'ionic-angular';


@Injectable()
export class AuthProvider {
  public token: any;
  public currentUser: User;
  public isAuthorized: boolean = false

  constructor(
    public http: Http,
    public events: Events
  ) {
  }

  login(): Promise<User>{
    return this.http.get('./assets/example_data/profile.json')
    .toPromise()
    .then(response => {
      this.isAuthorized = true;
      this.currentUser = response.json().response as User;
      this.events.publish('user:activity', 'login');
      return this.currentUser;
    })
    .catch(this.handleError);
  }

  findID(id: string): Promise<User>{
    return this.http.get('./assets/example_data/users.json')
    .toPromise()
    .then(response => {
      let users: User[] = response.json().response['users'] as User[];

      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        // console.log(user);
        
        if (user.id === id) return user;

        if (index == users.length - 1) return null;
      }
    })
    .catch(this.handleError);
  }

  getProfile(): Promise<User>{
    return this.http.get('./assets/example_data/users.json')
    .toPromise()
    .then(response => {
      let users: User[] = response.json().response['users'] as User[];
      const user = users[0];
      return user;
    })
    .catch(this.handleError);
  }

  logout() {
    this.events.publish('user:activity', 'logout');
    this.isAuthorized = false;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
