import { Component } from "@angular/core";
import jsSHA from "jssha";
import { LOGIN_PASSWORD } from "src/app/constants/password";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  enteredPassword = "";

  showError = false;

  loginButtonclicked() {
    const hashedEnteredPassword = this.generateHashedEnteredPassword();

    if (hashedEnteredPassword !== LOGIN_PASSWORD) {
      this.showError = true;
      return;
    }
  }

  generateHashedEnteredPassword() {
    const shaObj = new jsSHA("SHA-1", "TEXT", { encoding: "UTF8" });

    shaObj.update(this.enteredPassword);

    return shaObj.getHash("HEX");
  }

  constructor() {}
}
