import { Injectable } from '@angular/core';
import { Apollo, gql, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';

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
  }): Observable<MutationResult<unknown>> {
    return this.apollo.query({
      query: gql`
        query allPeople($page: Int!, $size: Int!) {
          medics(page: $page, size: $size) {
            id
            firstName
            lastName
            email
            taxCode
          }
        }
      `,
      variables: {
        ...props,
      },
    });
  }
}
