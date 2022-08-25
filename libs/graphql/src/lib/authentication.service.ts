import { Injectable } from '@angular/core';
import { Apollo, gql, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  CreatePersonInput,
  ICreatePatientResponse,
  ILoginResponse,
  IUpdatePasswordResponse,
  IUser,
  UpdatePasswordInput,
} from './models/Authentication.interface';
import {
  WrappedPersonGql,
  WrappedPersonNoRolesGql,
} from './models/Person.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private apollo: Apollo) {}

  public signupPatient(props: {
    userInfo: IUser;
    personInfo: CreatePersonInput;
  }): Observable<MutationResult<ICreatePatientResponse>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation createPatientUser($userInfo: CreateUserInput!, $personInfo: CreatePersonInput!) {
          createPatientUser(userInfo: $userInfo, personInfo: $personInfo) {
            token
            ${WrappedPersonNoRolesGql}
          }
        }
      `,
      variables: {
        ...props,
      },
    });
  }

  public login(props: {
    email: string;
    password: string;
  }): Observable<MutationResult<ILoginResponse>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token,
            ${WrappedPersonGql}
          }
        }
      `,
      variables: {
        ...props,
      },
    });
  }

  public updatePassword(
    input: UpdatePasswordInput
  ): Observable<MutationResult<IUpdatePasswordResponse>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation updatePassword($input: UpdatePasswordInput!) {
          updatePassword(input: $input){
            token,
            ${WrappedPersonGql}
          }
        }
      `,
      variables: {
        input,
      },
    });
  }
}
