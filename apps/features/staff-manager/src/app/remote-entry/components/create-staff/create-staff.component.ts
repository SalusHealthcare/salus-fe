import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  DomicileFormConfig,
  DomicileFormModel,
  Formello,
  PersonFormConfigMedic,
  PersonFormConfigStaff,
  PersonFormModel,
  ResidenceFormConfig,
  ResidenceFormModel,
} from '@salus/forms';
import {
  CreateMedicInput,
  CreatePersonInput,
  IUser,
  StaffService,
} from '@salus/graphql';

@Component({
  selector: 'salus-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css'],
  providers: [PersonFormModel, ResidenceFormModel, DomicileFormModel],
})
export class CreateStaffComponent implements OnInit {
  newStaffForm: Formello<PersonFormModel>;
  residenceForm: Formello<ResidenceFormModel>;
  domicileForm: Formello<DomicileFormModel>;

  constructor(
    private personFormModel: PersonFormModel,
    private residenceFormModel: ResidenceFormModel,
    private domicileFormModel: DomicileFormModel,
    private staffService: StaffService,
    private router: Router
  ) {
    this.newStaffForm = new Formello(
      new PersonFormConfigStaff(this.personFormModel)
    );

    this.residenceForm = new Formello(
      new ResidenceFormConfig(this.residenceFormModel)
    );
    this.domicileForm = new Formello(
      new DomicileFormConfig(this.domicileFormModel)
    );
  }

  ngOnInit(): void {
    this.personFormModel.type.control.valueChanges.subscribe((value) => {
      switch (value) {
        case 'medic':
          this.newStaffForm.changeConfiguration(
            new PersonFormConfigMedic(this.personFormModel)
          );
          break;
        case 'staff':
          this.newStaffForm.changeConfiguration(
            new PersonFormConfigStaff(this.personFormModel)
          );
          break;
      }
    });
  }

  create() {
    const userInfo: IUser = {
      email: this.newStaffForm.getForm().get('email')?.value,
      password: this.newStaffForm.getForm().get('password')?.value,
    };

    const personInfo: CreatePersonInput | CreateMedicInput = {
      firstName: this.newStaffForm.getForm().get('firstName')?.value,
      lastName: this.newStaffForm.getForm().get('lastName')?.value,
      birthDate: this.newStaffForm.getForm().get('birthDate')?.value,
      taxCode: this.newStaffForm.getForm().get('taxCode')?.value,
      telephoneNumber: this.newStaffForm.getForm().get('telephoneNumber')
        ?.value,
      residence: this.residenceForm.getForm().value,
      domicile: this.domicileForm.getForm().value,
    };

    switch (this.personFormModel.type.control.value) {
      case 'medic':
        (personInfo as CreateMedicInput).medicalSpeciality = this.newStaffForm
          .getForm()
          .get('medicalSpecialty')?.value;
        this.staffService
          .createMedic({ userInfo, personInfo: personInfo as CreateMedicInput })
          .subscribe((result) => {
            if (result.data?.createMedicUser) {
              this.staffService.getAllPeople({ page: 0, size: 10 }).refetch();
              this.router.navigate(['app', 'staff']);
            } else {
              //start error dialog
            }
          });
        break;
      case 'staff':
        this.staffService
          .createStaff({
            userInfo,
            personInfo: personInfo as CreatePersonInput,
          })
          .subscribe((result) => {
            if (result.data?.createStaffUser) {
              console.log('createStaffUser', result.data.createStaffUser);
              this.staffService.getAllPeople({ page: 0, size: 10 }).refetch();
              this.router.navigate(['app', 'staff']);
            } else {
              //start error dialog
            }
          });
        break;
    }
  }

  domicileAsResidence() {
    this.domicileForm.getForm().patchValue(this.residenceForm.getForm().value);
    this.domicileForm.getForm().updateValueAndValidity({});
  }
}
