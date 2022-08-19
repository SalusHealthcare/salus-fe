import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  CreatePersonInput,
  IUser,
} from '@salus/graphql';
import { catchError } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginOrSignup: 'login' | 'signup' = 'login';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    taxCode: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    residenceAddress: new FormControl('', [Validators.required]),
    residenceNumber: new FormControl('', [Validators.required]),
    residenceCity: new FormControl('', [Validators.required]),
    residenceProvince: new FormControl('', [Validators.required]),
    residencePostalCode: new FormControl('', [Validators.required]),
    residenceCountry: new FormControl('', [Validators.required]),
    domicileAddress: new FormControl('', [Validators.required]),
    domicileNumber: new FormControl('', [Validators.required]),
    domicileCity: new FormControl('', [Validators.required]),
    domicileProvince: new FormControl('', [Validators.required]),
    domicilePostalCode: new FormControl('', [Validators.required]),
    domicileCountry: new FormControl('', [Validators.required]),
    telephoneNumber: new FormControl('', [Validators.required]),
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    sessionStorage.removeItem('token');
  }

  login() {
    this.authenticationService.login(this.loginForm.value).subscribe({
      next: (result) => {
        if (result.data?.login) {
          sessionStorage.setItem('token', result.data.login.token);
          sessionStorage.setItem(
            'user',
            JSON.stringify(result.data.login.person)
          );
          this.router.navigate(['app']);
        } else {
          sessionStorage.removeItem('token');
        }
      },
      error: (error) => {
        alert(error.message);
      },
    });
  }

  signup() {
    const userInfo: IUser = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };

    const personInfo: CreatePersonInput = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      taxCode: this.signupForm.value.taxCode,
      birthDate: this.signupForm.value.birthDate,
      residence: {
        city: this.signupForm.value.residenceCity,
        country: this.signupForm.value.residenceCountry,
        number: this.signupForm.value.residenceNumber,
        postCode: this.signupForm.value.residencePostalCode,
        province: this.signupForm.value.residenceProvince,
        street: this.signupForm.value.residenceAddress,
      },
      domicile: {
        city: this.signupForm.value.domicileCity,
        country: this.signupForm.value.domicileCountry,
        number: this.signupForm.value.domicileNumber,
        postCode: this.signupForm.value.domicilePostalCode,
        province: this.signupForm.value.domicileProvince,
        street: this.signupForm.value.domicileAddress,
      },
      telephoneNumber: this.signupForm.value.telephoneNumber,
    };

    this.authenticationService
      .signupPatient({ userInfo, personInfo })
      .subscribe((result) => {
        console.log(result);
        if (result.data) {
          // sessionStorage.setItem('token', result.data.createPatientUser.token);
          // this.router.navigate(['app']);
          this.loginOrSignup = 'login';
        } else sessionStorage.removeItem('token');
      });
  }
  //! NON RITORNA IL TOKEN DOPO LA SIGNUP

  toggleLoginOrSignup() {
    this.loginOrSignup = this.loginOrSignup === 'login' ? 'signup' : 'login';
  }
}
