import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@salus/graphql';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authenticationService: AuthenticationService) {}

  login() {
    this.authenticationService
      .login(this.loginForm.value)
      .subscribe((result) => {
        console.log(result);
        const data = result.data as any;
        sessionStorage.setItem('token', data.login.token);
      });
  }
}
