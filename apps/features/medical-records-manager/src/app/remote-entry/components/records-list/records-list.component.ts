import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IMedicalRecord, IPatient, PatientService } from '@salus/graphql';
import GSTC from 'gantt-schedule-timeline-calendar';
const date = GSTC.api.date; // dayjs function

@Component({
  selector: 'salus-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.css'],
})
export class RecordsListComponent implements OnInit {
  patientData: IPatient | undefined;
  medicalRecords: IMedicalRecord[] = [];
  dataSource: MatTableDataSource<IMedicalRecord> =
    new MatTableDataSource<IMedicalRecord>([]);
  displayedColumns: string[] = [
    'id',
    'description',
    'insertedAt',
    'category',
    'documentType',
  ];
  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.getPatientData();
  }

  getPatientData() {
    this.patientService
      .getCurrentPatient(
        date().startOf('month').format('YYYY-MM-DDTHH:mm:ss'),
        date().endOf('month').format('YYYY-MM-DDTHH:mm:ss')
      )
      .valueChanges.subscribe((response) => {
        if (response.data.currentPatient) {
          this.patientData = response.data.currentPatient;
          this.medicalRecords = this.patientData.medicalRecord;
          this.dataSource = new MatTableDataSource(this.medicalRecords);
        }
      });
  }
}
