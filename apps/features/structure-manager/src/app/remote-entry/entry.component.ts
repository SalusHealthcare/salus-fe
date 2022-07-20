import { Component } from '@angular/core';
import { Formello } from 'formello';
import {
  StructureFormConfiguration,
  StructureFormModel,
} from './forms/structure.form';

@Component({
  selector: 'salus-features-structure-manager-entry',
  templateUrl: `entry.component.html`,
  providers: [StructureFormModel],
})
export class RemoteEntryComponent {
  form: Formello<StructureFormModel>;

  constructor(public structureFormModel: StructureFormModel) {
    this.form = new Formello(
      new StructureFormConfiguration(structureFormModel)
    );
  }
}
