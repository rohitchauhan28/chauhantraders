import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import jsSHA from "jssha";
import { API_KEY, CLIENT_ID, DISCOVERY_DOC, SCOPES } from "src/app/constants/credentials";
import { LOGIN_PASSWORD } from "src/app/constants/password";
import { AuthService } from "src/app/services/auth.service";
import { DataService } from "src/app/services/data.service";

declare var gapi: any;
declare var google: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  enteredPassword = "";

  showError = false;

  loginButtonclicked() {
    // const hashedEnteredPassword = this.generateHashedEnteredPassword();

    // if (hashedEnteredPassword !== LOGIN_PASSWORD) {
    //   this.showError = true;
    //   return;
    // }

    this.handleAuthClick();
  }

  // generateHashedEnteredPassword() {
  //   const shaObj = new jsSHA("SHA-1", "TEXT", { encoding: "UTF8" });

  //   shaObj.update(this.enteredPassword);

  //   return shaObj.getHash("HEX");
  // }

  handleAuthClick() {
    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      this.authService.tokenClient.requestAccessToken({prompt: "consent"});
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      this.authService.tokenClient.requestAccessToken({prompt: ""});
    }
  }

  constructor(private authService: AuthService) {

  }

}
