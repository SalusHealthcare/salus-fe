import { MedicalSpeciality } from './Medic.interface';
import { IDate } from './Shared.interface';

export interface IMedicalRecord {
  id: string;
  description: string;
  insertedAt: IDate;
  category: MedicalSpeciality;
  documentType: MedicalDocumentType;
}

export enum MedicalDocumentType {
  PRESCRIPTION = 'PRESCRIPTION',
  DIAGNOSTIC = 'DIAGNOSTIC',
  REPORT = 'REPORT',
  LABORATORY_ANALYSIS = 'LABORATORY_ANALYSIS',
}

export interface IInsertDocumentsResponse {
  insertDocuments: IMedicalRecord[];
}
