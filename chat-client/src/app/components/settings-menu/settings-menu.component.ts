import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss']
})
export class SettingsMenuComponent {
  constructor(private router: Router, private auth: AuthService) { }

  logout(): void {
    this.auth.logout();
  }
}
