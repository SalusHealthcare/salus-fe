import { Injectable } from '@angular/core';
import { Apollo, gql, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  IInsertDocumentsResponse,
  MedicalDocumentType,
} from './models/MedicalRecord.interface';

@Injectable({
  providedIn: 'root',
})
export class MedicalRecordService {
  constructor(private apollo: Apollo) {}

  public insertRecord(props: {
    patientId: string;
    description: string;
    documentType: MedicalDocumentType;
  }): Observable<MutationResult<IInsertDocumentsResponse>> {
    return this.apollo.mutate({
      mutation: gql`
        mutation insertDocuments(
          $patientId: ID!
          $description: String!
          $documentType: DocumentType!
        ) {
          insertDocuments(
            patientId: $patientId
            documents: [
              { description: $description, documentType: $documentType }
            ]
          ) {
            id
            insertedAt {
              iso
            }
          }
        }
      `,
      variables: {
        ...props,
      },
    });
  }
}
