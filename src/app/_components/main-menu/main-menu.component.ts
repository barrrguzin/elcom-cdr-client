import { Component } from '@angular/core';
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {
  constructor(private authService: AuthService) {
  }

  logout(): void {
    this.authService.logout();
  }
}
