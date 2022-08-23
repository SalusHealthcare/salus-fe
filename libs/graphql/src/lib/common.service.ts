import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql, MutationResult, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  ICurrentUserResponse,
  IPersonResponse,
  IUpdatePersonByAdminResponse,
  IUpdatePersonResponse,
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

  public getCurrentUser(): QueryRef<ICurrentUserResponse> {
    return this.apollo.watchQuery({
      query: gql`
        query currentUser {
          currentUser {
            ${WrappedPersonGql}
          }
        }
      `,
    });
  }

  public getPersonById(
    personId: string
  ): Observable<ApolloQueryResult<IPersonResponse>> {
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

  public updatePerson(props: {
    personInfo: UpdatePersonInput;
  }): Observable<MutationResult<IUpdatePersonResponse>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation updatePerson($personInfo: UpdatePersonInput!) {
          updatePerson(input: $personInfo) {
            ${PersonGql}
          }
        }
      `,
      variables: {
        ...props,
      },
    });
  }

  public updatePersonByAdmin(props: {
    personId: string;
    personInfo: UpdatePersonInput;
  }): Observable<MutationResult<IUpdatePersonByAdminResponse>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation updatePersonByAdmin($personId: ID!, $personInfo: UpdatePersonInput!) {
          updatePersonByAdmin(personId: $personId, input: $personInfo) {
            ${PersonGql}
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
