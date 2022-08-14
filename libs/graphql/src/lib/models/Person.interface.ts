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
  roles: string[];
}

export interface IPersonResponse {
  person: IPerson;
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
