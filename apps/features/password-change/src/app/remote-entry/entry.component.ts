import { Component } from '@angular/core';
import { Formello, PasswordFormConfig, PasswordFormModel } from '@salus/forms';
import { AuthenticationService, UpdatePasswordInput } from '@salus/graphql';

@Component({
  selector: 'salus-features-password-change-entry',
  templateUrl: './entry.component.html',
  providers: [PasswordFormModel],
})
export class RemoteEntryComponent {
  changePasswordForm: Formello<PasswordFormModel>;

  constructor(
    private passwordFormModel: PasswordFormModel,
    private authenticationService: AuthenticationService
  ) {
    this.changePasswordForm = new Formello(
      new PasswordFormConfig(this.passwordFormModel)
    );
  }

  save() {
    const input = this.changePasswordForm.getForm()
      .value as UpdatePasswordInput;
    this.authenticationService.updatePassword(input).subscribe((response) => {
      if (response.data?.updatePassword) {
        alert('Password updated successfully');
      } else {
        alert('Password update failed!');
      }
    });
  }
}
