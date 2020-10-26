import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import * as faker from 'faker/locale/en_CA';
import * as uuid from 'uuid';

import { FeathersService } from '@app/services/feathers.service';
import { AuthService } from '@app/services/auth.service';

import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  messages: string[] = [];

  form = this.fb.group({
    firstName: null,
    lastName: null,
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    province: faker.address.state(),
    postalCode: faker.address.zipCode(),
    email: faker.internet.email(),
    password: uuid.NIL
  });

  constructor(private fb: FormBuilder, private router: Router, private feathers: FeathersService, private auth: AuthService) { }

  ngOnInit(): void {
    // TODO:
  }

  // DEPRECATED
  enter(): void {
    this.router.navigateByUrl('/chat');
    // this.feathers.service('users')
    //   .create(this.form.value)
    //   .then(() => this.messages.push('User created.'))
    //   .catch(err => this.messages.push('Could not create user!'))
    //   .then(() => (this.feathers.authenticate({
    //     strategy: 'local',
    //     email: this.form.value.email,
    //     password: this.form.value.password
    //   })))
    //   .then(() => this.router.navigateByUrl('/chat'))
    //   .catch(err => this.messages.unshift('Wrong credentials!'));
  }

  public get userData$(): any {
    return this.auth.userData$
      .pipe(
        tap((data: any) => {
          this.form.get('firstName').patchValue(data.given_name);
          this.form.get('lastName').patchValue(data.family_name);
        })
      )
  }
  
}

