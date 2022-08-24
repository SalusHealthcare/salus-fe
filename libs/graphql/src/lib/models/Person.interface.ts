import { CreateAddressInput, UserRole } from './Authentication.interface';
import { IDate, IAddress } from './Shared.interface';

export interface IPerson {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: IDate;
  taxCode: string;
  email: string;
  telephoneNumber: string;
  residence: IAddress;
  domicile: IAddress;
  roles: UserRole[];
  deletable?: boolean;
  __typename: string;
}

export interface ICurrentUserResponse {
  currentUser: {
    person: IPerson;
  };
}

export interface IPersonResponse {
  person: IPerson;
}

export interface IUpdatePersonResponse {
  updatePerson: IPerson;
}

export interface IUpdatePersonByAdminResponse {
  updatePersonByAdmin: IPerson;
}

export interface UpdatePersonInput {
  firstName: string;
  lastName: string;
  telephoneNumber: string;
  residence: CreateAddressInput;
  domicile: CreateAddressInput;
}

export const WrappedPersonGql = `
person {
    id
    taxCode
    email
    telephoneNumber
    firstName
    lastName
    birthDate{
        iso
    }
    residence {
      id
      province
      city
      street
      number
      postCode
      country
    }
    domicile {
      id
      province
      city
      street
      number
      postCode
      country
    }
    roles
  }
`;

export const PersonGql = `
    id
    taxCode
    email
    telephoneNumber
    firstName
    lastName
    birthDate{
        iso
    }
    residence {
      id
      province
      city
      street
      number
      postCode
      country
    }
    domicile {
      id
      province
      city
      street
      number
      postCode
      country
    }
    roles
`;
