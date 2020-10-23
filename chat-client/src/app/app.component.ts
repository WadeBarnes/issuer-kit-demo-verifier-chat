import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authentication } from '@feathersjs/authentication-client/lib/hooks';

import { TranslateService } from '@ngx-translate/core';

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private oidcSubscriptoion: Subscription;

  title = 'chat-client';

  constructor(private router: Router, private translate: TranslateService, private oidcSecurityService: OidcSecurityService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.oidcSubscriptoion = this.oidcSecurityService.checkAuth()
      .subscribe((authenticated: boolean) => {
        if (authenticated) {
          this.router.navigateByUrl('/chat/entry');
        }
      });
  }

  ngOnDestroy(): void {
    this.oidcSubscriptoion.unsubscribe();
  }

  toggleLanguage(): void {
    const curr = this.translate.currentLang;
    this.translate.use(curr === 'en' ? 'fr' : 'en');
  }
}
