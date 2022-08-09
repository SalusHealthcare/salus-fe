import { Injectable } from '@angular/core';
import { Apollo, gql, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import { CreatePersonInput, IUser } from './models/Authentication.interface';
import { PersonGql, WrappedPersonGql } from './models/Person.interface';
import {
  CreateMedicInput,
  IAllPersonResponse,
  ICreateMedicResponse,
  ICreateStaffResponse,
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
  }): Observable<MutationResult<IAllPersonResponse>> {
    return this.apollo.query({
      query: gql`
        query allPeople($page: Int!, $size: Int!) {
          allPeople(page: $page, size: $size) {
            ${PersonGql}
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
        mutation createStaffUser($userInfo: CreateUserInput!, $personInfo: CreatePersonInput!) {
          createStaffUser(userInfo: $userInfo, personInfo: $personInfo) {
            token
            ${WrappedPersonGql}
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
        mutation createMedicUser($userInfo: CreateUserInput!, $personInfo: CreateMedicInput!) {
          createMedicUser(userInfo: $userInfo, personInfo: $personInfo) {
            token
            ${WrappedPersonGql}
          }
        }
      `,
      variables: {
        ...props,
      },
    });
  }
}
