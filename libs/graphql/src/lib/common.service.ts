import { Injectable } from '@angular/core';
import { Apollo, gql, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  IPersonResponse,
  PersonGql,
  UpdatePersonInput,
  WrappedPersonGql,
} from './models/Person.interface';
import { DeleteUserResponse } from './models/Shared.interface';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private apollo: Apollo) {}

  public getPersonById(
    personId: string
  ): Observable<MutationResult<IPersonResponse>> {
    return this.apollo.query({
      query: gql`
        query person($personId: ID!) {
          person(personId: $personId) {
            ${PersonGql}
          }
        }
      `,
      variables: {
        personId,
      },
    });
  }

  //! MISSING ID TO UPDATE
  public updatePerson(props: {
    personInfo: UpdatePersonInput;
  }): Observable<MutationResult<IPersonResponse>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation updatePerson($personInfo: CreatePersonInput!) {
          updatePerson(personInfo: $personInfo) {
            ${WrappedPersonGql}
          }
        }
      `,
      variables: {
        ...props,
      },
    });
  }

  public deletePerson(
    personId: string
  ): Observable<MutationResult<DeleteUserResponse>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation deleteUser($personId: ID!) {
          deleteUser(personId: $personId)
        }
      `,
      variables: {
        personId,
      },
    });
  }
}
