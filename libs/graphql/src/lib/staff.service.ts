import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql, MutationResult, QueryRef } from 'apollo-angular';
import { Observable, startWith } from 'rxjs';
import { CreatePersonInput, IUser } from './models/Authentication.interface';
import {
  CreateMedicInput,
  ICreateMedicResponse,
} from './models/Medic.interface';
import { PersonGql, WrappedPersonGql } from './models/Person.interface';
import {
  IAddReservationSlotResponse,
  IAddShiftsResponse,
  IAllPersonResponse,
  IAllStaffsForSelectResponse,
  ICreateStaffResponse,
  ICurrentMedicResponse,
  IGetSelfShiftsResponse,
  IGetShiftsResponse,
  ReservationSlotForWeeksOnMedic,
  ShiftForWeeksOnWorker,
} from './models/Staff.interface';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private apollo: Apollo) {}

  public getAllPeople(props: {
    page: number;
    size: number;
    personSort?: string;
    role?: string;
  }): QueryRef<IAllPersonResponse, any> {
    return this.apollo.watchQuery({
      query: gql`
        query allPeople($page: Int!, $size: Int!, $role: String) {
          allPeople(page: $page, size: $size, role: $role) {
            ${PersonGql}
            ...on Staff{
              deletable
            }
            ...on Medic{
              deletable
            }
          }
        }
      `,
      variables: {
        ...props,
      },
    });
  }

  public createStaff(props: {
    userInfo: IUser;
    personInfo: CreatePersonInput;
  }): Observable<MutationResult<ICreateStaffResponse>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation createStaffUser(
          $userInfo: CreateUserInput!
          $personInfo: CreatePersonInput!
        ) {
          createStaffUser(userInfo: $userInfo, personInfo: $personInfo) {
            token
            person {
              id
              firstName
              lastName
            }
          }
        }
      `,
      variables: {
        ...props,
      },
    });
  }

  public createMedic(props: {
    userInfo: IUser;
    personInfo: CreateMedicInput;
  }): Observable<MutationResult<ICreateMedicResponse>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation createMedicUser(
          $userInfo: CreateUserInput!
          $personInfo: CreateMedicInput!
        ) {
          createMedicUser(userInfo: $userInfo, personInfo: $personInfo) {
            token
            person {
              id
              firstName
              lastName
            }
          }
        }
      `,
      variables: {
        ...props,
      },
    });
  }

  public getShifts(props: {
    page: number;
    size: number;
    startDate: Date;
    endDate: Date;
  }): Observable<ApolloQueryResult<IGetShiftsResponse>> {
    return this.apollo.query({
      query: gql`
      ${ShiftForWeeksOnWorker(
        'Staff',
        props.startDate.toISOString().split('.')[0],
        props.endDate.toISOString().split('.')[0]
      )}
      ${ShiftForWeeksOnWorker(
        'Medic',
        props.startDate.toISOString().split('.')[0],
        props.endDate.toISOString().split('.')[0]
      )}
      ${ReservationSlotForWeeksOnMedic(
        props.startDate.toISOString().split('.')[0],
        props.endDate.toISOString().split('.')[0]
      )}
        query allPeople($page: Int!, $size: Int!) {
          allPeople(page: $page, size: $size, role: "STAFF") {
            ${PersonGql}
            __typename
            ... on Staff {
              ...ShiftSlotOfWeekForStaff
              }
            ... on Medic{
              speciality
              ...ShiftSlotOfWeekForMedic
              ...ReservationSlotOfWeekForMedic
              }
          }
        }
        
      `,
      variables: {
        ...props,
      },
    });
  }

  public getSelfShifts(props: {
    startDate: Date;
    endDate: Date;
  }): Observable<ApolloQueryResult<IGetSelfShiftsResponse>> {
    return this.apollo.query({
      query: gql`
      ${ShiftForWeeksOnWorker(
        'Staff',
        props.startDate.toISOString().split('.')[0],
        props.endDate.toISOString().split('.')[0]
      )}
      ${ShiftForWeeksOnWorker(
        'Medic',
        props.startDate.toISOString().split('.')[0],
        props.endDate.toISOString().split('.')[0]
      )}
      ${ReservationSlotForWeeksOnMedic(
        props.startDate.toISOString().split('.')[0],
        props.endDate.toISOString().split('.')[0]
      )}
        query currentUser {
          currentUser {
            person {
              ${PersonGql}
              __typename
              ... on Staff {
                ...ShiftSlotOfWeekForStaff
                }
              ... on Medic{
                speciality
                ...ShiftSlotOfWeekForMedic
                ...ReservationSlotOfWeekForMedic
                }
            }
          }
        }
      `,
      variables: {
        ...props,
      },
    });
  }

  public getAllStaffsForSelect(): Observable<
    ApolloQueryResult<IAllStaffsForSelectResponse>
  > {
    return this.apollo.query({
      query: gql`
        query allPeople($page: Int!, $size: Int!) {
          allPeople(page: $page, size: $size, role: "STAFF") {
            id
            firstName
            lastName
          }
        }
      `,
      variables: {
        page: 0,
        size: 1000,
      },
    });
  }

  public addShift(props: {
    personId: string;
    startDateTime: string;
    durationInHours: number;
  }): Observable<MutationResult<IAddShiftsResponse>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation addShifts(
          $personId: ID!
          $startDateTime: String!
          $durationInHours: Int!
        ) {
          addShifts(
            personId: $personId
            shifts: [
              {
                startDateTime: $startDateTime
                durationInHours: $durationInHours
              }
            ]
          ) {
            __typename
            ... on Person {
              id
            }
            ... on Staff {
              id
            }
            ... on Medic {
              id
            }
          }
        }
      `,
      variables: {
        ...props,
      },
    });
  }

  public addReservationSlot(props: {
    startDateTime: string;
    durationInHours: number;
  }): Observable<MutationResult<IAddReservationSlotResponse>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation addReservationSlots(
          $startDateTime: String!
          $durationInHours: Int!
        ) {
          addReservationSlots(
            reservationSlots: [
              {
                startDateTime: $startDateTime
                durationInHours: $durationInHours
              }
            ]
          ) {
            __typename
            id
          }
        }
      `,
      variables: {
        ...props,
      },
    });
  }

  public getCurrentMedic(
    startDate: string,
    endDate: string,
    booked: boolean
  ): Observable<ApolloQueryResult<ICurrentMedicResponse>> {
    return this.apollo.query({
      query: gql`
        query currentMedic {
          currentMedic {
            __typename
            reservationSlots(startDate: "${startDate}", endDate: "${endDate}", booked: ${booked}) {
              id
              startDateTime{ iso }
              durationInHours
              booked
              reservation {
                id
                description
                priority
                bookedAt { iso }
                patient{
                  id
                  firstName
                  lastName
                }
                reservationSlot{
                  id
                  startDateTime { iso }
                }
              }
            }
          }
        }
      `,
    });
  }
}
