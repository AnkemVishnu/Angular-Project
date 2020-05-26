import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { RoleWiseAuthorization } from '../app-pojo/ResponseModels/RoleWiseAuthorization';
import { SessionKeys } from './SessionKeys';
import { NotifyService } from '../app-services/notify.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStatus {
    public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) { }

  private user: any = JSON.parse(sessionStorage.getItem(SessionKeys.user));
  private auth_token: string = sessionStorage.getItem(SessionKeys.autho_token);

  canActivate(): boolean {
    if (this.user == null && this.auth_token == null) {
      return true;
    } else {
      this.router.navigateByUrl("dashboard");
      return false;
    }
  }

}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private notify: NotifyService) { }

  private user: any = JSON.parse(sessionStorage.getItem(SessionKeys.user));
  private auth_token: string = sessionStorage.getItem(SessionKeys.autho_token);
  private access: RoleWiseAuthorization = JSON.parse(sessionStorage.getItem(SessionKeys.role_auth));

  private roleAuthorization(condition: boolean): boolean {
    if (this.user == null && this.auth_token == null) {
      this.notify.infoMessage('Please Login');
      this.router.navigateByUrl("");
      return false;
    } else {
      // TEMPORARY ----- REMOVE AFTER ROLE AUTHORIZATION**************************************
      return true;

      // OPEN COMMENTS AFTER ROLE AUTHORIZATION************************************************

      // if (this.access.allfalse || condition) {
      //   return true;
      // } else {
      //   this.notify.warningMessage('Access Denied');
      //   this.router.navigateByUrl("dashboard");
      //   return false;
      // }
    }
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    switch (route.data.page) {

      // OPEN COMMENTS AFTER ROLE AUTHORIZATION************************************************

      // case 'companyconfig':
      //   return this.roleAuthorization(this.access.companyconfig);

      default:
        return this.roleAuthorization(false);
    }
  }

}