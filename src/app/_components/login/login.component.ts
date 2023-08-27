import { Component } from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials = {username: '', password: '', remember_me: ''};
  error:string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    this.authService.authenticate(this.credentials, () => {

      this.router.navigateByUrl("/");
      window.location.href = "/";
    });
  }

}
