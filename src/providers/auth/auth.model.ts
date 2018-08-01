export class User {
  user_id: number;
  token: string;
  email: string;
  name: string;
  mobile: string;
  id?: string;
  dob: string;
}

export class Credentials {
  language?: number;
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
    this.language = 2;
  }
}