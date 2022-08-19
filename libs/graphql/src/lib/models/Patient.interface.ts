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

export const PatientGql = (
  medicalRecordStartDate: string,
  medicalRecordEndDate: string,
  reservationsStartDate: string,
  reservationsEndDate: string
) => `
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
medicalRecord(page: 0, size: 100, startDate: "${medicalRecordStartDate}", endDate: "${medicalRecordEndDate}") {
    id
    description
}
reservations(startDate: "${reservationsStartDate}", endDate: "${reservationsEndDate}") {
    id 
}
`;

export const WrappedPatientGql = `
    patients{
        ${PatientGql}
    }
`;
