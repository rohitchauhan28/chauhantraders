import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class AuthService {

  tokenClient: any;

  accessToken!: string;

  constructor() { }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  isAuthenticated() {
    if (this.accessToken || localStorage.getItem("accessToken")) {
      return true;
    } else {
      return false;
    }
  }

  login() {

  }

  logout() {
    this.accessToken = "";
    localStorage.removeItem("accessToken");
  }
}
