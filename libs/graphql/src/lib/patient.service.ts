import { Injectable } from '@angular/core';
import { Apollo, gql, MutationResult, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  IGetCurrentPatientResponse,
  IGetPatientByIdResponse,
  IGetPatientResponse,
  PatientGql,
  WrappedPatientGql,
} from './models/Patient.interface';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private apollo: Apollo) {}

  //ADMIN/STAFF
  public getPatients(props: {
    page: number;
    size: number;
    // sort?: string;
    firstName?: string;
    lastName?: string;
    taxCode?: string;
  }): Observable<MutationResult<IGetPatientResponse>> {
    return this.apollo.query({
      query: gql`
      query patients($page: Int!, $size: Int!, $sort: PersonSort, $firstName: String, $lastName: String, $taxCode: String) {
        patients(page: $page, size: $size, sort: $sort, firstName: $firstName, lastName: $lastName, taxCode: $taxCode) {
          ${PatientGql(
            '2020-06-08T00:00',
            '2030-06-08T00:00',
            '2020-06-08T00:00',
            '2030-06-08T00:00'
          )}
        }
      }
    `,
      variables: {
        ...props,
      },
    });
  }

  //USER
  public getCurrentPatient(
    startDate: string,
    endDate: string
  ): QueryRef<IGetCurrentPatientResponse> {
    return this.apollo.watchQuery({
      query: gql`
        query currentPatient {
          currentPatient {
            ${PatientGql(startDate, endDate, startDate, endDate)}
          }
        }
      `,
    });
  }

  //ADMIN/STAFF/MEDIC
  public getPatient(
    id: string,
    startDate: string,
    endDate: string
  ): QueryRef<IGetPatientByIdResponse, { patientId: string }> {
    return this.apollo.watchQuery({
      query: gql`
        query patient($patientId: ID!) {
          patient(patientId: $patientId) {
            ${PatientGql(startDate, endDate, startDate, endDate)}
          }
        }
      `,
      variables: {
        patientId: id,
      },
    });
  }
}
