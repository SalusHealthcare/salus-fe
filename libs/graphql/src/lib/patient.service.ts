import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql, MutationResult, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { MedicalSpeciality } from './models/Medic.interface';
import {
  IGetAvailableReservationsResponse,
  IGetCurrentPatientResponse,
  IGetPatientByIdResponse,
  IGetPatientResponse,
  IReserveSlotResponse,
  PatientGql,
  WrappedPatientGql,
} from './models/Patient.interface';
import { Priority } from './models/Reservation.interface';

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

  public getAvailabeReservationSlots(props: {
    startDate: string;
    endDate: string;
    medicId?: string;
    speciality?: MedicalSpeciality;
  }): Observable<ApolloQueryResult<IGetAvailableReservationsResponse>> {
    return this.apollo.query({
      query: gql`
        query availableReservationSlots(
          $startDate: String!
          $endDate: String!
          $medicId: ID
          $speciality: MedicalSpeciality
        ) {
          availableReservationSlots(
            startDate: $startDate
            endDate: $endDate
            medicId: $medicId
            speciality: $speciality
          ) {
            id
            startDateTime {
              iso
            }
            durationInHours
            booked
            medic {
              id
              firstName
              lastName
              speciality
            }
          }
        }
      `,
      variables: {
        ...props,
      },
    });
  }

  public reserveSlot(reservationInput: {
    reservationSlotId: string;
    description: string;
    priority: Priority;
  }): Observable<MutationResult<IReserveSlotResponse>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation reserve($reservationInput: ReservationInput!) {
          reserve(reservation: $reservationInput) {
            id
            description
            bookedAt {
              iso
            }
            priority
          }
        }
      `,
      variables: {
        reservationInput: reservationInput,
      },
    });
  }
}
