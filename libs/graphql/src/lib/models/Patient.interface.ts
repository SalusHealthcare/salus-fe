import { IMedicalRecord } from './MedicalRecord.interface';
import { IPerson } from './Person.interface';
import { IReservation } from './Reservation.interface';

export interface IPatient extends IPerson {
  roles: string[];
  medicalRecords: IMedicalRecord[];
  reservations: IReservation[];
}

export interface IGetPatientResponse {
  patients: IPatient[];
}

export const PatientGql = `
id
firstName
lastName
birthDate{
    iso
}
taxCode
email
telephoneNumber
roles
medicalRecord{
    id
    description
}
reservations{
    id 
}
`;

export const WrappedPatientGql = `
    patients{
        ${PatientGql}
    }
`;
