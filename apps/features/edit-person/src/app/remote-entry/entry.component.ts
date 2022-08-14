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
import { CommonService } from '@salus/graphql';

@Component({
  selector: 'salus-features-edit-person-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
  providers: [PersonFormModel, ResidenceFormModel, DomicileFormModel],
})
export class RemoteEntryComponent {
  fullName = '';
  personForm: Formello<PersonFormModel>;
  residenceForm: Formello<ResidenceFormModel>;
  domicileForm: Formello<DomicileFormModel>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private personFormModel: PersonFormModel,
    private residenceFormModel: ResidenceFormModel,
    private domicileFormModel: DomicileFormModel,
    private commonService: CommonService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.getPersonById(params['id']);
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
  }

  getFullName(): string {
    return `${this.personFormModel.firstName.control.value} ${this.personFormModel.lastName.control.value}`;
  }

  domicileAsResidence() {
    this.domicileForm.getForm().patchValue(this.residenceForm.getForm().value);
    this.domicileForm.getForm().updateValueAndValidity({});
  }

  getPersonById(id: string): void {
    this.commonService.getPersonById(id).subscribe((personResponse) => {
      if (personResponse.data) {
        const person = personResponse.data.person;
        this.personForm.getForm().patchValue(person);
        this.residenceForm.getForm().patchValue(person.residence);
        this.domicileForm.getForm().patchValue(person.domicile);
        this.fullName = this.getFullName();
      }
    });
  }
}
