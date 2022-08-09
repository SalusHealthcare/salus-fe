import { CreatePersonInput } from './Authentication.interface';
import { IPerson } from './Person.interface';

export interface IAllPersonResponse {
  allPeople: IPerson[];
}

export type CreateMedicInput = CreatePersonInput & {
  medicalSpeciality: MedicalSpeciality;
};

export interface ICreateMedicResponse {
  createMedicUser: {
    token: string;
    person: IPerson;
  };
}

export enum MedicalSpeciality {
  GENERAL_PRACTICE = 'GENERAL_PRACTICE',
  RADIOLOGY = 'RADIOLOGY',
  OPHTHALMOLOGY = 'OPHTHALMOLOGY',
  SPORTS_MEDICINE_AND_REHABILITATION = 'SPORTS_MEDICINE_AND_REHABILITATION',
  ONCOLOGY = 'ONCOLOGY',
  DERMATOLOGY = 'DERMATOLOGY',
  EMERGENCY_MEDICINE = 'EMERGENCY_MEDICINE',
}
