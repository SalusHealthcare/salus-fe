import { Component, OnInit } from '@angular/core';
import {
  DomicileFormConfig,
  DomicileFormModel,
  Formello,
  PersonFormConfigMedic,
  PersonFormModel,
  ResidenceFormConfig,
  ResidenceFormModel,
} from '@salus/forms';
import { CreateMedicInput, IUser, StaffService } from '@salus/graphql';

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
    private staffService: StaffService
  ) {
    this.newStaffForm = new Formello(
      new PersonFormConfigMedic(this.personFormModel)
    );

    this.residenceForm = new Formello(
      new ResidenceFormConfig(this.residenceFormModel)
    );
    this.domicileForm = new Formello(
      new DomicileFormConfig(this.domicileFormModel)
    );
  }

  ngOnInit(): void {
    console.log();
  }

  createMedic() {
    const userInfo: IUser = {
      email: this.newStaffForm.getForm().get('email')?.value,
      password: this.newStaffForm.getForm().get('password')?.value,
    };

    const personInfo: CreateMedicInput = {
      firstName: this.newStaffForm.getForm().get('firstName')?.value,
      lastName: this.newStaffForm.getForm().get('lastName')?.value,
      birthDate: this.newStaffForm.getForm().get('birthDate')?.value,
      taxCode: this.newStaffForm.getForm().get('taxCode')?.value,
      telephoneNumber: this.newStaffForm.getForm().get('telephoneNumber')
        ?.value,
      residence: this.residenceForm.getForm().value,
      domicile: this.domicileForm.getForm().value,
      medicalSpeciality: this.newStaffForm.getForm().get('medicalSpeciality')
        ?.value,
    };

    this.staffService
      .createMedic({ userInfo, personInfo })
      .subscribe((result) => {
        console.log(result);
      });
  }
}
