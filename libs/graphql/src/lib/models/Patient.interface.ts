import { UserRole } from './Authentication.interface';
import { IMedicalRecord } from './MedicalRecord.interface';
import { IPerson } from './Person.interface';
import { IReservation, IReservationSlot } from './Reservation.interface';

export interface IPatient extends IPerson {
  roles: UserRole[];
  medicalRecord: IMedicalRecord[];
  reservations: IReservation[];
}

export interface IGetPatientResponse {
  patients: IPatient[];
}

export interface IGetCurrentPatientResponse {
  currentPatient: IPatient;
}

export interface IGetPatientByIdResponse {
  patient: IPatient;
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
    insertedAt{iso}
    category
    documentType
}
reservations(startDate: "${reservationsStartDate}", endDate: "${reservationsEndDate}") {
    id
    description
    priority
    reservationSlot{
      startDateTime{ iso }
      medic {
        firstName
        lastName
        speciality
      }
    }
}
`;

export const WrappedPatientGql = `
    patients{
        ${PatientGql}
    }
`;

export interface IGetAvailableReservationsResponse {
  availableReservationSlots: IReservationSlot[];
}

export interface IReserveSlotResponse {
  reserve: IReservation;
}
