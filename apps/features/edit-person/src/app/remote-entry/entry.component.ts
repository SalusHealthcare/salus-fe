import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  DomicileFormConfig,
  DomicileFormModel,
  Formello,
  PersonFormConfigGeneric,
  PersonFormModel,
  ResidenceFormConfig,
  ResidenceFormModel,
} from '@salus/forms';
import { CommonService, IPerson, UpdatePersonInput } from '@salus/graphql';

@Component({
  selector: 'salus-features-edit-person-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
  providers: [PersonFormModel, ResidenceFormModel, DomicileFormModel],
})
export class RemoteEntryComponent {
  fullName = '';
  readOnlyMode = true;
  editable = true;
  personForm: Formello<PersonFormModel>;
  residenceForm: Formello<ResidenceFormModel>;
  domicileForm: Formello<DomicileFormModel>;
  id: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private personFormModel: PersonFormModel,
    private residenceFormModel: ResidenceFormModel,
    private domicileFormModel: DomicileFormModel,
    private commonService: CommonService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.getPersonById(params['id']);
      } else {
        this.getCurrentPerson();
      }
    });

    this.personForm = new Formello(
      new PersonFormConfigGeneric(this.personFormModel)
    );

    this.residenceForm = new Formello(
      new ResidenceFormConfig(this.residenceFormModel)
    );
    this.domicileForm = new Formello(
      new DomicileFormConfig(this.domicileFormModel)
    );
    this.disableAllForms();
  }

  disableAllForms() {
    this.personForm.getForm().disable();
    this.residenceForm.getForm().disable();
    this.domicileForm.getForm().disable();
    this.readOnlyMode = true;
  }

  enableAllForms() {
    this.personFormModel.firstName.control.enable();
    this.personFormModel.lastName.control.enable();
    this.personFormModel.telephoneNumber.control.enable();
    this.residenceForm.getForm().enable();
    this.domicileForm.getForm().enable();
    this.readOnlyMode = false;
  }

  getFullName(): string {
    return `${this.personFormModel.firstName.control.value} ${this.personFormModel.lastName.control.value}`;
  }

  domicileAsResidence() {
    this.domicileForm.getForm().patchValue(this.residenceForm.getForm().value);
    this.domicileForm.getForm().updateValueAndValidity({});
  }

  patchFormWithPerson(person: IPerson) {
    this.personForm.getForm().patchValue(person);
    this.residenceForm.getForm().patchValue(person.residence);
    this.domicileForm.getForm().patchValue(person.domicile);
    this.fullName = this.getFullName();
  }

  getPersonById(id: string): void {
    this.commonService.getPersonById(id).subscribe((personResponse) => {
      if (personResponse.data) {
        const person = personResponse.data.person;
        this.patchFormWithPerson(person);
      }
    });
  }

  getCurrentPerson(): void {
    this.commonService.getCurrentUser().valueChanges.subscribe((response) => {
      if (response.data.currentUser) {
        const person = response.data.currentUser.person;
        this.patchFormWithPerson(person);
      }
    });
    this.commonService.getCurrentUser().refetch();
  }

  save() {
    const personValues: IPerson = this.personForm.getForm().value;
    const personInfo: UpdatePersonInput = {
      firstName: personValues.firstName,
      lastName: personValues.lastName,
      telephoneNumber: personValues.telephoneNumber,
      residence: this.residenceForm.getForm().value,
      domicile: this.domicileForm.getForm().value,
    };

    if (this.id) {
      const personId = this.id;
      this.commonService
        .updatePersonByAdmin({
          personId,
          personInfo,
        })
        .subscribe((response) => {
          if (response.data?.updatePersonByAdmin) {
            this.disableAllForms();
          }
        });
    } else {
      this.commonService
        .updatePerson({
          personInfo,
        })
        .subscribe((response) => {
          if (response.data?.updatePerson) {
            this.disableAllForms();
          }
        });
    }
  }
}
