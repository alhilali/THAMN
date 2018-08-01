import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { User, Credentials } from './auth.model';

@Injectable()
export class AuthProvider {
  public token: any;
  public currentUser: User;
  public isAuthorized: boolean = false

  constructor(
    public http: Http
  ) {
  }

  login(): Promise<User>{
    return this.http.get('./assets/example_data/profile.json')
    .toPromise()
    .then(response => {
      this.currentUser = response.json().response as User;
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
    return this.http.get('./assets/example_data/profile.json')
    .toPromise()
    .then(response => {
      this.currentUser = response.json().response as User;
      return this.currentUser;
    })
    .catch(this.handleError);
  }

  logout() {
    this.isAuthorized = false;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
