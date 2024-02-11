import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { DataService } from "../services/data.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private dataService: DataService) {}

  canActivate() {
    return this.checkAuth();
  }
  canActivateChild(){
    return this.checkAuth();
  }

  private async checkAuth(): Promise<boolean | UrlTree> {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["/login"]);
      return false;
    }
  
    if (this.dataService.data) return true;

    const res: any = await this.dataService.downloadData2();
    if (res?.code) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
  // canDeactivate(
  //   component: unknown,
  //   currentRoute: ActivatedRouteSnapshot,
  //   currentState: RouterStateSnapshot,
  //   nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
}
