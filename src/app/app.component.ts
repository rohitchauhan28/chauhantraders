import { Component } from "@angular/core";
import {
  API_KEY,
  CLIENT_ID,
  DISCOVERY_DOC,
  SCOPES,
} from "./constants/credentials";
import { AuthService } from "./services/auth.service";
import { DataService } from "./services/data.service";
import { ActivatedRoute, ActivationEnd, ActivationStart, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";

declare var gapi: any;
declare var google: any;
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  tokenClient: any;

  isToolBarVisible = false;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {}

  async ngOnInit() {

    this.router.events.subscribe(event => {
      if (event instanceof ActivationStart) {
        this.isToolBarVisible = event.snapshot.data.isHeaderEnabled;
      }   
    });
    
    this.gapiLoaded();
    this.gisLoaded();
    if (!this.authService.accessToken && localStorage.getItem("accessToken")) {
      this.authService.setAccessToken(localStorage.getItem("accessToken") ?? "");
      // this.dataService.uploadDataReset().subscribe(()=>{});
      // this.dataService.downloadData().subscribe(() => {
        // this.router.navigateByUrl("dashboard");
      // });

      // await this.dataService.downloadData2()
    }
  }
  /**
   * Callback after api.js is loaded.
   */
  async gapiLoaded() {
    try {
      await gapi.load("client", this.initializeGapiClient);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Callback after the API client is loaded. Loads the
   * discovery doc to initialize the API.
   */
  async initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
  }

  /**
   * Callback after Google Identity Services are loaded.
   */
  gisLoaded() {
    this.authService.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: "",
    });
    this.authService.tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      this.authService.accessToken = resp.access_token;
      localStorage.setItem("accessToken", resp.access_token)
      this.dataService.downloadData().subscribe(() => {
        this.router.navigateByUrl("dashboard");
      });
    };
  }
}
