import { Injectable } from '@angular/core';
import { Apollo, gql, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import { IUser } from './models/Authentication.interface';
import { PersonGql, WrappedPersonGql } from './models/Person.interface';
import {
  CreateMedicInput,
  IAllPersonResponse,
  ICreateMedicResponse,
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
