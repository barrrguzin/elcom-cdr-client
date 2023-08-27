import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "./storage.service";
import {Router} from "@angular/router";
import {Dialog} from "@angular/cdk/dialog";
import {EnterNumberDialogComponent} from "../_components/_dialogs/enter-number-dialog/enter-number-dialog.component";
import {
  AuthorityErrorDialogComponent
} from "../_components/_dialogs/authority-error-dialog/authority-error-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private cookies: CookieService, private dialog: Dialog) {
  }

  authenticate(credentials: any, callback: any) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    let body: string;
    if (credentials.remember_me == true) {
      body = 'username=' + credentials.username + '&password=' + credentials.password + '&remember-me=remember-me';
    } else {
      body = 'username=' + credentials.username + '&password=' + credentials.password;
    }

    this.http.post<any>("http://localhost:8080/api" + '/login', body, {
      headers: headers,
      withCredentials: true
    })
      .subscribe(response => {
        return callback && callback();
      },
      error => {
        if (error.status == 401) {
          this.logout();
          return callback && callback();
        } else if (error.status == 403) {
          console.log("Forbidden")
        }
      });
  }

  logout(): void {
    this.http.get<any>("http://localhost:8080/api" + '/logout', {withCredentials: true}).subscribe();
    this.removeCookies();
    this.toLoginPage();
  }

  toLoginPage(): void {
    this.router.navigate(['/login']);
  }

  private removeCookies(): void {
    this.cookies.deleteAll();
  }

  isUserLoggedIn(): boolean {
    const role = this.getAuthorities();
    return role.length > 0;
  }

  getAuthorities(): String[] {
    if (this.cookies.get("ROLES") != '') {
      return atob(this.cookies.get("ROLES")).split(";");
    } else {
      return [];
    }
  }

  showErrorMessageDialog(): void {
    const dialogRef = this.dialog.open<string>(AuthorityErrorDialogComponent, {
      width: '350px',
    });
  }
}
