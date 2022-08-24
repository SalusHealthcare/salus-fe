import { IPerson } from './Person.interface';
import { IAddress } from './Shared.interface';

export interface IUser {
  email: string;
  password: string;
}

export type CreatePersonInput = Omit<
  IPerson,
  | 'id'
  | 'email'
  | 'roles'
  | 'birthDate'
  | 'residence'
  | 'domicile'
  | '__typename'
> & {
  birthDate: string;
  residence: CreateAddressInput;
  domicile: CreateAddressInput;
};
export type CreateAddressInput = Omit<IAddress, 'id'>;

export interface UpdatePasswordInput {
  originalPassword: string;
  newPassword: string;
}
export interface ILoginResponse {
  login: {
    token: string;
    person: IPerson;
  };
}

export interface ICreatePatientResponse {
  createPatientUser: {
    token: string;
    person: IPerson;
  };
}

export interface IUpdatePasswordResponse {
  updatePassword: {
    token: string;
    person: IPerson;
  };
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MEDIC = 'MEDIC',
  STAFF = 'STAFF',
}
